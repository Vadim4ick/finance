import {
  $modalCreateAccount,
  closeCreateAccountModal,
  useCreateNewAccount,
} from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormAddNewAccountModal {
  name: string;
}

const NewAccountModal = () => {
  const modal = useUnit($modalCreateAccount);

  const { register, handleSubmit, reset } = useForm<FormAddNewAccountModal>();

  const mutation = useCreateNewAccount();

  const onSubmit: SubmitHandler<FormAddNewAccountModal> = (data) => {
    mutation.mutate(data);

    reset();
  };

  return (
    <ModalSheet
      closeFn={() => closeCreateAccountModal()}
      open={modal}
      title="Создать счет"
      description="Создайте новый счет, чтобы начать отслеживать ваши транзакции."
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
          Создать счет
        </Button>
      </form>
    </ModalSheet>
  );
};

export { NewAccountModal };
