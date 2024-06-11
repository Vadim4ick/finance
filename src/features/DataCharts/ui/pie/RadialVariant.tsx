import { Category } from "@/entities/TableColumns";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { COLORS_PIE } from "../../model/const";

type Props = {
  data: Category[];
};

const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <RadialBarChart
        cx={"50%"}
        cy={"30%"}
        barSize={10}
        innerRadius={"90%"}
        outerRadius={"40%"}
        data={data.map((item, idx) => {
          return {
            ...item,
            fill: COLORS_PIE[idx % COLORS_PIE.length],
          };
        })}
      >
        <RadialBar
          label={{
            position: "insideStart",
            fill: "#fff",
            fontSize: "12px",
          }}
          background
          dataKey={"value"}
        />

        <Legend
          layout="horizontal"
          align="right"
          iconType="circle"
          verticalAlign="bottom"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload?.map((entry: any, i: number) => (
                  <li key={`item-${i}`} className="flex items-center space-x-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: entry.color }}
                    />

                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>

                      <span className="text-sm">{entry.payload.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export { RadialVariant };
