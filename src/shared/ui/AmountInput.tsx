import { cn } from "./../utils/index.utils";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { MouseEvent } from "react";
import CurrencyInput from "react-currency-input-field";

const AmountInput = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (arg1: number | undefined | string) => void;
  disabled: boolean;
}) => {
  const parsedValue = parseFloat(String(value));

  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!value) return;

    const newValue = parseFloat(String(value)) * -1;

    onChange(newValue);
  };

  return (
    <div>
      <div className="relative">
        <button
          role="button"
          onClick={onReverseValue}
          className={cn(
            "absolute left-1 top-1 flex size-7 items-center justify-center rounded-lg bg-slate-400 hover:bg-slate-500",
            isIncome && "bg-emerald-500 hover:bg-emerald-600",
            isExpense && "bg-rose-500 hover:bg-rose-600",
          )}
        >
          {!value && <Info className="size-3 text-white" />}
          {isIncome && <PlusCircle className="size-3 text-white" />}
          {isExpense && <MinusCircle className="size-3 text-white" />}
        </button>

        <CurrencyInput
          prefix="₽"
          intlConfig={{ locale: "de-DE" }}
          placeholder={"0"}
          value={value}
          step={1}
          onValueChange={onChange}
          disabled={disabled}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
};

export { AmountInput };
