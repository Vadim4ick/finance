import { Table } from "@/shared/ui/table";
import { TableHeaderAccounts } from "./TableHeaderAccounts";
import { TableBodyAccounts } from "./TableBodyAccounts";
import { useTableAccounts } from "../hooks/index.hooks";
import { Input } from "@/shared/custom-ui/Input";
import { Button } from "@/shared/custom-ui/Button";
import {
  Account,
  openAccountModal,
  useDeleteAccount,
} from "@/entities/TableColumns";
import { NewAccount } from "../modal/NewAccount";
import { Trash } from "lucide-react";
import { Row } from "@tanstack/react-table";

const TableAccounts = () => {
  const table = useTableAccounts();

  const { mutate: mutateDelete, isSuccess } = useDeleteAccount();

  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  const onDelete = (row: Row<Account>[]) => {
    const ids = row.map((item) => item.original.id);

    mutateDelete(ids);

    if (isSuccess) {
      table.resetRowSelection();
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Счета</h2>

          <Button variant="black" onClick={() => openAccountModal()}>
            Добавить новую
          </Button>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Filter name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-80 max-w-sm"
            />

            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                className="ml-auto border text-xs font-normal"
                variant="reset"
                onClick={() =>
                  onDelete(table.getFilteredSelectedRowModel().rows)
                }
              >
                <Trash className="mr-2 size-4" />
                Delete ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeaderAccounts table={table} />
              <TableBodyAccounts table={table} />
            </Table>
          </div>

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
        </div>
      </div>

      <NewAccount />
    </>
  );
};

export { TableAccounts };
