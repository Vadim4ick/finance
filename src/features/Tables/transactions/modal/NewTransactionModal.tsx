import {
  $modalCreateTransaction,
  Account,
  Category,
  closeCreateTransactionModal,
  useCreateNewTransaction,
} from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import { DatePicker } from "@/shared/ui/date-picker";
import { ModalSheet } from "@/shared/ui/sheet";
import { useUnit } from "effector-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/shared/ui/textarea";
import { AmountInput } from "@/shared/ui/AmountInput";
import { DataSelect } from "@/shared/ui/DataSelect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { formatErrors } from "@/shared/utils/index.utils";
import { toast } from "sonner";

export const formCreateTransactionSchema = z.object({
  payee: z.string({ message: "Требуется указать получателя" }),
  amount: z.number({ message: "Должна быть указана сумма" }),
  date: z.date({ message: "Нужно обязательно выбрать дату" }),
  accountId: z.string({ message: "Обязательно выбери счет!" }),
  categoryId: z.string().optional(),
  notes: z.string().optional(),
});

export type FormCreateTransactionSchema = z.infer<
  typeof formCreateTransactionSchema
>;

interface Props {
  dataAccounts: Account[] | undefined;
  dataCategories: Category[] | undefined;
  disabled: boolean;
}

const NewTransactionModal = (props: Props) => {
  const { dataAccounts, dataCategories, disabled } = props;

  const modal = useUnit($modalCreateTransaction);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, submitCount },
  } = useForm<FormCreateTransactionSchema>({
    resolver: zodResolver(formCreateTransactionSchema),
  });

  const mutation = useCreateNewTransaction();

  const onSubmit: SubmitHandler<FormCreateTransactionSchema> = (data) => {
    mutation.mutate(data);
    reset();
  };

  useEffect(() => {
    if (Object.values(errors).length > 0 && submitCount > 0) {
      const errorMessage = formatErrors(errors);

      toast.error(errorMessage);
    }
  }, [errors, submitCount]);

  return (
    <ModalSheet
      closeFn={() => closeCreateTransactionModal()}
      open={modal}
      title="Создать транзакцию"
      description="Создайте новую транзакцию."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 space-y-4 pt-4"
      >
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <label>
              <p
                className={
                  "cursor-pointer pb-2 text-[14px] font-bold text-black/80"
                }
              >
                Выберете дату
              </p>

              <DatePicker
                value={value}
                onChange={onChange}
                disabled={disabled}
              />
            </label>
          )}
        />

        <Controller
          control={control}
          name="payee"
          render={({ field }) => (
            <Input
              {...field}
              value={field.value || ""}
              label="Получатель"
              className="w-full"
              placeholder="Добавьте получателя"
              disabled={disabled}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <label>
              <p
                className={
                  "cursor-pointer pb-2 text-[14px] font-bold text-black/80"
                }
              >
                Введите цену
              </p>

              <AmountInput
                disabled={disabled}
                value={value}
                onChange={onChange}
              />
            </label>
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <label>
              <p
                className={
                  "cursor-pointer pb-2 text-[14px] font-bold text-black/80"
                }
              >
                Комментарий
              </p>

              <Textarea
                {...field}
                className="w-full"
                value={field.value ?? ""}
                placeholder="Необязательные примечания"
                disabled={disabled}
              />
            </label>
          )}
        />

        <Controller
          control={control}
          name="accountId"
          render={({ field }) => (
            <label>
              <p
                className={
                  "cursor-pointer pb-2 text-[14px] font-bold text-black/80"
                }
              >
                Выберете счет
              </p>

              <DataSelect
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                data={dataAccounts}
                placeholder="Выберете счет..."
              />
            </label>
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <label>
              <p
                className={
                  "cursor-pointer pb-2 text-[14px] font-bold text-black/80"
                }
              >
                Выберете категорию
              </p>

              <DataSelect
                value={field.value || ""}
                onChange={field.onChange}
                disabled={disabled}
                data={dataCategories}
                placeholder="Выберете категорию..."
              />
            </label>
          )}
        />

        <Button
          variant="green"
          className="flex w-full items-center justify-center"
          disabled={mutation.isPending}
        >
          Создать транзакцию
        </Button>
      </form>
    </ModalSheet>
  );
};

export { NewTransactionModal };
