import {
  Site,
  type Event as VenueEvent,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { EventsListArtist } from "../EventListArtist";
import { ListEventArtist } from "../EventListArtist";
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
  const { location, artists, relations } = event;

  const { content } = getLocalizedContent(event?.localizedContent, locale);

  const isCancelled = event.publishState === "CANCELLED";
  const displayImage =
    event.image ??
    event.relations?.parents?.[0]?.image ??
    artists?.find((artist) => !!artist.profile?.image)?.profile.image;
  const parentEvent = event.relations?.parents?.[0]?.localizedContent?.[0];

  return (
    <TwoColumnLayout className="overflow-hidden">
      <ColumnFull>
        <div>
          <div className="flex flex-col flex-wrap gap-0 md:flex-row md:gap-4 md:pl-16">
            <div className="text-nowrap">
              {parentEvent && (
                <div className="text-secondary hover:translate-y-0.5 hover:text-primary">
                  <Link href={`/events/${event.relations?.parents?.[0]?.slug}`}>
                    {parentEvent.title}
                  </Link>
                </div>
              )}

              <div className="gap-0 text-balance text-highlight md:pl-16">
                ( {content.title} )
              </div>
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col gap-0 text-secondary md:flex-row md:gap-8 md:pl-16",
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
          className="flex max-w-[48rem] flex-col gap-6 md:pl-24 md:pt-6"
          content={content}
          contentStyles={renderedStyles}
        />
        {displayImage ? (
          <div className="md:m-auto md:w-2/3 md:pt-12">
            <VenueImage className="" image={displayImage} />
          </div>
        ) : null}
        {artists.map(({ profile }) => (
          <ProfileCompact key={profile.slug} profile={profile} />
        ))}
      </ColumnFull>
    </TwoColumnLayout>
  );
};
