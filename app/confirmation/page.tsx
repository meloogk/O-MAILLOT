"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Commande confirmée !
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Merci pour votre commande. Vous recevrez bientôt un email de confirmation avec les détails de votre commande.
          </motion.p>

          <motion.div
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Récapitulatif de la commande
            </h2>
            <div className="text-left space-y-2 text-gray-600 dark:text-gray-300">
              <p>Numéro de commande : <span className="font-medium">ORD-2024-001</span></p>
              <p>Date : <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
              <p>Statut : <span className="font-medium text-green-500">Confirmée</span></p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/products">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Continuer mes achats
              </Button>
            </Link>
            
            <Link href="/profile/orders">
              <Button variant="outline" className="w-full">
                Voir mes commandes
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}