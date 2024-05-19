import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar } from "@/shared/custom-ui/Avatar";
import { useLogoutUser } from "@/entities/AuthForm";
import Link from "next/link";

const DropdownAvatar = () => {
  const logoutMutate = useLogoutUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[200px] border-none bg-white"
        align="end"
      >
        <DropdownMenuLabel className="text-center">
          Мой аккаунт
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="items-center justify-center">
          <Link href={"/settings"}>Настройки аккаунта</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="items-center justify-center">
          <button onClick={() => logoutMutate.mutate()}>Выход</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DropdownAvatar };
