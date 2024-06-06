"use client";

import { useGetAccounts } from "@/entities/TableColumns";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SelectItem } from "@radix-ui/react-select";

const HomePage = () => {
  //   const { data, isLoading } = useGetTransactions({});

  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
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
    </div>
  );
};

export { HomePage };
