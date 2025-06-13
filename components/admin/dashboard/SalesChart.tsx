"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from "react";

// Données de démonstration
const mockData = {
  daily: [
    { date: "01/05", amount: 1200 },
    { date: "02/05", amount: 1800 },
    { date: "03/05", amount: 1400 },
    { date: "04/05", amount: 2000 },
    { date: "05/05", amount: 2400 },
    { date: "06/05", amount: 1800 },
    { date: "07/05", amount: 2200 },
    { date: "08/05", amount: 2600 },
    { date: "09/05", amount: 2900 },
    { date: "10/05", amount: 3100 },
    { date: "11/05", amount: 2800 },
    { date: "12/05", amount: 3200 },
    { date: "13/05", amount: 3000 },
    { date: "14/05", amount: 3400 },
  ],
  weekly: [
    { date: "Sem 1", amount: 9800 },
    { date: "Sem 2", amount: 12400 },
    { date: "Sem 3", amount: 10800 },
    { date: "Sem 4", amount: 15200 },
    { date: "Sem 5", amount: 14000 },
    { date: "Sem 6", amount: 16800 },
    { date: "Sem 7", amount: 18500 },
    { date: "Sem 8", amount: 17200 },
  ],
  monthly: [
    { date: "Jan", amount: 45000 },
    { date: "Fév", amount: 52000 },
    { date: "Mar", amount: 48000 },
    { date: "Avr", amount: 61000 },
    { date: "Mai", amount: 55000 },
    { date: "Jui", amount: 67000 },
    { date: "Jui", amount: 72000 },
    { date: "Aoû", amount: 78000 },
    { date: "Sep", amount: 69000 },
    { date: "Oct", amount: 74000 },
    { date: "Nov", amount: 82000 },
    { date: "Déc", amount: 94000 },
  ]
};

export default function SalesChart() {
  const [period, setPeriod] = useState("monthly");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-orange-500 font-medium">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Évolution des ventes</CardTitle>
          <CardDescription>
            Suivez l'évolution de vos ventes au fil du temps
          </CardDescription>
        </div>
        <Tabs 
          value={period} 
          onValueChange={setPeriod} 
          className="w-[250px]"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="daily">Jour</TabsTrigger>
            <TabsTrigger value="weekly">Semaine</TabsTrigger>
            <TabsTrigger value="monthly">Mois</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockData[period as keyof typeof mockData]}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}