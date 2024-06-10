import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/utils/index.utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SortingDate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  const onChangeParams = () => {
    if (fromDate) params.set("from", format(fromDate, "yyyy-MM-dd"));
    if (toDate) params.set("to", format(toDate, "yyyy-MM-dd"));

    router.push(pathname + "?" + params.toString());
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={"outline"}
          className={cn(
            "inp-primary w-full justify-start text-left font-normal",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {fromDate && toDate ? (
            `${format(fromDate, "PPP")} - ${format(toDate, "PPP")}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          numberOfMonths={2}
          mode="range"
          selected={{ from: fromDate, to: toDate }}
          onSelect={(selected) => {
            setFromDate(selected?.from);
            setToDate(selected?.to);
          }}
        />

        <Button className="mx-auto mb-3 table" onClick={() => onChangeParams()}>
          Отправить
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export { SortingDate };
