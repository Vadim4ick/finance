"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../columns/types";

const useGetTransactionById = (id: string) => {
  return useQuery({
    queryKey: ["transactionsById", id],

    queryFn: async () => {
      const res = await $api.get<{ transaction: Transaction }>(
        `/transactions/get/${id}`,
      );

      return res.data;
    },
  });
};

export { useGetTransactionById };
