"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { setProfile } from "../context";

const useProfile = () => {
  return useQuery({
    queryFn: async () => {
      const res = await $api.get("/users/login-check");

      if (res.data.user) {
        setProfile(res.data.user);
      }

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
