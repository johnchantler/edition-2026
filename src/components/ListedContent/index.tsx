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
            <div className="md: pl-16 pl-8 text-secondary">{shortcontent}</div>
          )}
        </div>

        {typeof content === "string" && (
          <p className="text-secondary">{content}</p>
        )}

        {typeof content === "object" && (
          <VenueContent
            className="flex flex-col gap-6"
            content={content}
            contentStyles={renderedStyles}
          />
        )}
      </article>
    </>
  );
};
