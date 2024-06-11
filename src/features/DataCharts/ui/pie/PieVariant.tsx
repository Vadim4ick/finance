import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CategoryTooltip } from "../CategoryTooltip";
import { COLORS_PIE } from "../../model/const";
import { Category } from "@/entities/TableColumns";

type Props = {
  data: Category[];
};

const PieVariant = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart data={data}>
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

                      <span className="text-sm">
                        {entry.payload.percent * 100}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />

        <Tooltip content={<CategoryTooltip />} />

        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          dataKey={"value"}
          fill="#8884d8"
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS_PIE[i % COLORS_PIE.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export { PieVariant };
