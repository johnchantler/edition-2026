import {
  type Page as VenuePage,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { PageWithParent } from "@/lib/utils/tree";

import { VenueImage } from "@/components/VenueImage";

import { PageTree } from "../PageTree";
import { ProfileCompact } from "../ProfileCompact";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
  TwoSubColumnLayout,
} from "../layout";
import { renderedStyles } from "../utils";

export const Page = ({
  page,
  pages,
}: {
  page: VenuePage;
  pages: Array<PageWithParent>;
}) => {
  const locale = useLocale();

  const { artists = [] } = page;
  const { content } = getLocalizedContent(page?.localizedContent, locale);

  return (
    <TwoColumnLayout>
      <ColumnFull>
        <div className="gap-0">
          {" "}
          <div className="translate-x-8 text-highlight md:translate-x-16">
            ( {content.title} )
          </div>
          <VenueContent
            className="flex flex-col gap-6"
            content={content}
            contentStyles={renderedStyles}
          />
        </div>
        <div className="pt-6 md:w-2/3 md:translate-x-16">
          <VenueImage image={page.image} />
        </div>
        {artists.map(({ profile }) => (
          <ProfileCompact key={profile.slug} profile={profile} />
        ))}
        <PageTree pages={pages} />
      </ColumnFull>
    </TwoColumnLayout>
  );
};
