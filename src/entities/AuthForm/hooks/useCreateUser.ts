import { useMutation } from "@tanstack/react-query";
import { RegisterForm } from "../type";
import { toast } from "sonner";
import { $apiClient } from "@/shared/api/api";
import { toggleType } from "../context";
import { saveTokenStorage } from "@/shared/services/auth-token.sevice";

const useCreateUser = () => {
  return useMutation({
    mutationFn: async (newUser: Partial<RegisterForm>) => {
      const res = await $apiClient.post("/users/create", {
        body: newUser,
      });

      if (res.data.accessToken) saveTokenStorage(res.data.accessToken);

      return res.data;
    },

    onSuccess() {
      toast.success("Вы успешно зарегестрировались!");
      toggleType();
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useCreateUser };
