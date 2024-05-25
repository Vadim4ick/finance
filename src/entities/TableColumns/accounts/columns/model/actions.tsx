import { openEditAccountModal, setEditAccountModalId } from "../../context";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useEditAccount } from "../../hooks/useEditAccount";
import { ActionButtons } from "./../../../ui/ActionButtons";

const Actions = ({ id }: { id: string }) => {
  const mutateDelete = useDeleteAccount();
  const { isPending: isPendingDelete } = useEditAccount();

  const onClickEdit = () => {
    setEditAccountModalId(id);
    openEditAccountModal();
  };

  const isLoading = mutateDelete.isPending || isPendingDelete;

  const onDelete = () => {
    mutateDelete.mutate([id]);
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
