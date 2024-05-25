import { Category, columnsCategory } from "@/entities/TableColumns";
import { TableBody, TableCell, TableRow } from "@/shared/ui/table";
import { Table, flexRender } from "@tanstack/react-table";

const TableBodyCategories = ({ table }: { table: Table<Category> }) => {
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
            colSpan={columnsCategory.length}
            className="h-24 text-center"
          >
            Нет категорий.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export { TableBodyCategories };
