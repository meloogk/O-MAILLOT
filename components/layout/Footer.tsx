import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500 dark:text-orange-400">
              O'MAILLOT
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Votre boutique en ligne spécialisée dans la vente de maillots de football authentiques
              et de haute qualité pour tous les fans et supporters.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Liens rapides
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Nouveautés", href: "/products?sort=newest" },
                { name: "Promotions", href: "/products?discount=true" },
                { name: "Maillots domicile", href: "/products?type=home" },
                { name: "Maillots extérieur", href: "/products?type=away" },
                { name: "Équipes nationales", href: "/products?category=national" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Informations
            </h3>
            <ul className="space-y-2">
              {[
                { name: "À propos de nous", href: "/about" },
                { name: "Conditions générales", href: "/terms" },
                { name: "Politique de confidentialité", href: "/privacy" },
                { name: "Expédition & Retours", href: "/shipping" },
                { name: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-700">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  123 Rue du Football, 75000 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +33 1 23 45 67 89
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  contact@footmaillots.fr
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} O'MAILLOT. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}