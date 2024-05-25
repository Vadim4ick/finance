"use client";

import {
  EditCategoryModal,
  NewCategoryModal,
  TableCategories,
} from "@/features/Tables";

const CategoriesPage = () => {
  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TableCategories />
      <NewCategoryModal />
      <EditCategoryModal />
    </div>
  );
};

export { CategoriesPage };
