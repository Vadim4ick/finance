import {
  $modalCreateTransaction,
  Account,
  Category,
  closeCreateTransactionModal,
  useCreateNewTransaction,
} from "@/entities/TableColumns";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { FormTableModalSchema, ModalTableForm } from "./ModalTableForm";

interface Props {
  dataAccounts: Account[] | undefined;
  dataCategories: Category[] | undefined;
  disabled: boolean;
}

const NewTransactionModal = (props: Props) => {
  const { dataAccounts, dataCategories, disabled } = props;

  const modal = useUnit($modalCreateTransaction);

  const mutation = useCreateNewTransaction();

  const submit = (data: FormTableModalSchema) => {
    mutation.mutate(data);
  };

  return (
    <ModalSheet
      closeFn={() => closeCreateTransactionModal()}
      open={modal}
      title="Создать транзакцию"
      description="Создайте новую транзакцию."
    >
      <ModalTableForm
        dataAccounts={dataAccounts}
        dataCategories={dataCategories}
        disabled={disabled}
        submit={submit}
      />
    </ModalSheet>
  );
};

export { NewTransactionModal };
