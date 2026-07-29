import { LocalizedContent, MediaItem } from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { renderedStyles } from "@/components/utils/styles";

export const ListedContent = ({
  image,
  title,
  shortcontent,
  titleLink,
  content,
  className,
}: {
  image?: Partial<MediaItem>;
  title?: string | null;
  shortcontent?: string | null;
  titleLink: string;
  content: LocalizedContent | string;
  className?: string;
}) => {
  return (
    <>
      <article className={cn("flex w-full flex-col gap-6", className)}>
        <div>
          {title && (
            <h2 className="text-balance pl-8 text-highlight hover:translate-y-0.5 md:pl-16">
              <Link href={titleLink}>( {title} )</Link>
            </h2>
          )}
          {shortcontent && (
            <div className="pl-8 font-content text-sm text-primary md:pl-32">
              {shortcontent}
            </div>
          )}
        </div>

        {typeof content === "string" && (
          <div className="max-w-[48rem] pl-24 font-content text-sm text-secondary">
            <p>{content}</p>
            <p className="pl-8 pt-6 text-highlight hover:translate-y-0.5">
              <Link href={titleLink}>[ read more ]</Link>
            </p>
          </div>
        )}

        {typeof content === "object" && (
          <VenueContent
            className="flex max-w-[48rem] flex-col gap-6 md:pl-24 md:pt-6"
            content={content}
            contentStyles={renderedStyles}
          />
        )}
      </article>
    </>
  );
};
