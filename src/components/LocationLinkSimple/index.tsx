import {
  LocationSlim as VenueLocation,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const LocationLinkSimple = ({
  location,
  className,
}: {
  location: VenueLocation;
  className?: string;
}) => {
  const { mapLink } = location;

  return mapLink ? (
    <a
      href={mapLink}
      target="_blank"
      className={cn("flex gap-2 text-secondary", className)}
    >
      <LocationDisplay
        location={location}
        icon={<MapPin className="hidden" />}
      />{" "}
    </a>
  ) : (
    <LocationDisplay location={location} />
  );
};

const LocationDisplay = ({
  location,
  icon,
}: {
  location: VenueLocation;
  icon?: ReactNode;
}) => {
  const locale = useLocale();
  const { content: locationContent } = getLocalizedContent(
    location.localizedContent,
    locale,
  );
  const { isDefault, country, city, region } = location;

  return (
    <div className="hover:brightness-150 md:text-nowrap">
      {!isDefault ? `${city ? `${city},` : ""}` : null} {locationContent.title}
      <span className="inline-block px-2">{icon}</span>
    </div>
  );
};
