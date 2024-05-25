import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await $api.delete(`/accounts/delete/${ids}`);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      return res.data;
    },

    onSuccess() {
      toast.success(`Успешное удаление`);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useDeleteAccount };
