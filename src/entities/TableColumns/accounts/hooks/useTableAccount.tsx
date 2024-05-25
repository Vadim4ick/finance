import {
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useGetAccounts } from "./useGetAccounts";
import { columnsAccount } from "../columns/model/account";

const useTableAccount = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { data } = useGetAccounts();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 3, //default page size
  });

  return useReactTable({
    data: data?.accounts || [],
    columns: columnsAccount,
    onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      //   columnFilters,
      //   columnVisibility,
      pagination,
      rowSelection,
    },
  });
};

export { useTableAccount };
