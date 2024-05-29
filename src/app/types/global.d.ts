type ReactTagProps<T> = import("react").ComponentPropsWithRef<T>;

type ITableHeader = <T>({ table }: { table: Table<T> }) => JSX.Element;
type ITableBody = <T>({
  table,
  nullTitle,
  columns,
}: {
  table: Table<T>;
  nullTitle: string;
  columns: ColumnDef<T>[];
}) => JSX.Element;
