import {
  type Product,
  type Site,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

export const ProductsList = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-6 md:gap-0", className)}>
      {children}
    </div>
  );
};

export const ListProduct = ({
  product,
  site,
  className,
  withImage,
}: {
  product: Product;
  site: Site;
  className?: string;
  withImage?: boolean;
}) => {
  const locale = useLocale();
  const { artists, variants = [] } = product;
  const { content } = getLocalizedContent(product.localizedContent, locale);

  return (
    <div
      className={cn(
        "flex break-inside-avoid flex-col gap-8 sm:gap-0 md:flex-row",
        className,
      )}
    >
      {withImage ? (
        <div className={cn("w-full pb-3 sm:w-80 sm:max-w-full")}>
          <Link href={`/shop/${product.slug}`}>
            <VenueImage image={product.image} aspect="video" />
          </Link>
        </div>
      ) : null}
      <div className="flex flex-col gap-0 text-nowrap md:flex-row md:gap-4">
        <div>
          {" "}
          <Link href={`/shop/${product.slug}`}>{product.author}</Link>
        </div>
        <div className="text-nowrap text-highlight hover:translate-y-0.5 hover:brightness-125">
          <Link href={`/shop/${product.slug}`}>{content.title}</Link>
        </div>{" "}
        <div>
          {variants.length > 0 ? (
            <div className="flex flex-row gap-4">
              {variants.map((variant) => (
                <div
                  key={variant.productType?.type}
                  className="flex items-center gap-4"
                >
                  <div className="text-secondary">
                    {variant.productType?.type}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
