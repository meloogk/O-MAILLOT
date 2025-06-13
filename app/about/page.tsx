"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Trophy, Users } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { 
    icon: <Trophy className="h-6 w-6 text-green-600" />,
    value: "10K+",
    label: "Maillots vendus"
  },
  {
    icon: <Users className="h-6 w-6 text-green-600" />,
    value: "5K+",
    label: "Clients satisfaits"
  },
  {
    icon: <Shield className="h-6 w-6 text-green-600" />,
    value: "100%",
    label: "Produits authentiques"
  },
  {
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    value: "24/7",
    label: "Support client"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
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
            À propos de O'MAILLOT
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Votre destination de confiance pour les maillots de football et de basketball authentiques. 
            Nous nous engageons à fournir des produits de la plus haute qualité à nos clients passionnés de sport.
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="py-16 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notre Histoire</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Fondé par des passionnés de sport, O'MAILLOT est né de la volonté de rendre accessibles 
              les maillots officiels des plus grandes équipes de football et de NBA. Notre expertise 
              et notre engagement envers la qualité nous permettent de vous offrir une sélection 
              unique de maillots authentiques.
            </p>
          </motion.section>

          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Notre Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Notre mission est de permettre aux fans de sport de porter fièrement les couleurs 
              de leurs équipes préférées. Nous nous efforçons de :
            </p>
            <ul className="grid gap-4 text-lg text-gray-600 dark:text-gray-300">
              <motion.li 
                className="flex items-center space-x-3"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="h-2 w-2 bg-green-500 rounded-full" />
                <span>Proposer uniquement des produits authentiques et officiels</span>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="h-2 w-2 bg-green-500 rounded-full" />
                <span>Offrir le meilleur service client possible</span>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="h-2 w-2 bg-green-500 rounded-full" />
                <span>Garantir des prix compétitifs</span>
              </motion.li>
            </ul>
          </motion.section>

          <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Authenticité</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nous garantissons l'authenticité de tous nos produits, sans exception.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Qualité</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nous sélectionnons rigoureusement chaque produit pour assurer une qualité optimale.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Service</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notre équipe est dédiée à votre satisfaction et à votre expérience d'achat.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}