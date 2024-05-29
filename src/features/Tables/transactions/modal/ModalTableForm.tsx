import { Account, Category, Transaction } from "@/entities/TableColumns";
import { Button } from "@/shared/custom-ui/Button";
import { Input } from "@/shared/custom-ui/Input";
import { AmountInput } from "@/shared/ui/AmountInput";
import { DataSelect } from "@/shared/ui/DataSelect";
import { DatePicker } from "@/shared/ui/date-picker";
import { Textarea } from "@/shared/ui/textarea";
import { formatErrors } from "@/shared/utils/index.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const formTableModal = z.object({
  payee: z.string({ message: "Требуется указать получателя" }),
  amount: z.number({ message: "Должна быть указана сумма" }),
  date: z.date({ message: "Нужно обязательно выбрать дату" }),
  accountId: z.string({ message: "Обязательно выбери счет!" }),
  categoryId: z.string().nullable(),
  notes: z.string().nullable(),
});

export type FormTableModalSchema = z.infer<typeof formTableModal>;

interface Props {
  dataAccounts: Account[] | undefined;
  dataCategories: Category[] | undefined;
  disabled: boolean;
  dataById?: Transaction;
  submit: (value1: FormTableModalSchema) => void;
}

const ModalTableForm = (props: Props) => {
  const { dataAccounts, dataCategories, disabled, dataById, submit } = props;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, submitCount },
  } = useForm<FormTableModalSchema>({
    resolver: zodResolver(formTableModal),
    defaultValues: dataById && {
      ...dataById,
      date: new Date(dataById.date),
    },
  });

  const onSubmit: SubmitHandler<FormTableModalSchema> = (data) => {
    submit(data);
    reset();
  };

  useEffect(() => {
    if (Object.values(errors).length > 0 && submitCount > 0) {
      const errorMessage = formatErrors(errors);

      toast.error(errorMessage);
    }
  }, [errors, submitCount]);

  return (
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

            <DatePicker value={value} onChange={onChange} disabled={disabled} />
          </label>
        )}
      />

      <Controller
        control={control}
        name="payee"
        render={({ field }) => (
          <Input
            {...field}
            value={field.value}
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
              value={field.value || ""}
              className="w-full"
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
              value={field.value ?? ""}
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
        // disabled={mutation.isPending}
      >
        Редактировать транзакцию
      </Button>
    </form>
  );
};

export { ModalTableForm };
