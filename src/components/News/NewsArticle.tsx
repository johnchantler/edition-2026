import {
  type Page as VenuePage,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { format } from "date-fns";
import { getLocale } from "next-intl/server";

import { VenueImage } from "@/components/VenueImage";

import { ProfileCompact } from "../ProfileCompact";
import { ProfileLink } from "../ProfileLink";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "../layout";
import { renderedStyles } from "../utils";
import { NewsArticleNav } from "./NewsArticleNav";
import { NewsSidebar } from "./NewsSidebar";
import { getNewsRecords } from "./utils";

export const NewsArticle = async ({
  article,
  title,
}: {
  article: VenuePage;
  title?: string;
}) => {
  const [locale, records] = await Promise.all([getLocale(), getNewsRecords()]);
  const { artists = [] } = article;
  const { content } = getLocalizedContent(article?.localizedContent, locale);

  const index = records.findIndex((record) => record.slug === article.slug);
  const newerSlug = index > 0 ? records[index - 1]?.slug : null;
  const olderSlug =
    index >= 0 && index < records.length - 1 ? records[index + 1]?.slug : null;

  const date =
    typeof article.date === "string"
      ? format(new Date(article.date), "d MMMM yy")
      : null;

  return (
    <TwoColumnLayout className="overflow-hidden">
      <ColumnFull className="gap-0">
        <h1 className="translate-x-8 text-wrap text-muted md:translate-x-16">
          ( {date ? <span className="hidden md:inline">{date} — </span> : null}{" "}
          {content.title} )
        </h1>
        <VenueContent
          className="flex max-w-[64ch] flex-col gap-6"
          content={content}
          contentStyles={renderedStyles}
        />
        {article.image ? (
          <div className="pt-6 md:w-2/3 md:translate-x-16">
            <VenueImage image={article.image} aspect="video" />
          </div>
        ) : null}
        <div className="flex -translate-y-4 translate-x-8 flex-col gap-2 md:translate-x-16">
          {artists.map(({ profile }) => (
            <ProfileLink key={profile.slug} profile={profile} />
          ))}
        </div>
        <NewsArticleNav newerSlug={newerSlug} olderSlug={olderSlug} />
      </ColumnFull>
      <ColumnFull className="order-last lg:order-none">
        <NewsSidebar currentSlug={article.slug} title={title} />
      </ColumnFull>
    </TwoColumnLayout>
  );
};
