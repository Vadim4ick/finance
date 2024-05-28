"use client";

import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closeCreateTransactionModal } from "../context";
import { BodyTransaction } from "../columns/types";

const useCreateNewTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bodyTransaction: BodyTransaction) => {
      const res = await $api.post("/transactions/create", {
        body: bodyTransaction,
      });

      return res.data;
    },

    onSuccess() {
      toast.success(`Транзакция была успешно добавлена!`);
      closeCreateTransactionModal();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useCreateNewTransaction };
