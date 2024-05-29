import { Row } from "@tanstack/react-table";
import {
  Category,
  columnsCategory,
  openCreateCategoryModal,
  useDeleteCategories,
  useGetCategories,
} from "@/entities/TableColumns";
import { useTable } from "@/shared/hooks/useTable";
import { TableLoading } from "../../TableLoading";
import { TableLayout } from "@/shared/layouts/TableLayout";

interface Props {
  Header: ITableHeader;
  Body: ITableBody;
}

const TableCategories = (props: Props) => {
  const { Header, Body } = props;

  const { isLoading, data } = useGetCategories();

  const { currentPage, pageCount, table } = useTable<Category>({
    columns: columnsCategory,
    data: data?.categories,
  });

  const mutateDelete = useDeleteCategories();

  const onDelete = (row: Row<Category>[]) => {
    const ids = row.map((item) => item.original.id);

    mutateDelete.mutate(ids, {
      onSuccess() {
        table.resetRowSelection();
      },
    });
  };

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <TableLayout<Category>
      Body={Body}
      Header={Header}
      columnsCategory={columnsCategory}
      createFn={openCreateCategoryModal}
      currentPage={currentPage}
      pageCount={pageCount}
      loadingDelete={mutateDelete.isPending}
      onDelete={onDelete}
      table={table}
      title="Категории"
    />
  );
};

export { TableCategories };
