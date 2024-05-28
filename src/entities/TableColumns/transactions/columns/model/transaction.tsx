import { Checkbox } from "@/shared/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/custom-ui/Button";
import { ArrowUpDown } from "lucide-react";
import { Transaction } from "../types";
import { Actions } from "./actions";

export const columnsTransaction: ColumnDef<Transaction>[] = [
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
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="reset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell({ row }) {
      const date = row.getValue("date") as Date;

      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="reset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell({ row }) {
      const category = row.original.category;

      return <span>{category || "Без категории"}</span>;
    },
  },

  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          variant="reset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="reset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell({ row }) {
      const amount = row.original.amount;

      return (
        <span className="px-3.5 py-2.5 text-xs font-medium">{amount}</span>
      );
    },
  },

  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="reset"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell({ row }) {
      const account = row.original.account;

      return <span>{account}</span>;
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
