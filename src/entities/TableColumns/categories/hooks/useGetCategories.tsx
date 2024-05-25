"use client";

import { $api } from "@/shared/api/api";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../columns/types/category";

const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const res = await $api.get<{ categories: Category[] }>(
        "/categories/getAll",
      );

      return res.data;
    },
  });
};

export { useGetCategories };
