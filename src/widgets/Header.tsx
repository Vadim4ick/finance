"use client";

import { $profile } from "@/entities/Profile";
import { Navbar } from "@/features/Navbar";
import { Logo } from "@/shared/icons/Logo";
import { useUnit } from "effector-react";
import Link from "next/link";
import { DropdownAvatar } from "@/features/DropdownAvatar";

const Header = () => {
  const profile = useUnit($profile);

  return (
    <>
      <header className="bg-gradient-to-b from-blue-600 to-blue-500 px-4 py-8 pb-36 lg:px-14">
        <div className="mx-auto max-w-screen-2xl">
          <div className="item-center mb-14 flex w-full items-center justify-between">
            <div className="flex items-center lg:gap-x-16">
              <Link href={"/"}>
                <div className="hidden items-center lg:flex">
                  <Logo className="size-7 text-white" />

                  <p className="ml-2.5 text-2xl font-semibold text-white">
                    Finance
                  </p>
                </div>
              </Link>

              <Navbar />
            </div>

            <DropdownAvatar />
          </div>

          <div className="mb-4 space-y-2">
            <h1 className="text-2xl font-medium text-white lg:text-4xl">
              Welcome Back, {profile?.username} 👋
            </h1>
            <p className="text-sm text-[#89b6fd] lg:text-base">
              This is your Financial Overview Report
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export { Header };
