import { openEditCategoryModal, setEditCategoryModalId } from "../../context";
import { useDeleteCategories } from "../../hooks/useDeleteCategories";
import { useEditCategories } from "../../hooks/useEditCategories";
import { ActionButtons } from "./../../../ui/ActionButtons";

const Actions = ({ id }: { id: string }) => {
  const mutateDelete = useDeleteCategories();
  const { isPending: isPendingDelete } = useEditCategories();

  const onClickEdit = () => {
    setEditCategoryModalId(id);
    openEditCategoryModal();
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
