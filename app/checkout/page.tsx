"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentMethod } from "@/lib/types";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  address: z.string().min(5, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  country: z.string().min(2, "Le pays est requis"),
  paymentMethod: z.enum([
    "WAVE",
    "ORANGE_MONEY",
    "MTN_MONEY",
    "MOOV_MONEY",
    "CASH",
    "PAYPAL",
    "CARD"
  ] as const),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const paymentMethods = [
  {
    id: "WAVE" as PaymentMethod,
    name: "Wave",
    description: "Paiement via Wave"
  },
  {
    id: "ORANGE_MONEY" as PaymentMethod,
    name: "Orange Money",
    description: "Paiement via Orange Money"
  },
  {
    id: "MTN_MONEY" as PaymentMethod,
    name: "MTN Money",
    description: "Paiement via MTN Money"
  },
  {
    id: "MOOV_MONEY" as PaymentMethod,
    name: "Moov Money",
    description: "Paiement via Moov Money"
  },
  {
    id: "CASH" as PaymentMethod,
    name: "Cash à la livraison",
    description: "Paiement à la livraison"
  },
  {
    id: "PAYPAL" as PaymentMethod,
    name: "PayPal",
    description: "Paiement sécurisé via PayPal"
  },
  {
    id: "CARD" as PaymentMethod,
    name: "Carte bancaire",
    description: "Visa, Mastercard, etc."
  }
];

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Simuler un panier avec des articles
  const cart = {
    items: [
      // Articles du panier à implémenter
    ],
    total: {
      XOF: 65000,
      EUR: 99.09,
      USD: 108.33
    }
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      paymentMethod: "CARD",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsLoading(true);
    
    // Simulation du processus de paiement
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Commande confirmée !");
      router.push("/confirmation");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Finaliser votre commande
          </motion.h1>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <div>
                  <div>{cart.total.XOF.toLocaleString()} FCFA</div>
                  <div className="text-gray-500 text-xs">
                    (~{cart.total.EUR.toFixed(2)}€ / ${cart.total.USD.toFixed(2)})
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <div>
                    <div>{cart.total.XOF.toLocaleString()} FCFA</div>
                    <div className="text-gray-500 text-sm">
                      (~{cart.total.EUR.toFixed(2)}€ / ${cart.total.USD.toFixed(2)})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Informations de livraison</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={isLoading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un pays" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BJ">Bénin</SelectItem>
                                <SelectItem value="BF">Burkina Faso</SelectItem>
                                <SelectItem value="CI">Côte d'Ivoire</SelectItem>
                                <SelectItem value="ML">Mali</SelectItem>
                                <SelectItem value="NE">Niger</SelectItem>
                                <SelectItem value="SN">Sénégal</SelectItem>
                                <SelectItem value="TG">Togo</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Mode de paiement</h2>
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un mode de paiement" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id}>
                                {method.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Traitement en cours..." : "Confirmer la commande"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}