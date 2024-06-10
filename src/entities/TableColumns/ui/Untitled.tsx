import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import clsx from "clsx";
import { useUnit } from "effector-react";
import { $listCategoryModal } from "../categories/context";
import { useEditTransaction } from "../transactions/hooks/useEditTransaction";

const Untitled = ({ id }: { id: string }) => {
  const [list] = useUnit([$listCategoryModal]);

  const mutation = useEditTransaction(id);

  return (
    <Select
      onValueChange={(value) => {
        mutation.mutate({
          body: {
            categoryId: value,
          },
        });
      }}
    >
      <SelectTrigger
        className={clsx(
          "border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0",
        )}
      >
        <SelectValue placeholder="Без названия" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem className="cursor-pointer" value="skip">
          Skip
        </SelectItem>

        {list?.map((el) => (
          <SelectItem
            key={el.id}
            className="cursor-pointer capitalize"
            value={el.id}
          >
            {el.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { Untitled };
