"use client";

import { $api } from "@/shared/api/api";
import { removeFromStorage } from "@/shared/services/auth-token.sevice";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogoutUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await $api.post("/users/logout");

      return res.data;
    },

    onSuccess() {
      toast.success("Успешный выход");

      removeFromStorage();

      router.push("/");
    },
  });
};

export { useLogoutUser };
