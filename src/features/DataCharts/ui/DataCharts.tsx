"use client";

import { useGetSummaryTransactions } from "@/entities/TableColumns";
import { useSearchParams } from "next/navigation";
import { Chart, ChartLoading } from "./Chart";
import { SpendingPie, SpendingPieLoading } from "./SpendingPie";

const DataCharts = () => {
  const params = useSearchParams();

  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const accountId = params.get("accountId") || undefined;

  const { data, isLoading } = useGetSummaryTransactions({
    accountId,
    from,
    to,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>

        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.data.days} />
      </div>

      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.data.categories} />
      </div>
    </div>
  );
};

export { DataCharts };
