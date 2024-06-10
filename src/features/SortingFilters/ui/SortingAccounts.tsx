import { useGetAccounts } from "@/entities/TableColumns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const SortingAccounts = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  return (
    <>
      <Select>
        <SelectTrigger className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Все аккаунты</SelectItem>

          {accounts?.accounts?.map((account) => {
            return (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export { SortingAccounts };
