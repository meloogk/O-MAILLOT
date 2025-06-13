"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment puis-je suivre ma commande ?",
    answer: "Une fois votre commande expédiée, vous recevrez un email contenant un numéro de suivi. Vous pourrez suivre votre colis en temps réel sur notre site ou directement sur le site du transporteur."
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais de livraison varient selon votre localisation : France métropolitaine (2-3 jours), Europe (3-5 jours), International (5-7 jours)."
  },
  {
    question: "Comment puis-je retourner un article ?",
    answer: "Vous disposez de 14 jours pour retourner un article. Il doit être dans son état d'origine, avec les étiquettes. Contactez notre service client pour initier le retour."
  },
  {
    question: "Les maillots sont-ils authentiques ?",
    answer: "Oui, tous nos maillots sont 100% authentiques et proviennent directement des fournisseurs officiels des clubs et des équipes."
  },
  {
    question: "Comment choisir la bonne taille ?",
    answer: "Consultez notre guide des tailles disponible sur chaque page produit. En cas de doute, n'hésitez pas à contacter notre service client."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et les virements bancaires."
  },
  {
    question: "Puis-je personnaliser mon maillot ?",
    answer: "Oui, vous pouvez personnaliser votre maillot avec un nom et un numéro. Cette option est disponible sur la page du produit."
  },
  {
    question: "Que faire si mon colis est endommagé ?",
    answer: "Contactez immédiatement notre service client avec des photos du colis et du produit. Nous traiterons votre demande en priorité."
  }
];

export default function FAQPage() {
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
            Questions Fréquentes
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Trouvez rapidement des réponses à vos questions
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-12 p-6 bg-green-50 dark:bg-gray-800 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Notre équipe de support est disponible pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Contactez-nous
            </a>
            <a
              href="mailto:support@omaillot.fr"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
            >
              support@omaillot.fr
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}