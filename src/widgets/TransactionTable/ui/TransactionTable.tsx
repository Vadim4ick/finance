"use client";

import {
  $variant,
  Variants,
  useCreateBulkTransactions,
  useGetAccounts,
  useGetCategories,
} from "@/entities/TableColumns";
import { BodyTable } from "@/features/BodyTable";
import { HeaderTable } from "@/features/HeaderTable";
import {
  NewTransactionModal,
  TableImportFormTransaction,
  TableTransactions,
} from "@/features/Tables";
import { useUnit } from "effector-react";
import { Loader2 } from "lucide-react";

const TransactionTable = () => {
  const variant = useUnit($variant);

  const { data: dataAccounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { data: dataCategories, isLoading: isLoadingCategories } =
    useGetCategories();

  const disabled = isLoadingCategories || isLoadingAccounts;

  const { isPending } = useCreateBulkTransactions();

  if (isPending) {
    return (
      <>
        <div className="h-[450px] w-full">
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="size-5 animate-spin" />
          </div>
        </div>
      </>
    );
  }

  if (Variants.IMPORT === variant) {
    return (
      <div className="mx-auto -mt-32 max-w-[1350px] rounded-xl bg-white p-5 drop-shadow-xl">
        <TableImportFormTransaction />
      </div>
    );
  }

  return (
    <div className="mx-auto -mt-32 max-w-6xl rounded-xl bg-white p-5 drop-shadow-xl">
      <TableTransactions Header={HeaderTable} Body={BodyTable} />

      <NewTransactionModal
        dataAccounts={dataAccounts?.accounts}
        dataCategories={dataCategories?.categories}
        disabled={disabled}
      />
    </div>
  );
};

export { TransactionTable };
