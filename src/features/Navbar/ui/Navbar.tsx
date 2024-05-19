"use client";

import { arrNavbar } from "@/shared/const/navbar.const";
import { NavbarItem } from "./NavbarItem";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="hidden items-center gap-x-2 overflow-x-auto lg:flex">
        {arrNavbar.map((nav, i) => {
          return (
            <NavbarItem key={i} nav={nav} isActive={pathname === nav.path} />
          );
        })}
      </ul>
    </nav>
  );
};

export { Navbar };
