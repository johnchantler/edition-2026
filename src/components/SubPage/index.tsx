import { getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { PageWithParent } from "@/lib/utils/tree";

import { ListedContent } from "../ListedContent";
import { PageTree } from "../PageTree";

export const SubPage = ({ page }: { page: PageWithParent }) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(page?.localizedContent, locale);

  return (
    <section className="pt-8">
      <ListedContent
        image={page.image}
        title={content?.title}
        shortcontent={content?.shortContent}
        titleLink={page.slug}
        content={content.excerpt || content}
      />
    </section>
  );
};
