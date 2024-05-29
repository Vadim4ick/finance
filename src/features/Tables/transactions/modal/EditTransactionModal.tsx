import {
  $modalEditTransaction,
  Account,
  Category,
  closeEditTransactionModal,
  setEditTransactionModalId,
  useEditTransaction,
  useGetTransactionById,
} from "@/entities/TableColumns";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { FormTableModalSchema, ModalTableForm } from "./ModalTableForm";

interface Props {
  dataAccounts: Account[] | undefined;
  dataCategories: Category[] | undefined;
  disabled: boolean;
  id: string;
}

const EditTransactionModal = (props: Props) => {
  const { dataAccounts, dataCategories, disabled, id } = props;

  const [modal] = useUnit([$modalEditTransaction]);

  const { data, isLoading } = useGetTransactionById(id);

  const mutation = useEditTransaction(id);

  const submit = (data: FormTableModalSchema) => {
    mutation.mutate({
      body: data,
    });
  };

  if (isLoading) {
    return <div>load..</div>;
  }

  if (!data?.transaction && !isLoading) {
    return <div>ошибка</div>;
  }

  if (!data?.transaction) {
    return <div>ошибка</div>;
  }

  return (
    <ModalSheet
      closeFn={() => {
        closeEditTransactionModal();
        setEditTransactionModalId(null);
      }}
      open={modal}
      title="Редактировать транзакцию"
      description="Отредактируйте свою транзакцию."
    >
      <ModalTableForm
        dataAccounts={dataAccounts}
        dataCategories={dataCategories}
        disabled={disabled}
        dataById={data.transaction}
        submit={submit}
      />
    </ModalSheet>
  );
};

export { EditTransactionModal };
