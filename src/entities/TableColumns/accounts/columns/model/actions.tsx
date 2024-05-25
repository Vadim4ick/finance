import { Button } from "@/shared/custom-ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { openEditAccountModal, setEditAccountModalId } from "../../context";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useEditAccount } from "../../hooks/useEditAccount";

const Actions = ({ id }: { id: string }) => {
  const mutateDelete = useDeleteAccount();
  const { isPending: isPendingDelete } = useEditAccount();

  const onClickEdit = () => {
    setEditAccountModalId(id);
    openEditAccountModal();
  };

  const isLoading = mutateDelete.isPending || isPendingDelete;

  const onDelete = () => {
    mutateDelete.mutate([id]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="reset" className="size-8 w-full">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="border-none bg-white">
        <DropdownMenuItem
          disabled={isLoading}
          onClick={onClickEdit}
          className="cursor-pointer"
        >
          <Edit className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isLoading}
          onClick={onDelete}
          className="cursor-pointer"
        >
          <Trash className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Actions };
