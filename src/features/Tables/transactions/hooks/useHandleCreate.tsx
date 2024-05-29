import {
  $importResults,
  setVariantFormDefault,
  useCreateBulkTransactions,
  useSelectAccount,
} from "@/entities/TableColumns";
import { format, parse } from "date-fns";
import { useUnit } from "effector-react";
import { useState } from "react";
import { toast } from "sonner";

export interface SelectedColumnsState {
  [key: string]: string | null;
}

const useHandleCreate = () => {
  const [AccontDialog, confirm] = useSelectAccount();

  const importResults = useUnit($importResults);

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {},
  );

  const mutate = useCreateBulkTransactions();

  const headers = importResults.data[0];
  const body = importResults.data.slice(1);

  const handleContinue = async () => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue");
    }

    const getColumnIdx = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((_: string, idx: number) => {
        const columnIdx = getColumnIdx(`column_${idx}`);

        return selectedColumns[`column_${columnIdx}`] || null;
      }),

      body: body
        .map((row) => {
          const transformedRow = row.map((cell: string, idx: number) => {
            const columnIdx = getColumnIdx(`column_${idx}`);

            return selectedColumns[`column_${columnIdx}`] ? cell : null;
          });

          return transformedRow.every((item: any) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell: string, idx: number) => {
        const header = mappedData.headers[idx];

        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: Math.round(parseFloat(item.amount) * 1000),
      date: format(
        parse(item.date, "yyyy-MM-dd HH:mm:ss", new Date()),
        "yyyy-MM-dd",
      ),
      accountId: accountId,
    }));

    mutate.mutate(formattedData, {
      onSuccess() {
        setVariantFormDefault();
      },
    });
  };

  return {
    setSelectedColumns,
    AccontDialog,
    handleContinue,
    headers,
    body,
    selectedColumns,
    isLoading: mutate.isPending,
  };
};

export { useHandleCreate };
