import Image from "next/image";
import Link from "next/link";

import { formatCentsToBrl } from "@/app/helpers/handle-price";
import { productTable, productVariantTable } from "@/db/schema";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link href="/product">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        width={150}
        height={150}
        className="rounded-3xl"
      />
      <div className="flex max-w-[150px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBrl(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
