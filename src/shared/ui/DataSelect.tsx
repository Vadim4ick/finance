import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

interface Props {
  data: { id: string; name: string }[] | undefined;
  value: string;
  placeholder: string;
  onChange: (value?: string) => void;
  title?: string;
  disabled?: boolean;
}

const DataSelect = (props: Props) => {
  const { data, title, placeholder, disabled, value, onChange } = props;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger disabled={disabled} className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent align="center">
        <SelectGroup>
          {title && <SelectLabel>{title}</SelectLabel>}

          {data?.map((el) => {
            return (
              <SelectItem className="cursor-pointer" key={el.id} value={el.id}>
                {el.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { DataSelect };
