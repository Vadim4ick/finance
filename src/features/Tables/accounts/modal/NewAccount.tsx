import {
  $modalAccount,
  closeAccountModal,
  useCreateNewAccount,
} from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormAddNewAccount {
  name: string;
}

const NewAccount = () => {
  const modal = useUnit($modalAccount);

  const { register, handleSubmit, reset } = useForm<FormAddNewAccount>();

  const mutation = useCreateNewAccount();

  const onSubmit: SubmitHandler<FormAddNewAccount> = (data) => {
    mutation.mutate(data);

    reset();
  };

  return (
    <Sheet open={modal} onOpenChange={() => closeAccountModal()}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>

          <SheetDescription>
            Create a new account to start track your transactions.
          </SheetDescription>
        </SheetHeader>

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
          >
            Создать счет
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { NewAccount };
