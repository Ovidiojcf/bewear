import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
    // Achar os produtos relacionados onde a categoria é igual ao slug
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(categoryTable.id, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header></Header>
      <div className="space-y-5 px-5">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2">
          {products.map((product) => (
            <ProductItem key={product.id} product={product}></ProductItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
