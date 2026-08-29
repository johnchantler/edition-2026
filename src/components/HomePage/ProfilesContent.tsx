import { getProfiles, getSite } from "@venuecms/sdk-next";

import { Link } from "@/lib/i18n";

import { ListProfile } from "@/components/ListProfile";

export async function ProfilesContent() {
  const [{ data: profiles }, { data: site }] = await Promise.all([
    getProfiles({ limit: 299, dir: "desc" }),
    getSite(),
  ]);

  if (!site) return null;

  return (
    <section className="py-20">
      <div className="flex flex-col justify-between gap-0 md:flex-row md:flex-wrap md:gap-x-8">
        {profiles?.records.map((profile) => (
          <ListProfile key={profile.slug} profile={profile} />
        ))}
      </div>
    </section>
  );
}
