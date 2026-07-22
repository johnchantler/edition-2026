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
import { LocationLinkSimple } from "../LocationLinkSimple";
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
        <ColumnFull className="gap-0 overflow-hidden">
          <Link href={`/events/${event.slug}`}>
            <VenueImage image={event.image} />
          </Link>
          <div className="-translate-y-4 translate-x-8 md:translate-x-16">
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
              </Link>
              {location ? (
                <LocationLinkSimple className="pt-2" location={location} />
              ) : null}
            </div>

            {isCancelled ? (
              <div className="text-secondary">Cancelled</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-8 pt-6">
            {!isCancelled && event.tickets ? (
              <TicketList tickets={event.tickets} />
            ) : null}
            <Link href={`/events/${event.slug}`}>
              <VenueContent
                className="flex flex-col gap-6"
                content={content}
                contentStyles={renderedStyles}
              />
            </Link>
            <div className="flex translate-x-8 flex-col gap-0 md:translate-x-16">
              {artists.map(({ profile }) => (
                <ProfileLink key={profile.slug} profile={profile} />
              ))}
            </div>
          </div>
        </ColumnFull>
      </TwoColumnLayout>
      <div className="flex sm:hidden">
        <div className="flex flex-col gap-8">
          <div>
            <div className="text-secondary">
              <Link href={`/events/${event.slug}`}>
                {formatDateRange({
                  start: event.startDate,
                  end: event.endDate,
                  withTime: event.hasTime,
                  timeZone: site.timeZone!,
                })}
              </Link>
            </div>
            {location ? <LocationLink location={location} /> : null}
          </div>
          <div className="">
            <Link href={`/events/${event.slug}`}>{content.title}</Link>
          </div>
          <Link href={`/events/${event.slug}`}>
            <VenueImage image={event.image} />
          </Link>
          <div className="">
            <Link href={`/events/${event.slug}`}>
              <VenueContent content={content} contentStyles={renderedStyles} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
