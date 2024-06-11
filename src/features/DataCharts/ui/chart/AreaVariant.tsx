import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip";

type Props = {
  data?: {
    income: number;
    expenses: number;
    date: Date;
  }[];
};

const AreaVariant = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="income" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"2%"} stopColor={"#3d82f6"} stopOpacity={0.8} />
            <stop offset={"99%"} stopColor={"#3d82f6"} stopOpacity={0} />
          </linearGradient>

          <linearGradient id="expenses" x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"2%"} stopColor={"#f43f5e"} stopOpacity={0.8} />
            <stop offset={"99%"} stopColor={"#f43f5e"} stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={"date"}
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />

        <YAxis fontSize={13} />

        <CartesianGrid strokeDasharray="3 3" />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type={"monotone"}
          dataKey={"income"}
          stackId={"income"}
          strokeWidth={2}
          stroke="#3d82f6"
          dot={{ fontSize: 10 }}
          fill="url(#income)"
          className="drop-shadow-sm"
        />

        <Area
          type={"monotone"}
          dataKey={"expenses"}
          stackId={"expenses"}
          strokeWidth={2}
          stroke="#f43f5e"
          fill="url(#expenses)"
          dot={{ fontSize: 10 }}
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { AreaVariant };
