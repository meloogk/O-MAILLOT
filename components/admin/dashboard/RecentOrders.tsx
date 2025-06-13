"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Order, OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Données de démonstration
const recentOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user-1",
    user: {
      id: "user-1",
      name: "Sophie Martin",
      email: "sophie@example.com",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    items: [],
    total: 89.99,
    status: "CONFIRMÉE",
    shippingAddress: {
      fullName: "Sophie Martin",
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France",
      phone: "0612345678",
    },
    paymentStatus: "CONFIRMÉE",
    paymentId: "PAY-001",
    invoiceId: "INV-001",
    createdAt: new Date("2023-05-14T10:30:00"),
    updatedAt: new Date("2023-05-14T10:35:00"),
  },
  {
    id: "ORD-002",
    userId: "user-2",
    user: {
      id: "user-2",
      name: "Thomas Dubois",
      email: "thomas@example.com",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    items: [],
    total: 184.98,
    status: "EXPÉDIÉE",
    shippingAddress: {
      fullName: "Thomas Dubois",
      street: "456 Avenue de Lyon",
      city: "Lyon",
      postalCode: "69002",
      country: "France",
      phone: "0687654321",
    },
    paymentStatus: "CONFIRMÉE",
    paymentId: "PAY-002",
    invoiceId: "INV-002",
    createdAt: new Date("2023-05-13T14:22:00"),
    updatedAt: new Date("2023-05-13T14:25:00"),
  },
  {
    id: "ORD-003",
    userId: "user-3",
    user: {
      id: "user-3",
      name: "Claire Bernard",
      email: "claire@example.com",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    items: [],
    total: 94.99,
    status: "EN_ATTENTE",
    shippingAddress: {
      fullName: "Claire Bernard",
      street: "789 Boulevard de Marseille",
      city: "Marseille",
      postalCode: "13001",
      country: "France",
      phone: "0654321789",
    },
    paymentStatus: "EN_ATTENTE",
    createdAt: new Date("2023-05-12T09:15:00"),
    updatedAt: new Date("2023-05-12T09:20:00"),
  },
  {
    id: "ORD-004",
    userId: "user-4",
    user: {
      id: "user-4",
      name: "Lucas Petit",
      email: "lucas@example.com",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    items: [],
    total: 269.97,
    status: "LIVRÉE",
    shippingAddress: {
      fullName: "Lucas Petit",
      street: "101 Rue de Bordeaux",
      city: "Bordeaux",
      postalCode: "33000",
      country: "France",
      phone: "0678901234",
    },
    paymentStatus: "CONFIRMÉE",
    paymentId: "PAY-004",
    invoiceId: "INV-004",
    createdAt: new Date("2023-05-10T16:45:00"),
    updatedAt: new Date("2023-05-10T16:50:00"),
  },
  {
    id: "ORD-005",
    userId: "user-5",
    user: {
      id: "user-5",
      name: "Emma Lefebvre",
      email: "emma@example.com",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    items: [],
    total: 159.98,
    status: "CONFIRMÉE",
    shippingAddress: {
      fullName: "Emma Lefebvre",
      street: "202 Avenue de Lille",
      city: "Lille",
      postalCode: "59000",
      country: "France",
      phone: "0632109876",
    },
    paymentStatus: "CONFIRMÉE",
    paymentId: "PAY-005",
    invoiceId: "INV-005",
    createdAt: new Date("2023-05-09T11:30:00"),
    updatedAt: new Date("2023-05-09T11:35:00"),
  }
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMÉE":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "EXPÉDIÉE":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "LIVRÉE":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "ANNULÉE":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    case "EN_ATTENTE":
    default:
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
  }
};

export default function RecentOrders() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Commandes récentes</CardTitle>
          <CardDescription>
            Les 5 dernières commandes passées sur votre boutique
          </CardDescription>
        </div>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm" className="ml-auto">
            Voir toutes les commandes
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link 
                    href={`/admin/orders/${order.id}`}
                    className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.user?.name}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <Badge className={cn("font-normal", getStatusColor(order.status))}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}