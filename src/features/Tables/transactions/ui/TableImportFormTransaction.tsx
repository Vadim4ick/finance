import {
  removeImportResults,
  setVariantFormDefault,
} from "@/entities/TableColumns";
import { useHandleCreate } from "../hooks/useHandleCreate";
import { Button } from "@/shared/ui/button";
import { TableImport, options } from "./TableImport";

const TableImportFormTransaction = () => {
  const {
    AccontDialog,
    body,
    handleContinue,
    headers,
    setSelectedColumns,
    selectedColumns,
  } = useHandleCreate();

  const onChangeSelect = (value: string | null, columnIdx: number) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIdx}`] = value;

      return newSelectedColumns;
    });
  };

  const onCancelImport = () => {
    removeImportResults();
    setVariantFormDefault();
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  return (
    <>
      <AccontDialog />

      <div className="flex flex-col gap-4 border-none drop-shadow-sm">
        <div className="flex gap-y-2 lg:items-center lg:justify-between">
          <h3 className="line-clamp-1 text-xl">Import transaction</h3>

          <div className="flex items-center gap-x-2 gap-y-2">
            <Button
              onClick={onCancelImport}
              size={"sm"}
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>

            <Button
              onClick={handleContinue}
              disabled={progress < options.length}
              size={"sm"}
            >
              Continue ({progress} / {options.length})
            </Button>
          </div>
        </div>

        <TableImport
          selectedColumns={selectedColumns}
          onChangeSelect={onChangeSelect}
          headers={headers}
          body={body}
        />
      </div>
    </>
  );
};

export { TableImportFormTransaction };
