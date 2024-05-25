import {
  $modalEditCategory,
  $modalEditCategoryId,
  closeEditCategoryModal,
  setEditCategoryModalId,
  useDeleteCategories,
  useEditCategories,
} from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormEditCategoryModal {
  name: string;
}

const EditCategoryModal = () => {
  const [modal, modalId] = useUnit([$modalEditCategory, $modalEditCategoryId]);

  const { register, handleSubmit, reset } = useForm<FormEditCategoryModal>();

  const mutationEdit = useEditCategories();
  const mutationDelete = useDeleteCategories();

  const isLoading = mutationEdit.isPending || mutationDelete.isPending;

  const onSubmit: SubmitHandler<FormEditCategoryModal> = (data) => {
    if (modalId) {
      mutationEdit.mutate({ name: data.name, id: modalId });

      reset();
    }
  };

  const onSubmitDelete = () => {
    if (modalId) {
      mutationDelete.mutate([modalId]);
      closeEditCategoryModal();
    }
  };

  return (
    <ModalSheet
      closeFn={() => {
        closeEditCategoryModal();
        setEditCategoryModalId(null);
      }}
      open={modal}
      title="Изменить категорию"
      description="Измените свою категорию."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <Input
          {...register("name")}
          label="Name"
          className="w-full"
          placeholder="Еда, путешевствия, покупки"
        />

        <Button
          variant="green"
          className="flex w-full items-center justify-center"
          disabled={isLoading}
        >
          Изменить категорию
        </Button>

        <Button
          onClick={onSubmitDelete}
          type="button"
          variant="black"
          className="flex w-full items-center justify-center"
          disabled={isLoading}
        >
          Удалить категорию
        </Button>
      </form>
    </ModalSheet>
  );
};

export { EditCategoryModal };
