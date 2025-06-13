"use client";

import { useState } from "react";
import { GiftCard } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Download, Eye, Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import QRCode from "react-qr-code";

// Données de démonstration étendues
const giftCards: GiftCard[] = [
  {
    id: "GC-001",
    code: "GIFT-2024-001",
    amount: {
      XOF: 32800,
      EUR: 50,
      USD: 55
    },
    recipientEmail: "john@example.com",
    recipientName: "John Doe",
    message: "Joyeux anniversaire !",
    issuedBy: "user-1",
    status: "ACTIVE",
    expiresAt: new Date("2025-03-01"),
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01")
  },
  {
    id: "GC-002",
    code: "GIFT-2024-002",
    amount: {
      XOF: 65600,
      EUR: 100,
      USD: 110
    },
    recipientEmail: "jane@example.com",
    recipientName: "Jane Smith",
    issuedBy: "user-2",
    redeemedBy: "user-3",
    status: "REDEEMED",
    expiresAt: new Date("2025-03-01"),
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-20")
  },
  {
    id: "GC-003",
    code: "GIFT-2024-003",
    amount: {
      XOF: 16400,
      EUR: 25,
      USD: 27.5
    },
    recipientEmail: "alice@example.com",
    recipientName: "Alice Johnson",
    message: "Bon shopping !",
    issuedBy: "user-4",
    status: "ACTIVE",
    expiresAt: new Date("2025-04-15"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "GC-004",
    code: "GIFT-2024-004",
    amount: {
      XOF: 98400,
      EUR: 150,
      USD: 165
    },
    recipientEmail: "bob@example.com",
    recipientName: "Bob Wilson",
    issuedBy: "user-5",
    status: "EXPIRED",
    expiresAt: new Date("2024-01-01"),
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  }
];

export default function AdminGiftCardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);

  const filteredGiftCards = giftCards.filter(card => {
    const matchesSearch = 
      card.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.recipientEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.recipientName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || card.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "REDEEMED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "EXPIRED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Active";
      case "REDEEMED":
        return "Utilisée";
      case "EXPIRED":
        return "Expirée";
      default:
        return status;
    }
  };

  const handleDeactivateCard = (cardId: string) => {
    toast.success("Carte cadeau désactivée");
  };

  const handleDeleteCard = (cardId: string) => {
    toast.success("Carte cadeau supprimée");
  };

  const exportGiftCards = () => {
    toast.success("Export des cartes cadeaux en cours...");
  };

  const stats = {
    total: giftCards.length,
    active: giftCards.filter(card => card.status === "ACTIVE").length,
    redeemed: giftCards.filter(card => card.status === "REDEEMED").length,
    expired: giftCards.filter(card => card.status === "EXPIRED").length,
    totalValue: giftCards.reduce((sum, card) => sum + card.amount.EUR, 0),
    activeValue: giftCards
      .filter(card => card.status === "ACTIVE")
      .reduce((sum, card) => sum + card.amount.EUR, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cartes Cadeaux</h1>
          <p className="text-muted-foreground">
            Gérez les cartes cadeaux électroniques de votre boutique
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={exportGiftCards} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle carte
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des cartes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Toutes les cartes créées
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartes actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Cartes non utilisées
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeValue}€</div>
            <p className="text-xs text-muted-foreground">
              Valeur des cartes actives
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'utilisation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.redeemed / stats.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Cartes utilisées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher par code, email ou nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="REDEEMED">Utilisée</SelectItem>
                <SelectItem value="EXPIRED">Expirée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des cartes cadeaux */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date d'émission</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGiftCards.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Aucune carte cadeau trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredGiftCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="font-mono font-medium">{card.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{card.recipientName}</div>
                        <div className="text-sm text-gray-500">{card.recipientEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{card.amount.EUR}€</div>
                      <div className="text-sm text-gray-500">
                        {card.amount.XOF.toLocaleString()} FCFA
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      {new Date(card.expiresAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(card.status)}>
                        {getStatusLabel(card.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setSelectedCard(card)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Détails de la carte cadeau</DialogTitle>
                              <DialogDescription>
                                Code: {card.code}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="text-center">
                                <QRCode value={card.code} size={200} />
                              </div>
                              <div className="space-y-2">
                                <div><strong>Destinataire:</strong> {card.recipientName}</div>
                                <div><strong>Email:</strong> {card.recipientEmail}</div>
                                <div><strong>Montant:</strong> {card.amount.EUR}€</div>
                                <div><strong>Statut:</strong> {getStatusLabel(card.status)}</div>
                                {card.message && (
                                  <div><strong>Message:</strong> {card.message}</div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}