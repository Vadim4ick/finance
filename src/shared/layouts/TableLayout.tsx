import { Trash } from "lucide-react";
import { Table } from "../ui/table";
import { Input } from "../custom-ui/Input";
import { ColumnDef, Row, Table as TableProp } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface Props<T> {
  title: string;
  createFn: VoidFunction;
  table: TableProp<T>;
  Header: ITableHeader;
  Body: ITableBody;
  currentPage: number;
  pageCount: number;
  columnsCategory: ColumnDef<T>[];
  loadingDelete: boolean;
  onDelete: (row: Row<T>[]) => void;

  Upload?: () => JSX.Element;
}

const TableLayout = <T,>(props: Props<T>) => {
  const {
    title,
    createFn,
    table,
    Header,
    Body,
    currentPage,
    pageCount,
    columnsCategory,
    onDelete,
    loadingDelete,
    Upload,
  } = props;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex gap-5">
          <Button onClick={() => createFn()}>Добавить новую</Button>

          {Upload && <Upload />}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          {Upload ? (
            <Input
              placeholder="Filter date..."
              value={
                (table.getColumn("date")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("date")?.setFilterValue(event.target.value)
              }
              className="w-80 max-w-sm"
            />
          ) : (
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
          )}

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              disabled={loadingDelete}
              className="ml-auto border text-xs font-normal"
              variant={"outline"}
              onClick={() => onDelete(table.getFilteredSelectedRowModel().rows)}
            >
              <Trash className="mr-2 size-4" />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <Header<T> table={table} />

            <Body<T>
              table={table}
              nullTitle="Список пуст."
              columns={columnsCategory}
            />
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
              variant={"outline"}
              className="text-[12px]"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Button
              variant={"outline"}
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

export { TableLayout };
