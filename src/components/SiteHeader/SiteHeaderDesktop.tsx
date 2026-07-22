import { ReactNode } from "react";

import {
  ColumnFull,
  ColumnLeft,
  ColumnRight,
  TwoColumnLayout,
} from "../layout";

export const SiteHeaderDesktop = async ({
  logo,
  nav,
}: {
  logo: ReactNode;
  nav: ReactNode;
}) => {
  return (
    <header className="top-0 z-50 hidden min-h-14 items-center text-nav md:sticky md:flex lg:gap-40">
      <TwoColumnLayout className="py-0 pt-0 md:py-0 lg:items-center lg:py-0">
        <ColumnFull className="flex w-full flex-row items-center justify-between">
          {logo} {nav}
        </ColumnFull>
      </TwoColumnLayout>
    </header>
  );
};
