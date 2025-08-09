import Image from "next/image";

import { Header } from "@/components/common/header";
import CategorySelector from "@/components/common/home/category-selector";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header></Header>
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01-mobile.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList title="Produtos em Destaque" products={products} />

        <CategorySelector categories={categories}></CategorySelector>
        <div className="p-5">
          <Image
            src="/banner-02-mobile.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
