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
        <h1 className="text-wrap pl-8 text-muted md:pl-16">
          ( {date ? <span className="hidden md:inline">{date} — </span> : null}{" "}
          {content.title} )
        </h1>
        <VenueContent
          className="flex max-w-[48rem] flex-col gap-6 md:pl-24 md:pt-6"
          content={content}
          contentStyles={renderedStyles}
        />
        {article.image ? (
          <div className="pt-6 md:w-2/3 md:pl-16">
            <VenueImage image={article.image} aspect="video" />
          </div>
        ) : (
          <div className="min-h-12" />
        )}
        <div className="flex -translate-y-4 flex-col gap-2 pl-8 md:pl-16">
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
