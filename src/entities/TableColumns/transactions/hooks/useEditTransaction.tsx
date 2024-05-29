"use client";

import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closeEditTransactionModal } from "../context";
import { BodyTransaction } from "../columns/types";

const useEditTransaction = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ body }: { body: BodyTransaction }) => {
      const res = await $api.patch(`/transactions/edit/${id}`, {
        body: { ...body },
      });

      return res.data;
    },

    onSuccess() {
      toast.success(`Транзакция была успешно обновлена!`);
      closeEditTransactionModal();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactionsById", id] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useEditTransaction };
