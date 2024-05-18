"use client";

import { useProfile } from "@/shared/hooks/useProfile";
import { ReactNode } from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const { data } = useProfile();

  console.log(data);

  return <>{children}</>;
};

export { ProfileLayout };
