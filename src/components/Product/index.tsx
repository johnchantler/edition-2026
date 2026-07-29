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
        <div className="flex flex-col gap-0 pl-8 md:gap-4 md:pl-16">
          <div className="text-highlight">( {content.title} )</div>
          <div>
            {product.author ? (
              <div className={cn("pl-8 text-secondary")}>{product.author}</div>
            ) : null}
          </div>
        </div>

        <div className="md:w-2/3 md:pl-16">
          <VenueImage image={product.image} />
        </div>

        <div className="pl-8 md:pl-16">
          {variants.length > 0 ? (
            <div className="flex flex-row gap-16 pt-2 text-lg">
              {variants.map((variant) => (
                <div
                  key={variant.productType?.type}
                  className="flex items-center gap-4"
                >
                  <div className="text-secondary">
                    {variant.productType?.type}
                  </div>
                  <VariantPrice variant={variant} site={site} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <VenueContent
          className="flex max-w-[48rem] flex-col gap-6 md:pl-16"
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
      className="text-secondary underline underline-offset-8 hover:translate-y-0.5 hover:brightness-125"
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
