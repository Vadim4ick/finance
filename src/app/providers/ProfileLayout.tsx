"use client";

import { useProfile } from "@/entities/Profile";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useProfile();

  if (isLoading) {
    return <div>load...</div>;
  }

  return <>{children}</>;
};

export { ProfileLayout };
