import { DashboardStats, Order } from "../types";

export interface StatsCardsProps {
  stats: DashboardStats;
}

export interface OrdersTableProps {
  orders: Order[];
  onStatusChange?: (orderId: string, status: string) => void;
}

export interface RecentOrdersProps {
  orders?: Order[];
}

export interface SalesChartProps {
  data?: any[];
}