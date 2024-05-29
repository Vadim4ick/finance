"use client";

import { BodyTable } from "@/features/BodyTable";
import { HeaderTable } from "@/features/HeaderTable";
import {
  EditCategoryModal,
  NewCategoryModal,
  TableCategories,
} from "@/features/Tables";

const CategoriesTable = () => {
  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TableCategories Header={HeaderTable} Body={BodyTable} />

      <NewCategoryModal />
      <EditCategoryModal />
    </div>
  );
};

export { CategoriesTable };
