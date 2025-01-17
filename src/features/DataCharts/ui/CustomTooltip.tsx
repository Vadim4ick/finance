import { Separator } from "@/shared/ui/separator";
import { format } from "date-fns";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expenses = payload[1].value;

  return (
    <div className="overflow-hidden rounded-md border bg-white shadow-sm">
      <div className="bg-muted p-2 px-3 text-sm text-muted-foreground">
        {format(date, "MMMM d, yyyy")}
      </div>

      <Separator />

      <div className="space-y-1 p-2 px-3">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-blue-500" />

            <p className="text-sm text-muted-foreground">Income</p>
          </div>

          <p className="text-right text-sm font-medium">{income}</p>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 rounded-full bg-rose-500" />

            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>

          <p className="text-right text-sm font-medium">{expenses * -1}</p>
        </div>
      </div>
    </div>
  );
};

export { CustomTooltip };
