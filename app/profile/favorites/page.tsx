"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

// Données de démonstration
const favorites: Product[] = [
  {
    id: "1",
    name: "Maillot Domicile PSG 2024/2025",
    description: "Maillot officiel du Paris Saint-Germain pour la saison 2024/2025",
    price: {
      XOF: 45000,
      EUR: 89.99,
      USD: 99.99
    },
    images: [
      "https://images.pexels.com/photos/6077804/pexels-photo-6077804.jpeg",
      "https://images.pexels.com/photos/6077810/pexels-photo-6077810.jpeg"
    ],
    sizes: ["S", "M", "L", "XL"],
    teams: ["Paris Saint-Germain"],
    league: "Ligue 1",
    season: "2024/2025",
    isHome: true,
    stock: 50,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Maillot Extérieur Real Madrid 2024/2025",
    description: "Maillot extérieur officiel du Real Madrid pour la saison  2024/2025",
    price: {
      XOF: 47500,
      EUR: 94.99,
      USD: 104.99
    },
    images: [
      "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
      "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    teams: ["Real Madrid"],
    league: "La Liga",
    season: "2024/2025",
    isHome: false,
    stock: 35,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFavorites = favorites.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.teams.some(team => team.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddToCart = (product: Product, size: string) => {
    toast.success(`${product.name} (Taille: ${size}) ajouté au panier`);
  };

  const handleToggleFavorite = (productId: string) => {
    toast.success("Retiré des favoris");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Favoris</h1>

      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher un maillot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Aucun favori trouvé
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFavorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}