import { eq } from "drizzle-orm";
import { Quando } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";

import { formatCentsToBrl } from "@/app/helpers/handle-price";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: { variants: true },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  if (!likelyProducts) {
    return notFound();
  }

  return (
    <>
      <Header></Header>
      <div className="flex flex-col space-y-6">
        <div className="relative h-[380px] w-full rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="px-5">
          <VariantSelector
            variants={productVariant.product.variants}
          ></VariantSelector>
        </div>

        <div className="flex flex-col px-5">
          <h1 className="text-lg font-bold">{productVariant.product.name}</h1>
          <p className="text-muted-foreground text-sm">{productVariant.name}</p>
          <p className="text-lg font-semibold">
            {formatCentsToBrl(productVariant.priceInCents)}
          </p>
        </div>

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          <Button className="rounded-full" size="lg" variant="outline">
            Adicionar à sacola
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>
      </div>

      <ProductList
        title="Talvez você goste"
        products={likelyProducts}
      ></ProductList>

      <Footer></Footer>
    </>
  );
};

export default ProductVariantPage;
