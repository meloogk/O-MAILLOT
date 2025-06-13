import StatsCards from "@/components/admin/dashboard/StatsCards";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/lib/types";

// Données de démonstration
const dashboardStats: DashboardStats = {
  totalSales: 54850,
  totalOrders: 421,
  totalCustomers: 189,
  recentOrders: [],
  topProducts: [],
  salesByDay: []
};

// Statistiques pour les cartes
const statsData = {
  totalSales: dashboardStats.totalSales,
  salesGrowth: 12.5,
  totalOrders: dashboardStats.totalOrders,
  ordersGrowth: 8.3,
  totalCustomers: dashboardStats.totalCustomers,
  customersGrowth: 15.2,
  conversionRate: 3.8,
  conversionGrowth: -0.6
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace d'administration O'MAILLOT
          </p>
        </div>
      </div>
      
      <StatsCards stats={statsData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />
        
        <Card>
          <CardHeader>
            <CardTitle>Objectifs de vente</CardTitle>
            <CardDescription>
              Suivi de vos objectifs mensuels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Contenu à implémenter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Objectif mensuel</div>
                <div className="text-gray-500 dark:text-gray-400">75 000 € / 100 000 €</div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-orange-500 dark:bg-orange-600 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <div className="text-xs text-right text-gray-500 dark:text-gray-400">
                75% atteint
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Objectif trimestriel</div>
                <div className="text-gray-500 dark:text-gray-400">220 000 € / 300 000 €</div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-green-500 dark:bg-green-600 rounded-full" style={{ width: "73%" }}></div>
              </div>
              <div className="text-xs text-right text-gray-500 dark:text-gray-400">
                73% atteint
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Objectif annuel</div>
                <div className="text-gray-500 dark:text-gray-400">550 000 € / 1 200 000 €</div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full bg-blue-500 dark:bg-blue-600 rounded-full" style={{ width: "46%" }}></div>
              </div>
              <div className="text-xs text-right text-gray-500 dark:text-gray-400">
                46% atteint
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RecentOrders />
    </div>
  );
}