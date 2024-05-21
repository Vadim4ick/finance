import { Table } from "@/shared/ui/table";
import { TableHeaderAccounts } from "./TableHeaderAccounts";
import { TableBodyAccounts } from "./TableBodyAccounts";
import { useTableAccounts } from "../hooks/index.hooks";
import { Input } from "@/shared/custom-ui/Input";

const TableAccounts = () => {
  const table = useTableAccounts();

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeaderAccounts table={table} />
          <TableBodyAccounts table={table} />
        </Table>
      </div>
    </div>
  );
};

export { TableAccounts };
