"use client";

import { BodyTable } from "@/features/BodyTable";
import { HeaderTable } from "@/features/HeaderTable";
import {
  EditAccountModal,
  NewAccountModal,
  TableAccounts,
} from "@/features/Tables";

const AccountsTable = () => {
  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TableAccounts Header={HeaderTable} Body={BodyTable} />

      <NewAccountModal />
      <EditAccountModal />
    </div>
  );
};

export { AccountsTable };
