import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  Radar,
  Target,
} from "lucide-react";

export const chartItems = [
  {
    type: "area",
    title: "Area chart",
    Icon: AreaChart,
  },
  {
    type: "line",
    title: "Line chart",
    Icon: LineChart,
  },
  {
    type: "bar",
    title: "Bar chart",
    Icon: BarChart,
  },
];

export const pieItems = [
  {
    type: "pie",
    title: "Pie chart",
    Icon: PieChart,
  },
  {
    type: "radar",
    title: "Radar chart",
    Icon: Radar,
  },
  {
    type: "radial",
    title: "Radial chart",
    Icon: Target,
  },
];

export const COLORS_PIE = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];
