"use client";

import { useProfile } from "@/entities/Profile";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export { ProfileLayout };
