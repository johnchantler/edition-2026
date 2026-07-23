import {
  type Profile as VenueProfile,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";

export const ProfileLinkEvent = ({ profile }: { profile: VenueProfile }) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(profile?.localizedContent, locale);

  return (
    <div className="flex flex-row items-center gap-2 text-highlight transition-transform duration-300 hover:translate-y-0.5 hover:brightness-125">
      <Link href={`/artists/${profile.slug}`}>{content.title}</Link>
    </div>
  );
};
