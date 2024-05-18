"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { $apiClient } from "@/shared/api/api";
import { AuthForm } from "../type";
import { useRouter } from "next/navigation";
import { saveTokenStorage } from "@/shared/services/auth-token.sevice";

const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (newUser: AuthForm) => {
      const res = await $apiClient.post("/users/auth", {
        body: newUser,
      });

      if (res.data.accessToken) saveTokenStorage(res.data.accessToken);

      return res.data;
    },

    onSuccess() {
      toast.success("Вы успешно вошли в аккаунт!");
      router.push("/i");
    },

    onError(message: any) {
      toast.success(message.response.data.warningMessage);
    },
  });
};

export { useLoginUser };
