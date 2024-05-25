"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Account } from "../columns/types/account";

const useGetAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],

    queryFn: async () => {
      const res = await $api.get<{ accounts: Account[] }>("/accounts/getAll");

      return res.data;
    },
  });
};

export { useGetAccounts };
