import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "../utils/index.utils";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";
import { Button } from "./button";
import { useState } from "react";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
};

const DatePicker = (props: Props) => {
  const { disabled, onChange, value } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange: SelectSingleEventHandler = (
    date,
    selectedDay,
    activeModifiers,
    e,
  ) => {
    if (onChange) {
      onChange(date, selectedDay, activeModifiers, e);
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={"outline"}
          className={cn(
            "inp-primary w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateChange}
          // onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
