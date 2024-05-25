import {
  $modalCreateCategory,
  closeCreateCategoryModal,
  useCreateNewCategory,
} from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormAddNewCategoryModal {
  name: string;
}

const NewCategoryModal = () => {
  const modal = useUnit($modalCreateCategory);

  const { register, handleSubmit, reset } = useForm<FormAddNewCategoryModal>();

  const mutation = useCreateNewCategory();

  const onSubmit: SubmitHandler<FormAddNewCategoryModal> = (data) => {
    mutation.mutate(data);

    reset();
  };

  return (
    <ModalSheet
      closeFn={() => closeCreateCategoryModal()}
      open={modal}
      title="Создать категорию"
      description="Создайте новую категорию."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <Input
          {...register("name")}
          label="Name"
          className="w-full"
          placeholder="e.g. Cash, Bank, Credit Card"
        />

        <Button
          variant="green"
          className="flex w-full items-center justify-center"
          disabled={mutation.isPending}
        >
          Создать категорию
        </Button>
      </form>
    </ModalSheet>
  );
};

export { NewCategoryModal };
