import { ArrowLeft, ArrowRight } from "lucide-react";

import { Link } from "@/lib/i18n";

export const NewsArticleNav = ({
  newerSlug,
  olderSlug,
}: {
  newerSlug?: string | null;
  olderSlug?: string | null;
}) => {
  if (!newerSlug && !olderSlug) return null;

  return (
    <nav
      aria-label="News pagination"
      className="mx-2 mt-16 flex items-center justify-between gap-4 md:mx-8"
    >
      {newerSlug ? (
        <Link
          href={`/news/${newerSlug}`}
          aria-label="Newer article"
          className="flex items-center text-secondary hover:text-primary"
        >
          <ArrowLeft className="size-10" />
        </Link>
      ) : (
        <span />
      )}

      {olderSlug ? (
        <Link
          href={`/news/${olderSlug}`}
          aria-label="Older article"
          className="flex items-center text-secondary hover:text-primary"
        >
          <ArrowRight className="size-10" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};
