import { getProfileEvents, getSite } from "@venuecms/sdk-next";

import { EventsList, ListEvent } from "@/components/EventList";
import { Skeleton } from "@/components/ui/Input/Skeleton";

export const ProfileEventList = async ({
  header,
  slug,
  filter,
}: {
  header: string;
  slug: string;
  filter?: { upcoming?: boolean; lt?: number; dir?: "asc" | "desc" };
}) => {
  const [{ data: events }, { data: site }] = await Promise.all([
    getProfileEvents({ slug, limit: 60, ...filter }),
    getSite(),
  ]);

  if (!site) {
    return null;
  }

  return events?.records.length ? (
    <div className="flex flex-col gap-0">
      <h2 className="z-50 m-0 py-0 pl-8 text-muted md:pl-16">( {header} )</h2>
      <EventsList>
        {events.records.map((event) => (
          <ListEvent
            key={event.id}
            event={event}
            site={site}
            withTime={false}
            dateTemplate={"d.MM.yy"}
          />
        ))}
      </EventsList>
    </div>
  ) : null;
};

export const ProfileEventListSkeleton = ({
  numElements = 2,
}: {
  numElements?: number;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="w-1/4" />
      <EventsList>
        {Array.from({ length: numElements }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-[90%]" />
        ))}
      </EventsList>
    </div>
  );
};
