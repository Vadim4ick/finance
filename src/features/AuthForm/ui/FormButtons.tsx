import { $currentAuthForm, toggleType } from "@/entities/AuthForm";
import { Button } from "@/shared/custom-ui/Button";
import { cn } from "@/shared/utils/index.utils";
import { useUnit } from "effector-react";
import { useState } from "react";

const FormButtons = () => {
  const currentType = useUnit($currentAuthForm);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    setIsButtonDisabled(true);
    toggleType();
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Button type="submit">
        {currentType === "auth" ? "Авторизоваться" : "Зарегестрироваться"}
      </Button>

      <Button
        onClick={handleClick}
        className={cn(
          "text-[10px] font-medium",
          isButtonDisabled && "opacity-60",
        )}
        type="button"
        variant="clear"
        disabled={isButtonDisabled}
      >
        {currentType === "auth" ? "Нет аккаунта?" : "Есть аккаунт?"}
      </Button>
    </div>
  );
};

export { FormButtons };
