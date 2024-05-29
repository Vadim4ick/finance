import { TableBody, TableCell, TableRow } from "@/shared/ui/table";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";

const BodyTable = <T,>({
  table,
  nullTitle,
  columns,
}: {
  table: Table<T>;
  nullTitle: string;
  columns: ColumnDef<T>[];
}) => {
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
          {nullTitle && (
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {nullTitle}
            </TableCell>
          )}
        </TableRow>
      )}
    </TableBody>
  );
};

export { BodyTable };
