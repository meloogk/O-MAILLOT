"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Données de démonstration
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-01",
    total: 89.99,
    status: "Livré",
    items: [
      { name: "Maillot PSG Domicile", size: "L", quantity: 1 }
    ]
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-28",
    total: 159.98,
    status: "En cours",
    items: [
      { name: "Maillot Real Madrid Extérieur", size: "M", quantity: 2 }
    ]
  }
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Commandes</h1>

      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher une commande..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Aucune commande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ul className="space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item.name} - Taille {item.size} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{order.total.toFixed(2)}€</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "Livré"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}