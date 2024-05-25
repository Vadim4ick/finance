"use client";

import {
  EditAccountModal,
  NewAccountModal,
  TableAccounts,
} from "@/features/Tables";

export function DataTable() {
  return (
    <>
      <TableAccounts />
      <NewAccountModal />
      <EditAccountModal />
    </>
  );
}
