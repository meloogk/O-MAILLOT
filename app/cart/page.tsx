"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/lib/store/cart";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Votre panier est vide
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          Découvrez notre collection de maillots et ajoutez vos articles préférés au panier.
        </p>
        <Link href="/products">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Voir les produits
          </Button>
        </Link>
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.product.teams[0]}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>
                      <div>
                        <div>{item.price.XOF.toLocaleString()} FCFA</div>
                        <div className="text-sm text-gray-500">
                          (~{item.price.EUR.toFixed(2)}€)
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{(item.price.XOF * item.quantity).toLocaleString()} FCFA</div>
                        <div className="text-sm text-gray-500">
                          (~{(item.price.EUR * item.quantity).toFixed(2)}€)
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          removeItem(item.id);
                          toast.success("Article retiré du panier");
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <div>
                  <div>{total.XOF.toLocaleString()} FCFA</div>
                  <div className="text-sm text-gray-500">
                    (~{total.EUR.toFixed(2)}€)
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <div>
                  <div>{total.XOF.toLocaleString()} FCFA</div>
                  <div className="text-sm text-gray-500">
                    (~{total.EUR.toFixed(2)}€ / ${total.USD.toFixed(2)})
                  </div>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Procéder au paiement
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}