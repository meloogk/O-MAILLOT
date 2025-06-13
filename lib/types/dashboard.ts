import { Order } from './order';
import { Product } from './product';

export type DashboardStats = {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  recentOrders: Order[];
  topProducts: Product[];
  salesByDay: Array<{
    date: string;
    sales: number;
  }>;
};