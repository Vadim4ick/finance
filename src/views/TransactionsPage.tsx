"use client";

import { useGetAccounts, useGetCategories } from "@/entities/TableColumns";
import { NewTransactionModal } from "@/features/Tables";
import { TransactionTable } from "@/widgets/TransactionTable";

const TransactionsPage = () => {
  const { data: dataAccounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { data: dataCategories, isLoading: isLoadingCategories } =
    useGetCategories();

  const disabled = isLoadingCategories || isLoadingAccounts;

  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TransactionTable />

      <NewTransactionModal
        dataAccounts={dataAccounts?.accounts}
        dataCategories={dataCategories?.categories}
        disabled={disabled}
      />
    </div>
  );
};

export { TransactionsPage };
