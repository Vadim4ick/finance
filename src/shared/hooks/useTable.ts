"use client";

import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const useTable = <T>({
  columns,
  data,
}: {
  columns: ColumnDef<T>[];
  data?: T[];
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 3, //default page size
  });

  const table = useReactTable({
    data: data || [],
    columns: columns,
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

  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  return { table, currentPage, pageCount };
};

export { useTable };
