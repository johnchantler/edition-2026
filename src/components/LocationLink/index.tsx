import {
  LocationSlim as VenueLocation,
  getLocalizedContent,
} from "@venuecms/sdk-next";
import { MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const LocationLink = ({
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
      className={cn("flex items-center gap-2 text-secondary", className)}
    >
      <LocationDisplay location={location} icon={<MapPin className="" />} />{" "}
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
    <div className="text-balance hover:brightness-150">
      {locationContent.title}
      {!isDefault ? `${city ? `, ${city}` : ""}` : null}
    </div>
  );
};

export const LocationAddress = ({
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

  const {
    isDefault,
    address,
    mapLink,
    address2,
    zipCode,
    country,
    city,
    region,
    externalLink,
  } = location;

  return (
    <>
      <div className="font-content text-sm text-secondary md:pl-24">
        <div>
          {locationContent.title}
          {!isDefault
            ? `${address ? `, ${address}` : ""} 
        ${address2 ? `, ${address2}` : ""} 
        ${city ? ` ${city}` : ""} ${zipCode ? zipCode : ""}`
            : null}
        </div>
        <div className="flex flex-row gap-4 md:pl-4">
          {mapLink ? (
            <Link href={mapLink} target="_blank">
              <span className="inline-block text-highlight hover:translate-y-0.5">
                [map]
              </span>
            </Link>
          ) : null}
          {externalLink ? (
            <Link href={externalLink} target="_blank">
              <span className="inline-block pt-1 text-highlight hover:translate-y-0.5">
                [accessibilty]
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};
