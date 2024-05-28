import { Table } from "@/shared/ui/table";
import {
  Transaction,
  columnsTransaction,
  openCreateTransactionModal,
  useCreateBulkTransactions,
  useDeleteTransactions,
  useGetTransactions,
  useSelectAccount,
} from "@/entities/TableColumns";
import { useTable } from "@/shared/hooks/useTable";
import { Loader2, Trash } from "lucide-react";
import { TableHeaderTransactions } from "./TableHeaderTransactions";
import { Input } from "@/shared/custom-ui/Input";
import { TableBodyTransactions } from "./TableBodyTransactions";
import { Row } from "@tanstack/react-table";
import { CSVResult, UploadButton } from "./UploadButton";
import { Button as ButtonUI } from "@/shared/ui/button";
import { Button } from "@/shared/custom-ui/Button";
import { useState } from "react";
import { TableImport, options } from "./TableImport";
import { format, parse } from "date-fns";
import { toast } from "sonner";

enum Variants {
  DEFAULT = "DEFAULT",
  IMPORT = "IMPORT",
}

export interface SelectedColumnsState {
  [key: string]: string | null;
}

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};

const TableTransactions = () => {
  const [variant, setVariant] = useState<Variants>(Variants.DEFAULT);

  const [AccontDialog, confirm] = useSelectAccount();

  const { data, isLoading } = useGetTransactions();

  const mutate = useCreateBulkTransactions();

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {},
  );
  const [importResults, setImportResults] = useState<CSVResult>(
    INITIAL_IMPORT_RESULT,
  );

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
    setVariant(Variants.IMPORT);
    setImportResults(results);
  };

  const onChangeSelect = (value: string | null, columnIdx: number) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIdx}`] = value;

      return newSelectedColumns;
    });
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULT);
    setVariant(Variants.DEFAULT);
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = async () => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue");
    }

    const headers = importResults.data[0];
    const body = importResults.data.slice(1);

    const getColumnIdx = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_: string, idx: number) => {
        const columnIdx = getColumnIdx(`column_${idx}`);

        return selectedColumns[`column_${columnIdx}`] || null;
      }),

      body: body
        .map((row) => {
          const transformedRow = row.map((cell: string, idx: number) => {
            const columnIdx = getColumnIdx(`column_${idx}`);

            return selectedColumns[`column_${columnIdx}`] ? cell : null;
          });

          return transformedRow.every((item: any) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell: string, idx: number) => {
        const header = mappedData.headers[idx];

        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: Math.round(parseFloat(item.amount) * 1000),
      date: format(
        parse(item.date, "yyyy-MM-dd HH:mm:ss", new Date()),
        "yyyy-MM-dd",
      ),
    }));

    mutate.mutate(formattedData);
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

  if (Variants.IMPORT === variant) {
    return (
      <>
        <AccontDialog />

        <div className="flex flex-col gap-4 border-none drop-shadow-sm">
          <div className="flex gap-y-2 lg:items-center lg:justify-between">
            <h3 className="line-clamp-1 text-xl">Import transaction</h3>

            <div className="flex items-center gap-x-2 gap-y-2">
              <ButtonUI
                onClick={onCancelImport}
                size={"sm"}
                className="w-full lg:w-auto"
              >
                Cancel
              </ButtonUI>

              <ButtonUI
                onClick={handleContinue}
                disabled={progress < options.length}
                size={"sm"}
              >
                Continue ({progress} / {options.length})
              </ButtonUI>
            </div>
          </div>

          <TableImport
            selectedColumns={selectedColumns}
            onChangeSelect={onChangeSelect}
            data={importResults.data}
          />
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
