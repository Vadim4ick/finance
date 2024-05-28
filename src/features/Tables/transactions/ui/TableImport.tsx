import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { SelectedColumnsState } from "./TableTransactions";
import clsx from "clsx";

interface Props {
  data: string[][];
  selectedColumns: SelectedColumnsState;
  onChangeSelect: (value: string, columnIdx: number) => void;
}

export const options = ["amount", "payee", "date"];

const TableImport = (props: Props) => {
  const { data, onChangeSelect, selectedColumns } = props;

  const headers = data[0];
  const body = data.slice(1);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, idx) => {
              const currentSelection = selectedColumns[`column_${idx}`];

              return (
                <TableHead key={idx}>
                  <Select
                    value={currentSelection || ""}
                    onValueChange={(value) => onChangeSelect(value, idx)}
                  >
                    <SelectTrigger
                      className={clsx(
                        "border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0",
                        {
                          "text-blue-500": currentSelection,
                        },
                      )}
                    >
                      <SelectValue placeholder="Skip" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem className="cursor-pointer" value="skip">
                        Skip
                      </SelectItem>

                      {options.map((option) => {
                        const disabled =
                          Object.values(selectedColumns).includes(option) &&
                          selectedColumns[`column_${idx}`] !== option;

                        return (
                          <SelectItem
                            disabled={disabled}
                            className="cursor-pointer capitalize"
                            value={option}
                            key={option}
                          >
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {body.map((row: string[], idx) => (
            <TableRow key={idx}>
              {row.map((cell, idxCell) => (
                <TableCell key={idxCell}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { TableImport };
