import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await $api.delete(`/accounts/delete/${ids}`);

      return res.data;
    },

    onSuccess(data) {
      toast.success(`Успешное удаление`);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useDeleteAccount };
