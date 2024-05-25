"use client";

import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closeEditCategoryModal } from "../context";

const useEditCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, id }: { name: string; id: string }) => {
      const res = await $api.patch(`/categories/edit/${id}`, {
        body: { name },
      });

      return res.data;
    },

    onSuccess() {
      toast.success(`Категория была успешно обновлена!`);
      closeEditCategoryModal();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useEditCategories };
