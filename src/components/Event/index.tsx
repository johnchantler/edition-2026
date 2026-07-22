import {
  Site,
  type Event as VenueEvent,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { LocationLink } from "../LocationLink";
import { ProfileCompact } from "../ProfileCompact";
import { TicketList } from "../TicketList";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
  TwoSubColumnLayout,
} from "../layout";
import { formatDateRange } from "../utils";
import { renderedStyles } from "../utils/styles";

export const Event = ({ event, site }: { event: VenueEvent; site: Site }) => {
  const locale = useLocale();
  const { location, artists } = event;

  const { content } = getLocalizedContent(event?.localizedContent, locale);
  const isCancelled = event.publishState === "CANCELLED";
  const displayImage =
    event.image ??
    event.relations?.parents?.[0]?.image ??
    artists?.find((artist) => !!artist.profile?.image)?.profile.image;

  return (
    <TwoColumnLayout className="overflow-hidden">
      <ColumnFull>
        <div>
          <div className="translate-x-8 gap-0 text-highlight md:translate-x-16">
            ( {content.title} )
          </div>
          <div
            className={cn(
              "flex flex-col gap-0 text-secondary md:flex-row md:gap-4",
              isCancelled && "line-through",
            )}
          >
            {formatDateRange({
              start: event.startDate,
              end: event.endDate,
              withTime: event.hasTime,
              timeZone: site.timeZone!,
            })}

            {location ? <LocationLink location={location} /> : null}

            {isCancelled ? (
              <div className="text-secondary">Cancelled</div>
            ) : null}
          </div>
        </div>
        {!isCancelled && event.tickets ? (
          <TicketList tickets={event.tickets} />
        ) : null}
        <VenueContent
          className="flex flex-col gap-6"
          content={content}
          contentStyles={renderedStyles}
        />
        <VenueImage image={displayImage} />

        {artists.map(({ profile }) => (
          <ProfileCompact key={profile.slug} profile={profile} />
        ))}
      </ColumnFull>
    </TwoColumnLayout>
  );
};
