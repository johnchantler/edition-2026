import { getLocalizedContent } from "@venuecms/sdk-next";
import { getEvents, getPage, getSite } from "@venuecms/sdk-next";
import { notFound } from "next/navigation";

import { EventsList, ListEvent } from "@/components/EventList";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "@/components/layout";

import { EventsListArtist, ListEventArtist } from "../EventListArtist";

export async function EventsListContent({ locale }: { locale: string }) {
  const [{ data: events }, { data: page }, { data: site }] = await Promise.all([
    getEvents({ limit: 60, upcoming: true }),
    getPage({ slug: "events" }),
    getSite(),
  ]);

  if (!site) {
    notFound();
  }

  const pageTitle = page
    ? getLocalizedContent(page.localizedContent, locale).content.title
    : "upcoming events";

  return (
    <TwoColumnLayout>
      <ColumnFull className="gap-0">
        <p className="pl-8 text-muted md:pl-16">( {pageTitle} )</p>
        {events?.records.length ? (
          <EventsListArtist className="gap-y-12">
            {events.records.map((event) => (
              <ListEventArtist
                key={event.id}
                event={event}
                site={site}
                withTime={false}
                dateTemplate={"d.M"}
              />
            ))}
          </EventsListArtist>
        ) : (
          "No events found"
        )}
      </ColumnFull>
    </TwoColumnLayout>
  );
}
