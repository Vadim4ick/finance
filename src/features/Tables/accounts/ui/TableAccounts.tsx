import {
  Account,
  columnsAccount,
  openCreateAccountModal,
  useDeleteAccount,
  useGetAccounts,
} from "@/entities/TableColumns";
import { Row } from "@tanstack/react-table";
import { useTable } from "@/shared/hooks/useTable";
import { TableLoading } from "../../TableLoading";
import { TableLayout } from "@/shared/layouts/TableLayout";

interface Props {
  Header: ITableHeader;
  Body: ITableBody;
}

const TableAccounts = (props: Props) => {
  const { Header, Body } = props;

  const { isLoading, data } = useGetAccounts();

  const { table, currentPage, pageCount } = useTable<Account>({
    columns: columnsAccount,
    data: data?.accounts,
  });

  const mutateDelete = useDeleteAccount();

  const onDelete = (row: Row<Account>[]) => {
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
    <TableLayout<Account>
      Body={Body}
      Header={Header}
      columnsCategory={columnsAccount}
      createFn={openCreateAccountModal}
      currentPage={currentPage}
      pageCount={pageCount}
      loadingDelete={mutateDelete.isPending}
      onDelete={onDelete}
      table={table}
      title="Счета"
    />
  );
};

export { TableAccounts };
