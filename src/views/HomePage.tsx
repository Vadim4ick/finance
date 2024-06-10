"use client";

import { useGetSummaryTransactions } from "@/entities/TableColumns";
import { useSearchParams } from "next/navigation";

const HomePage = () => {
  const params = useSearchParams();

  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const accountId = params.get("accountId") || undefined;

  const { data } = useGetSummaryTransactions({ from, to, accountId });

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
      123
    </div>
  );
};

export { HomePage };
