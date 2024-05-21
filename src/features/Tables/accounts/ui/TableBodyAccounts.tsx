import { TableBody, TableCell, TableRow } from "@/shared/ui/table";
import { Table, flexRender } from "@tanstack/react-table";
import { Account, columnsAccount } from "@/entities/TableColumns";

const TableBodyAccounts = ({ table }: { table: Table<Account> }) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columnsAccount.length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export { TableBodyAccounts };
