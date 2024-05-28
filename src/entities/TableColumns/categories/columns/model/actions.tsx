import { openEditCategoryModal, setEditCategoryModalId } from "../../context";
import { useDeleteCategories } from "../../hooks/useDeleteCategories";
import { useEditCategories } from "../../hooks/useEditCategories";
import { ActionButtons } from "./../../../ui/ActionButtons";

const Actions = ({ id }: { id: string }) => {
  const mutateDelete = useDeleteCategories();
  const { isPending: isPendingEdit } = useEditCategories();

  const onClickEdit = () => {
    setEditCategoryModalId(id);
    openEditCategoryModal();
  };

  const isLoading = mutateDelete.isPending || isPendingEdit;

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
