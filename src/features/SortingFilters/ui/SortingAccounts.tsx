import { useGetAccounts } from "@/entities/TableColumns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortingAccounts = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  const onChangeParams = (account: string) => {
    if (account) params.set("accountId", account);

    if (account === "all") params.delete("accountId");

    router.push(pathname + "?" + params.toString());
  };

  return (
    <>
      <Select
        onValueChange={(value) => {
          onChangeParams(value);
        }}
      >
        <SelectTrigger className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem className="cursor-pointer" value="all">
            Все аккаунты
          </SelectItem>

          {accounts?.accounts?.map((account) => {
            return (
              <SelectItem
                className="cursor-pointer"
                key={account.id}
                value={account.id}
              >
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
