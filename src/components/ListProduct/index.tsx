import { Product, Site, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

export const ListProduct = ({
  product,
  site,
  featured,
  className,
}: {
  product: Product;
  site: Site;
  featured?: boolean;
  className?: string;
}) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(product?.localizedContent, locale);

  return (
    <div
      className={cn(
        "flex break-inside-avoid flex-col gap-2 pb-8 md:px-16 md:pb-16",
        className,
      )}
    >
      <div className="w-full sm:w-auto sm:max-w-full md:pb-3">
        <Link href={`/shop/${product.slug}`}>
          <VenueImage image={product.image} aspect="square" />
        </Link>
      </div>
      <div className="text-balance text-highlight hover:translate-y-0.5 hover:brightness-125">
        <Link href={`/shop/${product.slug}`}>{content.title}</Link>
      </div>
      <div className="flex flex-col md:pl-8">
        {product.author ? (
          <div className="text-secondary">{product.author}</div>
        ) : null}
      </div>
    </div>
  );
};
