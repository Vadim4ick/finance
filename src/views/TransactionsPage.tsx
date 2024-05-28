"use client";

import { useGetAccounts, useGetCategories } from "@/entities/TableColumns";
import { NewTransactionModal, TableTransactions } from "@/features/Tables";

const TransactionsPage = () => {
  const { data: dataAccounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { data: dataCategories, isLoading: isLoadingCategories } =
    useGetCategories();

  const disabled = isLoadingCategories || isLoadingAccounts;

  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TableTransactions />

      <NewTransactionModal
        dataAccounts={dataAccounts?.accounts}
        dataCategories={dataCategories?.categories}
        disabled={disabled}
      />
    </div>
  );
};

export { TransactionsPage };
