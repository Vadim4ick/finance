import { Table, TableBody, TableCell, TableRow } from "@/shared/ui/table";
import { Input } from "@/shared/custom-ui/Input";
import { Button } from "@/shared/custom-ui/Button";
import { Loader2, Trash } from "lucide-react";
import { Row, flexRender } from "@tanstack/react-table";
import {
  Category,
  columnsCategory,
  openCreateCategoryModal,
  useDeleteCategories,
  useGetCategories,
} from "@/entities/TableColumns";
import { TableHeaderCategories } from "./TableHeaderCategories";
import { useTable } from "@/shared/hooks/useTable";
import { TableBodyCategories } from "./TableBodyCategories";

const TableCategories = () => {
  const { isLoading, data } = useGetCategories();

  // const table = useTableCategory();

  const { currentPage, pageCount, table } = useTable<Category>({
    columns: columnsCategory,
    data: data?.categories,
  });

  const mutateDelete = useDeleteCategories();

  const onDelete = (row: Row<Category>[]) => {
    const ids = row.map((item) => item.original.id);

    mutateDelete.mutate(ids, {
      onSuccess() {
        table.resetRowSelection();
      },
    });
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
        <h2 className="text-xl font-semibold">Категории</h2>

        <Button variant="black" onClick={() => openCreateCategoryModal()}>
          Добавить новую
        </Button>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
            <TableHeaderCategories table={table} />
            <TableBodyCategories table={table} />
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

export { TableCategories };
