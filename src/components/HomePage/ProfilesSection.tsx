import { Suspense } from "react";

import { ErrorBoundary } from "@/components/utils/ErrorBoundary";

import { ProfilesError } from "./ErrorFallbacks";
import { ProfilesSkeleton } from "./LoadingSkeletons";
import { ProfilesContent } from "./ProfilesContent";

export function ProfilesSection() {
  return (
    <ErrorBoundary fallback={<ProfilesError />}>
      <Suspense fallback={<ProfilesSkeleton />}>
        <ProfilesContent />
      </Suspense>
    </ErrorBoundary>
  );
}
