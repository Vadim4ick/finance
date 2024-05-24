"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Account } from "../types/account";

const useGetAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],

    queryFn: async () => {
      const res = await $api.get<{ accounts: Account[] }>("/accounts/getAll");

      return res.data;
    },

    // onSuccess() {
    //   toast.success("Вы успешно зарегестрировались!");
    //   toggleType();
    // },

    // onError(message: any) {
    //   toast.success(message.response.data.warningMessage);
    // },
  });
};

export { useGetAccounts };
