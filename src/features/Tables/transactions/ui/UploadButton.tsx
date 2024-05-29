import { CSVResult } from "@/entities/TableColumns";
import { Button } from "@/shared/ui/button";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

const UploadButton = ({
  handleUpload,
}: {
  handleUpload: (results: CSVResult) => void;
}) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={handleUpload}>
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <div {...getRootProps()} className="upload-zone">
          <Button size={"sm"} className="w-full lg:w-auto">
            <Upload className="mr-2 size-4" />
            Импортировать файл
          </Button>
          {acceptedFile && (
            <>
              <div className="absolute right-[20px] top-[60px] w-[375px] font-medium">
                <p>Имя загруженного файла: {acceptedFile.name}</p>

                <ProgressBar
                  style={{
                    width: "100%",
                    height: "10px",
                    backgroundColor: "#4caf50",
                    transition: "width 0.5s ease-in-out",
                  }}
                />

                <button className="text-end" {...getRemoveFileProps()}>
                  Удалить
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </CSVReader>
  );
};

export { UploadButton };
