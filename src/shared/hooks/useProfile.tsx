"use client";

import { useQuery } from "@tanstack/react-query";
import { $api } from "../api/api";

const useProfile = () => {
  return useQuery({
    queryFn: async () => {
      const res = await $api.get("/users/login-check");

      return res.data;
    },
    queryKey: ["profile"],

    // onSuccess() {
    //   toast.success("Вы успешно зарегестрировались!");
    //   toggleType();
    // },

    // onError(message: any) {
    //   toast.success(message.response.data.warningMessage);
    // },
  });
};

export { useProfile };
