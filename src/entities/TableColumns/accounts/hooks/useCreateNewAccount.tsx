import { $api } from "@/shared/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { closeCreateAccountModal } from "../context";

const useCreateNewAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAccount: { name: string }) => {
      const res = await $api.post("/accounts/create", {
        body: newAccount,
      });

      return res.data;
    },

    onSuccess(data) {
      toast.success(`Счет ${data.data.name} был успешно добавлен!`);
      closeCreateAccountModal();
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useCreateNewAccount };
