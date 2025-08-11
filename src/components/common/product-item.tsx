import Image from "next/image";
import Link from "next/link";

import { formatCentsToBrl } from "@/app/helpers/handle-price";
import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
  imageClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link href="/product">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="100vh"
        width={0}
        height={0}
        className="h-full w-full rounded-3xl"
      />
      <div
        className={cn(
          "flex max-w-[150px] flex-col gap-1",
          textContainerClassName,
        )}
      >
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
