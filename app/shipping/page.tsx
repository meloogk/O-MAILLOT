"use client";

import { motion } from "framer-motion";
import { Truck, Package, RefreshCw, Clock } from "lucide-react";

const shippingInfo = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Livraison Standard",
    details: "3-5 jours ouvrés",
    price: "4.99€"
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "Livraison Express",
    details: "1-2 jours ouvrés",
    price: "9.99€"
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Retours Gratuits",
    details: "14 jours pour changer d'avis",
    price: "Gratuit"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Click & Collect",
    details: "Retrait en boutique",
    price: "Gratuit"
  }
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.div 
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Livraison & Retours
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Découvrez nos options de livraison et notre politique de retours
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {shippingInfo.map((option, index) => (
            <motion.div
              key={option.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.details}
                  </p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                    {option.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Information */}
        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Délais de Livraison
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Les délais de livraison varient en fonction du mode de livraison choisi et de votre localisation.
                Voici les détails pour chaque option :
              </p>
              <ul>
                <li>France métropolitaine : 2-3 jours ouvrés</li>
                <li>Europe : 3-5 jours ouvrés</li>
                <li>International : 5-7 jours ouvrés</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Politique de Retours
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Nous acceptons les retours dans les 14 jours suivant la réception de votre commande.
                Les articles doivent être retournés dans leur état d'origine, avec leurs étiquettes.
              </p>
              <h3>Conditions de retour :</h3>
              <ul>
                <li>Article non porté et non lavé</li>
                <li>Étiquettes d'origine attachées</li>
                <li>Emballage d'origine</li>
                <li>Preuve d'achat incluse</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Suivi de Commande
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                Un numéro de suivi vous sera envoyé par email dès que votre commande sera expédiée.
                Vous pourrez suivre votre colis en temps réel sur notre site ou directement sur le site du transporteur.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}