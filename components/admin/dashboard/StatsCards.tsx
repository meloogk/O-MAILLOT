import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: {
    totalSales: number;
    salesGrowth: number;
    totalOrders: number;
    ordersGrowth: number;
    totalCustomers: number;
    customersGrowth: number;
    conversionRate: number;
    conversionGrowth: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const cards = [
    {
      title: "Ventes totales",
      value: formatCurrency(stats.totalSales),
      icon: <DollarSign className="h-5 w-5" />,
      growth: stats.salesGrowth,
      growthText: formatPercentage(stats.salesGrowth)
    },
    {
      title: "Commandes",
      value: stats.totalOrders.toString(),
      icon: <ShoppingCart className="h-5 w-5" />,
      growth: stats.ordersGrowth,
      growthText: formatPercentage(stats.ordersGrowth)
    },
    {
      title: "Clients",
      value: stats.totalCustomers.toString(),
      icon: <Users className="h-5 w-5" />,
      growth: stats.customersGrowth,
      growthText: formatPercentage(stats.customersGrowth)
    },
    {
      title: "Taux de conversion",
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: <TrendingUp className="h-5 w-5" />,
      growth: stats.conversionGrowth,
      growthText: formatPercentage(stats.conversionGrowth)
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </CardTitle>
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{card.value}</div>
            <div className="flex items-center text-sm">
              <div
                className={cn(
                  "flex items-center",
                  card.growth > 0 
                    ? "text-green-500" 
                    : card.growth < 0 
                      ? "text-red-500" 
                      : "text-gray-500"
                )}
              >
                {card.growth > 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : card.growth < 0 ? (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                ) : null}
                {card.growthText}
              </div>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                vs mois dernier
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}