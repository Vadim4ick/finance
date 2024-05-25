import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closeEditAccountModal } from "../context";

const useEditAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, id }: { name: string; id: string }) => {
      const res = await $api.patch(`/accounts/edit/${id}`, {
        body: { name },
      });

      return res.data;
    },

    onSuccess() {
      toast.success(`Счет был успешно обновлен!`);
      closeEditAccountModal();
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useEditAccount };
