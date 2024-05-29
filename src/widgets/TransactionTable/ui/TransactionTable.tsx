"use client";

import {
  $modalEditTransactionId,
  $variant,
  Variants,
  useCreateBulkTransactions,
  useGetAccounts,
  useGetCategories,
} from "@/entities/TableColumns";
import { BodyTable } from "@/features/BodyTable";
import { HeaderTable } from "@/features/HeaderTable";
import {
  EditTransactionModal,
  NewTransactionModal,
  TableImportFormTransaction,
  TableLoading,
  TableTransactions,
} from "@/features/Tables";
import { useUnit } from "effector-react";

const TransactionTable = () => {
  const variant = useUnit($variant);

  const [modalId] = useUnit([$modalEditTransactionId]);

  const { data: dataAccounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { data: dataCategories, isLoading: isLoadingCategories } =
    useGetCategories();

  const disabled = isLoadingCategories || isLoadingAccounts;

  const { isPending } = useCreateBulkTransactions();

  if (isPending) {
    return <TableLoading />;
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

      {modalId && (
        <EditTransactionModal
          dataAccounts={dataAccounts?.accounts}
          dataCategories={dataCategories?.categories}
          disabled={disabled}
          id={modalId}
        />
      )}
    </div>
  );
};

export { TransactionTable };
