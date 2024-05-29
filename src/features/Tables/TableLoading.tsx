import { Loader2 } from "lucide-react";

const TableLoading = () => {
  return (
    <div className="h-[450px] w-full">
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="size-5 animate-spin" />
      </div>
    </div>
  );
};

export { TableLoading };
