import { ProfileLayout } from "@/app/providers/ProfileLayout";
import { Header } from "@/widgets/Header";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileLayout>
      <Header />

      {children}
    </ProfileLayout>
  );
};

export default DashboardLayout;
