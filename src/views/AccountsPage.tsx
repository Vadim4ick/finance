"use client";

import {
  EditAccountModal,
  NewAccountModal,
  TableAccounts,
} from "@/features/Tables";

const AccountsPage = () => {
  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TableAccounts />
      <NewAccountModal />
      <EditAccountModal />
    </div>
  );
};

export { AccountsPage };
