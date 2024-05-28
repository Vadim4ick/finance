"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../columns/types";

const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],

    queryFn: async () => {
      const res = await $api.get<{ transactions: Transaction[] }>(
        "/transactions/getAll",
      );

      return res.data;
    },
  });
};

export { useGetTransactions };
