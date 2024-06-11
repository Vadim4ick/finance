import { useState } from "react";
import { FileSearch, Loader2 } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Category } from "@/entities/TableColumns";
import { pieItems } from "../model/const";
import { PieType } from "../model/types";
import { PieVariant } from "./pie/PieVariant";
import { RadarVariant } from "./pie/RadarVariant";
import { RadialVariant } from "./pie/RadialVariant";

type Props = {
  data?: Category[];
};

export const SpendingPieLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-full lg:w-[120px]" />
      </CardHeader>

      <CardContent>
        <div className="flex h-[350px] w-full items-center justify-center">
          <Loader2 className="size-6 animate-spin text-slate-300" />
        </div>
      </CardContent>
    </Card>
  );
};

const SpendingPie = (props: Props) => {
  const { data = [] } = props;

  const [pieType, setPieType] = useState<PieType>("pie");

  const onTypeChange = (type: PieType) => {
    setPieType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-xl">Categories</CardTitle>

        <Select defaultValue={pieType} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
            <SelectValue placeholder={"Chart Type"} />
          </SelectTrigger>

          <SelectContent>
            {pieItems.map((item) => (
              <SelectItem key={item.type} value={item.type}>
                <div className="flex items-center">
                  <item.Icon className="mr-2 size-4 shrink-0" />

                  <p className="line-clamp-1">{item.title}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-4">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Нет данных за этот период
            </p>
          </div>
        ) : (
          <>
            {pieType === "pie" && <PieVariant data={data} />}
            {pieType === "radar" && <RadarVariant data={data} />}
            {pieType === "radial" && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { SpendingPie };
