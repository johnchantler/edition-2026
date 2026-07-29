import {
  type Site,
  type Event as VenueEvent,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { VenueContent } from "@venuecms/sdk-next";
import { useLocale } from "next-intl";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

import { LocationLink } from "../LocationLink";
import { LocationDisplay } from "../LocationLinkSimple";
import { ProfileLink } from "../ProfileLink";
import { TicketList } from "../TicketList";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "../layout";
import { formatDateRange } from "../utils";
import { renderedStyles } from "../utils/styles";

export const EventFeatured = ({
  event,
  site,
  className,
}: {
  event: VenueEvent;
  site: Site;
  className?: string;
}) => {
  const locale = useLocale();
  const { location, artists } = event;

  const { content } = getLocalizedContent(event?.localizedContent, locale);
  const isCancelled = event.publishState === "CANCELLED";

  return (
    <>
      <TwoColumnLayout className={cn(className, "hidden")}>
        <ColumnFull className="gap-0">
          <Link href={`/events/${event.slug}`}>
            <VenueImage image={event.image} />
          </Link>
          <div className="pl-8 md:pl-16">
            <div className="text-highlight transition-transform hover:translate-y-0.5 hover:brightness-125">
              <Link href={`/events/${event.slug}`}>( {content.title} )</Link>
            </div>

            <div className="flex flex-col gap-0 md:flex-row md:items-center md:gap-4">
              <Link href={`/events/${event.slug}`}>
                {formatDateRange({
                  start: event.startDate,
                  end: event.endDate,
                  withTime: event.hasTime,
                  timeZone: site.timeZone!,
                })}

                {location ? <LocationDisplay location={location} /> : null}
              </Link>
            </div>

            {isCancelled ? (
              <div className="text-secondary">Cancelled</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-8 pt-6">
            {!isCancelled && event.tickets ? (
              <TicketList tickets={event.tickets} />
            ) : null}

            <VenueContent
              className="flex max-w-[48rem] flex-col gap-6 md:pl-24 md:pt-6"
              content={content}
              contentStyles={renderedStyles}
            />

            <div className="flex flex-col gap-0 pl-8 md:pl-16">
              {artists.map(({ profile }) => (
                <ProfileLink key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </ColumnFull>
      </TwoColumnLayout>
      <div className="flex pt-8 md:hidden">
        <div className="flex flex-col gap-0">
          <div>
            <div className="text-primary">
              <Link href={`/events/${event.slug}`}>
                {formatDateRange({
                  start: event.startDate,
                  end: event.endDate,
                  withTime: event.hasTime,
                  timeZone: site.timeZone!,
                })}
              </Link>
            </div>
            {location ? <LocationDisplay location={location} /> : null}
          </div>
          <div className="text-highlight hover:translate-y-0.5">
            <Link href={`/events/${event.slug}`}>{content.title}</Link>
          </div>
          {event.image ? (
            <Link href={`/events/${event.slug}`}>
              <VenueImage image={event.image} />
            </Link>
          ) : null}
          <div className="pt-6">
            <VenueContent content={content} contentStyles={renderedStyles} />
          </div>
        </div>
      </div>
    </>
  );
};
