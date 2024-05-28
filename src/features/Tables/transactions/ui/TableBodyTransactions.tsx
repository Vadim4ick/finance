import { Transaction, columnsTransaction } from "@/entities/TableColumns";
import { TableBody, TableCell, TableRow } from "@/shared/ui/table";
import { Table, flexRender } from "@tanstack/react-table";

const TableBodyTransactions = ({ table }: { table: Table<Transaction> }) => {
  return (
    <TableBody>
      {table.getRowModel().rows && Boolean(table.getRowModel().rows.length) ? (
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
            colSpan={columnsTransaction.length}
            className="h-24 text-center"
          >
            Нет транзакций.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export { TableBodyTransactions };
