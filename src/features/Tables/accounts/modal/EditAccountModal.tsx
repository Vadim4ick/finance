import {
  $modalEditAccount,
  $modalEditAccountId,
  closeEditAccountModal,
  setEditAccountModalId,
  useDeleteAccount,
  useEditAccount,
} from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormEditAccountModal {
  name: string;
}

const EditAccountModal = () => {
  const [modal, modalId] = useUnit([$modalEditAccount, $modalEditAccountId]);

  const { register, handleSubmit, reset } = useForm<FormEditAccountModal>();

  const mutationEdit = useEditAccount();
  const mutationDelete = useDeleteAccount();

  const isLoading = mutationEdit.isPending || mutationDelete.isPending;

  const onSubmit: SubmitHandler<FormEditAccountModal> = (data) => {
    if (modalId) {
      mutationEdit.mutate({ name: data.name, id: modalId });

      reset();
    }
  };

  const onSubmitDelete = () => {
    if (modalId) {
      mutationDelete.mutate([modalId]);
      closeEditAccountModal();
    }
  };

  return (
    <ModalSheet
      closeFn={() => {
        closeEditAccountModal();
        setEditAccountModalId(null);
      }}
      open={modal}
      title="Изменить счет"
      description="Измените свой счет, чтобы начать отслеживать ваши транзакции."
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
          disabled={isLoading}
        >
          Изменить счет
        </Button>

        <Button
          onClick={onSubmitDelete}
          type="button"
          variant="black"
          className="flex w-full items-center justify-center"
          disabled={isLoading}
        >
          Удалить счет
        </Button>
      </form>
    </ModalSheet>
  );
};

export { EditAccountModal };
