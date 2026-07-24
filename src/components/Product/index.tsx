import {
  ProductVariant,
  Site,
  Product as VenueProduct,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { ProfileCompact } from "../ProfileCompact";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
  TwoSubColumnLayout,
} from "../layout";
import { renderedStyles } from "../utils/styles";

export const Product = ({
  product,
  site,
}: {
  product: VenueProduct;
  site: Site;
}) => {
  const locale = useLocale();
  const { artists, variants = [] } = product;

  const { content } = getLocalizedContent(product?.localizedContent, locale);

  return (
    <TwoColumnLayout>
      <ColumnFull>
        <div className="flex flex-col gap-0 pl-8 md:flex-row md:gap-4 md:pl-16">
          <div className="text-highlight">( {content.title} )</div>
          <div>
            {product.author ? (
              <div className={cn("text-secondary")}>{product.author}</div>
            ) : null}
          </div>
        </div>

        <div className="md:w-2/3 md:translate-x-16">
          <VenueImage image={product.image} />
        </div>

        <div className="translate-x-8 md:translate-x-16">
          {variants.length > 0 ? (
            <div className="flex flex-row gap-4 pt-2 text-lg">
              {variants.map((variant) => (
                <div
                  key={variant.productType?.type}
                  className="flex items-center gap-8"
                >
                  <div className="text-muted">{variant.productType?.type}</div>
                  <VariantPrice variant={variant} site={site} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <VenueContent
          className="flex flex-col gap-6"
          content={content}
          contentStyles={renderedStyles}
        />

        {artists.map(({ profile }) => (
          <ProfileCompact key={profile.slug} profile={profile} />
        ))}
      </ColumnFull>
    </TwoColumnLayout>
  );
};

const VariantPrice = ({
  variant,
  site,
}: {
  variant: ProductVariant;
  site: Site;
}) => {
  const displayPrice =
    variant.price > 0
      ? `${variant.price} ${variant.currency || site.settings?.defaults?.currency || ""}`
      : variant.price < 0
        ? "Free"
        : "Buy";
  return variant.price > 0 || variant.externalLink ? (
    <div
      key={variant.productType?.type + "price"}
      className="border border-muted px-2 py-1 text-secondary"
    >
      {variant.externalLink ? (
        <a
          href={variant.externalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayPrice}
        </a>
      ) : (
        displayPrice
      )}
    </div>
  ) : null;
};
