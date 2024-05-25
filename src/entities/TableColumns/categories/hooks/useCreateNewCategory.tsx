"use client";

import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closeCreateCategoryModal } from "../context";

const useCreateNewCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAccount: { name: string }) => {
      const res = await $api.post("/categories/create", {
        body: newAccount,
      });

      return res.data;
    },

    onSuccess(data) {
      toast.success(`Категория ${data.data.name} была успешно добавлена!`);
      closeCreateCategoryModal();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useCreateNewCategory };
