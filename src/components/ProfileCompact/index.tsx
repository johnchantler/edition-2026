import {
  type Profile as VenueProfile,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";

import { VenueImage } from "@/components/VenueImage";

import { renderedStyles } from "../utils";

export const ProfileCompact = ({ profile }: { profile: VenueProfile }) => {
  const locale = useLocale();

  const { content } = getLocalizedContent(profile?.localizedContent, locale);

  return (
    <>
      <div className="flex flex-col gap-0 py-8">
        <div className="pl-8 text-highlight transition-transform hover:translate-y-0.5 hover:brightness-125 md:pl-16">
          <Link href={`/artists/${profile.slug}`}>( {content.title} )</Link>
        </div>
        <VenueContent
          className="flex max-w-[48rem] flex-col gap-6 pr-4 md:pl-24 md:pt-6"
          content={content}
          contentStyles={renderedStyles}
        />
        <div className="m-auto py-8 md:w-2/3 md:pt-12">
          <Link href={`/artists/${profile.slug}`}>
            <VenueImage image={profile.image} aspect="video" />
          </Link>
        </div>
      </div>
    </>
  );
};
