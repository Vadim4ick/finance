"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../columns/types";

const useGetSummaryTransactions = ({
  from,
  to,
  accountId,
}: {
  from?: string;
  to?: string;
  accountId?: string;
}) => {
  return useQuery({
    queryKey: ["transactions", { from, to, accountId }],

    queryFn: async () => {
      const res = await $api.get<{ transactions: Transaction[] }>(
        "/transactions/get-summary",
        {
          params: {
            from,
            to,
            accountId,
          },
        },
      );

      return res.data;
    },
  });
};

export { useGetSummaryTransactions };
