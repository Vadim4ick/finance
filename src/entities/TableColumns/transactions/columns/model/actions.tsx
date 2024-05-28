import { useDeleteTransactions } from "../../hooks/useDeleteTransactions";
import { ActionButtons } from "./../../../ui/ActionButtons";

const Actions = ({ id }: { id: string }) => {
  const mutateDelete = useDeleteTransactions();

  const isLoading = mutateDelete.isPending;

  const onDelete = () => {
    mutateDelete.mutate([id]);
  };
  return (
    <ActionButtons
      isLoading={isLoading}
      onClickEdit={() => {}}
      onDelete={onDelete}
    />
  );
};

export { Actions };
