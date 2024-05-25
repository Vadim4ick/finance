import { Checkbox } from "@/shared/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/custom-ui/Button";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { Category } from "../types/category";

export const columnsCategory: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="reset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => {
      const id = row.original.id;

      return <Actions id={id} />;
    },
  },
];
