import { format } from "date-fns";
import {
  Bar,
  BarChart,
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

const BarVariant = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={"date"}
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />

        <YAxis fontSize={13} />

        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey={"income"} fill="#3b82f6" className="drop-shadow-sm" />

        <Bar dataKey={"expenses"} fill="#f43f5e" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { BarVariant };
