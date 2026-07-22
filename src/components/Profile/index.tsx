import {
  type Profile as VenueProfile,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale, useTranslations } from "next-intl";
import { Suspense } from "react";

import { VenueImage } from "@/components/VenueImage";

import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "../layout";
import { renderedStyles } from "../utils";
import { ErrorBoundary } from "../utils/ErrorBoundary";
import { ProfileEventList, ProfileEventListSkeleton } from "./ProfileEventList";

export const Profile = ({ profile }: { profile: VenueProfile }) => {
  const locale = useLocale();
  const t = useTranslations("events");

  const { content } = getLocalizedContent(profile?.localizedContent, locale);

  return (
    <TwoColumnLayout>
      <ColumnFull className="">
        <div className="flex flex-col gap-0">
          <div className="translate-x-8 text-highlight md:translate-x-16">
            ( {content.title} )
          </div>
          <VenueContent
            className="flex flex-col gap-6"
            content={content}
            contentStyles={renderedStyles}
          />
        </div>
        <VenueImage image={profile.image} />
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<ProfileEventListSkeleton numElements={1} />}>
            <ProfileEventList
              header={t("upcoming_events")}
              slug={profile.slug}
              filter={{ upcoming: true, dir: "asc" }}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ProfileEventList
              header={t("past_events")}
              slug={profile.slug}
              filter={{ lt: Date.now(), dir: "desc" }}
            />
          </Suspense>
        </ErrorBoundary>
      </ColumnFull>
    </TwoColumnLayout>
  );
};
