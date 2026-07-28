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
import { SubPage } from "../SubPage";
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
  const subpages = pages.filter((subpage) => subpage.parentId === page.id);

  return (
    <TwoColumnLayout>
      <ColumnFull>
        <div className="gap-0">
          {" "}
          <div className="pl-8 text-highlight md:pl-16">
            ( {content.title} )
          </div>
          <VenueContent
            className="flex flex-col gap-6"
            content={content}
            contentStyles={renderedStyles}
          />
        </div>
        <div className="pt-6 md:w-2/3 md:pl-16">
          <VenueImage image={page.image} />
        </div>
        {artists.map(({ profile }) => (
          <ProfileCompact key={profile.slug} profile={profile} />
        ))}

        {subpages.map((page) => (
          <SubPage key={page.slug} page={page} />
        ))}
      </ColumnFull>
    </TwoColumnLayout>
  );
};
