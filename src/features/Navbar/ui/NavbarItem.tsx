import type { NavbarItem } from "@/shared/const/navbar.const";
import { cn } from "@/shared/utils/index.utils";
import Link from "next/link";

const NavbarItem = ({
  nav,
  isActive,
}: {
  nav: NavbarItem;
  isActive?: boolean;
}) => {
  return (
    <li className="p-2">
      <Link
        href={nav.path}
        className={cn(
          "rounded-sm p-2 text-white/90 transition hover:bg-white/20 hover:text-white",
          isActive ? "bg-white/10 text-white" : "bg-transparent",
        )}
      >
        {nav.name}
      </Link>
    </li>
  );
};

export { NavbarItem };
