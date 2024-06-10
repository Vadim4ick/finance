import { SortingAccounts } from "./SortingAccounts";
import { SortingDate } from "./SortingDate";

const SortingFilters = () => {
  return (
    <div className="flex items-center gap-5 pt-7">
      <SortingAccounts />

      <SortingDate />
    </div>
  );
};

export { SortingFilters };
