"use client";

import { ReactNode } from "react";

import { SearchInput } from "../Search/SearchInput";
import { useSearchQuery } from "../Search/provider";
import { SiteLogo } from "../SiteLogo";

export const NavMenuDesktop = ({
  showSearch,
  children,
}: {
  showSearch: boolean;
  children: ReactNode;
}) => {
  const { isActive } = useSearchQuery();
  return (
    <nav className="relative hidden w-full items-center justify-between md:flex">
      {!isActive ? (
        <ol className="md: flex w-full items-center justify-between px-8 text-nav lg:px-16">
          {children}
        </ol>
      ) : null}
      {showSearch ? <SearchInput /> : null}
    </nav>
  );
};
