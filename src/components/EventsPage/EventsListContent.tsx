import { getLocalizedContent } from "@venuecms/sdk-next";
import { getEvents, getPage, getSite } from "@venuecms/sdk-next";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { EventsList, ListEvent } from "@/components/EventList";
import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "@/components/layout";

export async function EventsListContent({ locale }: { locale: string }) {
  await connection();

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
        <p className="translate-x-8 text-muted md:translate-x-16">
          ( {pageTitle} )
        </p>
        {events?.records.length ? (
          <EventsList className="gap-y-12">
            {events.records.map((event) => (
              <ListEvent
                key={event.id}
                event={event}
                site={site}
                withTime={false}
                dateTemplate={"d.M.yy"}
              />
            ))}
          </EventsList>
        ) : (
          "No events found"
        )}
      </ColumnFull>
    </TwoColumnLayout>
  );
}
