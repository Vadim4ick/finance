"use client";

import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BodyTransaction } from "../columns/types";

const useCreateBulkTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bodyTransactions: BodyTransaction[]) => {
      const res = await $api.post("/transactions/bulk-create", {
        body: bodyTransactions,
      });

      return res.data;
    },

    onSuccess() {
      toast.success(`Транзакции были успешно добавлены!`);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useCreateBulkTransactions };
