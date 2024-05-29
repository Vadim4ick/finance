import { Table } from "@/shared/ui/table";
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
import { Loader2, Trash } from "lucide-react";
import { TableHeaderTransactions } from "./TableHeaderTransactions";
import { Input } from "@/shared/custom-ui/Input";
import { TableBodyTransactions } from "./TableBodyTransactions";
import { Row } from "@tanstack/react-table";
import { UploadButton } from "./UploadButton";
import { Button as ButtonUI } from "@/shared/ui/button";
import { Button } from "@/shared/custom-ui/Button";

const TableTransactions = () => {
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

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Транзакции</h2>

        <div className="flex gap-5">
          <ButtonUI size={"sm"} onClick={() => openCreateTransactionModal()}>
            Добавить новую
          </ButtonUI>

          <UploadButton handleUpload={handleUpload} />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Filter date..."
            value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("date")?.setFilterValue(event.target.value)
            }
            className="w-80 max-w-sm"
          />

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              disabled={mutateDelete.isPending}
              className="ml-auto border text-xs font-normal"
              variant="reset"
              onClick={() => onDelete(table.getFilteredSelectedRowModel().rows)}
            >
              <Trash className="mr-2 size-4" />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeaderTransactions table={table} />
            <TableBodyTransactions table={table} />
          </Table>
        </div>

        {Boolean(table.getFilteredRowModel().rows.length) && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} из{" "}
              {table.getFilteredRowModel().rows.length} чекбоксов выбрано.
            </div>

            <div>
              {currentPage}/{pageCount}
            </div>

            <Button
              variant="black"
              className="text-[12px]"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Button
              variant="black"
              className="text-[12px]"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export { TableTransactions };
