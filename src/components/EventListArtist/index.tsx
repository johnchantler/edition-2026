import { type Event, type Site, getLocalizedContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { LocationDisplay } from "../LocationLinkSimple";
import { ProfileLinkEvent } from "../ProfileLinkEvent";
import { formatDateRange } from "../utils";

export const EventsListArtist = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-6 md:gap-0", className)}>
      {children}
    </div>
  );
};

export const ListEventArtist = ({
  event,
  site,
  withImage,
  withTime = true,
  dateTemplate,
  className,
}: {
  event: Event;
  site: Site;
  withImage?: boolean;
  withTime?: boolean;
  dateTemplate?: string;
  className?: string;
}) => {
  const locale = useLocale();
  const { artists } = event;
  const { content } = getLocalizedContent(event.localizedContent, locale);
  const isCancelled = event.publishState === "CANCELLED";
  const displayImage =
    event.image ??
    event.relations?.parents?.[0]?.image ??
    artists?.find((artist) => !!artist.profile?.image)?.profile.image;
  const artistList = artists.map(({ profile }) => (
    <ProfileLinkEvent key={profile.slug} profile={profile} />
  ));
  return (
    <div
      className={cn(
        "flex break-inside-avoid flex-col content-start gap-8 sm:gap-0 md:flex-row",
        className,
      )}
    >
      {withImage ? (
        <div className={cn("w-full pb-3 sm:w-80 sm:max-w-full")}>
          <Link href={`/events/${event.slug}`}>
            <VenueImage image={displayImage} aspect="video" />
          </Link>
        </div>
      ) : null}
      <div className="flex flex-col gap-0 md:flex-row md:gap-4">
        {event.startDate ? (
          <div className="text-primary md:text-nowrap">
            <Link href={`/events/${event.slug}`}>
              {formatDateRange({
                start: event.startDate,
                end: event.endDate,
                withTime: withTime && event.hasTime,
                template: dateTemplate,
                timeZone: site.timeZone!,
              })}
            </Link>
          </div>
        ) : null}

        <div
          className={cn(
            "text-highlight hover:brightness-150 md:text-nowrap",
            isCancelled && "line-through",
          )}
        >
          {artists.length ? (
            artistList
          ) : (
            <Link href={`/events/${event.slug}`}>{content.title}</Link>
          )}
        </div>
        {event.location && !event.location.isDefault ? (
          <Link href={`/events/${event.slug}`}>
            <LocationDisplay location={event.location} />
          </Link>
        ) : null}
        {isCancelled ? <div className="">Cancelled</div> : null}
      </div>
    </div>
  );
};
