import { Site } from "@venuecms/sdk-next";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { VenueImage } from "@/components/VenueImage";

export const SiteLogo = ({
  className,
  site,
}: {
  className?: string;
  site: Site;
}) => {
  const { name, image } = site;

  const headerImage = image ? (
    <VenueImage image={image} className="h-full max-h-12 w-full md:max-h-16" />
  ) : null;

  return headerImage ? (
    <Link href="/">{headerImage}</Link>
  ) : (
    <h1 className={cn("text-nav", className)}>
      <Link href="/">{name}</Link>
    </h1>
  );
};
