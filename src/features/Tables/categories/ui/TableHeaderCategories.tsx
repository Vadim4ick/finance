import { Category } from "@/entities/TableColumns";
import { TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Table, flexRender } from "@tanstack/react-table";

const TableHeaderCategories = ({ table }: { table: Table<Category> }) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export { TableHeaderCategories };
