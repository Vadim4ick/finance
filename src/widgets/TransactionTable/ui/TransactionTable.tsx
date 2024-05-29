import {
  $variant,
  Variants,
  useCreateBulkTransactions,
} from "@/entities/TableColumns";
import {
  TableImportFormTransaction,
  TableTransactions,
} from "@/features/Tables";
import { useUnit } from "effector-react";
import { Loader2 } from "lucide-react";

const TransactionTable = () => {
  const variant = useUnit($variant);

  const { isPending } = useCreateBulkTransactions();

  if (isPending) {
    return (
      <>
        <div className="h-[450px] w-full">
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="size-5 animate-spin" />
          </div>
        </div>
      </>
    );
  }

  if (Variants.IMPORT === variant) {
    return <TableImportFormTransaction />;
  }

  return <TableTransactions />;
};

export { TransactionTable };
