import {
  CSVResult,
  Transaction,
  columnsTransaction,
  openCreateTransactionModal,
  setImportResults,
  setVariantFormImport,
  useDeleteTransactions,
  useGetTransactions,
} from "@/entities/TableColumns";
import { useTable } from "@/shared/hooks/useTable";
import { Row } from "@tanstack/react-table";
import { UploadButton } from "./UploadButton";
import { TableLoading } from "../../TableLoading";
import { TableLayout } from "@/shared/layouts/TableLayout";

interface Props {
  Header: ITableHeader;
  Body: ITableBody;
}

const TableTransactions = (props: Props) => {
  const { Header, Body } = props;

  const { data, isLoading } = useGetTransactions();

  const { currentPage, pageCount, table } = useTable<Transaction>({
    columns: columnsTransaction,
    data: data?.transactions,
  });

  const mutateDelete = useDeleteTransactions();

  const onDelete = (row: Row<Transaction>[]) => {
    const ids = row.map((item) => item.original.id);

    mutateDelete.mutate(ids, {
      onSuccess() {
        table.resetRowSelection();
      },
    });
  };

  const handleUpload = (results: CSVResult) => {
    setVariantFormImport();
    setImportResults(results);
  };

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <TableLayout<Transaction>
      Body={Body}
      Header={Header}
      columnsCategory={columnsTransaction}
      createFn={openCreateTransactionModal}
      currentPage={currentPage}
      pageCount={pageCount}
      loadingDelete={mutateDelete.isPending}
      onDelete={onDelete}
      table={table}
      title="Транзации"
      Upload={() => <UploadButton handleUpload={handleUpload} />}
    />
  );
};

export { TableTransactions };
