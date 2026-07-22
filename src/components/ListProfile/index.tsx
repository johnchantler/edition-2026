import { Profile, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "../VenueImage";

export const ListProfile = ({
  profile,
  className,
}: {
  profile: Profile;
  className?: string;
}) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(profile?.localizedContent, locale);

  return (
    <div
      className={cn(
        "group flex break-inside-avoid flex-col gap-2 odd:text-secondary even:text-primary",
        className,
      )}
    >
      <div className="transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-highlight">
        <Link href={`/artists/${profile.slug}`}>{content.title}</Link>
      </div>

      <div className="hidden overflow-hidden">
        <Link href={`/artists/${profile.slug}`}>
          <VenueImage
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            image={profile.image}
            aspect="square"
          />
        </Link>
      </div>
    </div>
  );
};
