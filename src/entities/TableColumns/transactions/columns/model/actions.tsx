import {
  openEditTransactionModal,
  setEditTransactionModalId,
} from "../../context";
import { useDeleteTransactions } from "../../hooks/useDeleteTransactions";
import { ActionButtons } from "./../../../ui/ActionButtons";

const Actions = ({ id }: { id: string }) => {
  const mutateDelete = useDeleteTransactions();

  const isLoading = mutateDelete.isPending;

  const onDelete = () => {
    mutateDelete.mutate([id]);
  };

  const onClickEdit = () => {
    setEditTransactionModalId(id);
    openEditTransactionModal();
  };

  return (
    <ActionButtons
      isLoading={isLoading}
      onClickEdit={onClickEdit}
      onDelete={onDelete}
    />
  );
};

export { Actions };
