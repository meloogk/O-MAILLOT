import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Maillots Équipes Nationales",
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    link: "/products?category=national",
    count: 156
  },
  {
    name: "Maillots Premier League",
    image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    link: "/products?league=premier-league",
    count: 124
  },
  {
    name: "Maillots Liga",
    image: "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg",
    link: "/products?league=liga",
    count: 98
  },
  {
    name: "Maillots Ligue 1",
    image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
    link: "/products?league=ligue-1",
    count: 86
  }
];

export default function CategorySection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Parcourez par catégorie
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explorez notre collection complète de maillots par championnats et équipes nationales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative overflow-hidden rounded-lg h-64 transition-transform duration-300 hover:-translate-y-1 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  {category.count} produits
                </p>
                <div className="flex items-center text-white/90 text-sm font-medium">
                  <span>Découvrir</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}