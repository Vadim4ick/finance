import { TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Table, flexRender } from "@tanstack/react-table";
import type { Account } from "@/entities/TableColumns";

const TableHeaderAccounts = ({ table }: { table: Table<Account> }) => {
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

export { TableHeaderAccounts };