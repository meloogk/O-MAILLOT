"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Politique de Confidentialité
      </motion.h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>1. Collecte des Données</h2>
          <p>
            Nous collectons les informations que vous nous fournissez lors de la création de votre compte,
            de vos achats ou de vos interactions avec notre service client. Ces informations peuvent inclure :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Adresse de livraison</li>
            <li>Numéro de téléphone</li>
            <li>Historique des commandes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>2. Utilisation des Données</h2>
          <p>
            Nous utilisons vos données personnelles pour :
          </p>
          <ul>
            <li>Traiter vos commandes</li>
            <li>Vous informer sur l'état de vos commandes</li>
            <li>Améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Vous envoyer des communications marketing (avec votre consentement)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>3. Protection des Données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
            contre tout accès, modification, divulgation ou destruction non autorisés.
          </p>
        </section>

        <section className="mb-8">
          <h2>4. Cookies</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
            Vous pouvez contrôler l'utilisation des cookies dans les paramètres de votre navigateur.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Vos Droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>6. Contact</h2>
          <p>
            Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits,
            vous pouvez nous contacter à privacy@omaillot.fr
          </p>
        </section>
      </div>
    </motion.div>
  );
}