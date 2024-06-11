"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../categories/columns/types/category";

interface Summary {
  remainingAmount: number;
  remainingChange: number;
  incomeAmount: number;
  incomeChange: number;
  expensesAmount: number;
  expensesChange: number;
  categories: Category[];
  days: {
    date: Date;
    income: number;
    expenses: number;
  }[];
}

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
      const res = await $api.get<{ data: Summary }>(
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
