"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
        Conditions Générales de Vente
      </motion.h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur le site O'MAILLOT.
            En passant commande sur notre site, vous acceptez d'être lié par les présentes conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2>2. Commandes</h2>
          <p>
            Pour passer commande, vous devez être âgé d'au moins 18 ans et posséder une carte bancaire valide.
            Toute commande vaut acceptation des prix et de la description des produits disponibles à la vente.
          </p>
        </section>

        <section className="mb-8">
          <h2>3. Prix et Paiement</h2>
          <p>
            Les prix sont indiqués en euros et comprennent la TVA applicable.
            Le paiement s'effectue par carte bancaire au moment de la commande.
          </p>
        </section>

        <section className="mb-8">
          <h2>4. Livraison</h2>
          <p>
            Les délais de livraison sont donnés à titre indicatif.
            Les frais de livraison sont calculés en fonction du pays de destination.
          </p>
        </section>

        <section className="mb-8">
          <h2>5. Retours et Remboursements</h2>
          <p>
            Vous disposez d'un délai de 14 jours pour retourner un article.
            Les frais de retour sont à votre charge sauf en cas de produit défectueux.
          </p>
        </section>

        <section className="mb-8">
          <h2>6. Garantie</h2>
          <p>
            Tous nos produits sont garantis authentiques et neufs.
            La garantie ne couvre pas l'usure normale ou les dommages causés par une mauvaise utilisation.
          </p>
        </section>

        <section className="mb-8">
          <h2>7. Protection des Données</h2>
          <p>
            Nous nous engageons à protéger vos données personnelles conformément au RGPD.
            Pour plus d'informations, consultez notre politique de confidentialité.
          </p>
        </section>
      </div>
    </motion.div>
  );
}