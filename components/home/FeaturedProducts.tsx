"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Données de démonstration
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Maillot Domicile PSG 2024/2025",
    description: "Maillot officiel du Paris Saint-Germain pour la saison 2024/2025",
    price: 89.99,
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
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Maillot Extérieur Real Madrid 2024/2025",
    description: "Maillot extérieur officiel du Real Madrid pour la saison 2024/2025",
    price: 94.99,
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
    discount: 10,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Maillot Domicile FC Barcelone 2024/2025",
    description: "Maillot domicile officiel du FC Barcelone pour la saison 2024/2025",
    price: 89.99,
    images: [
      "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
      "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg"
    ],
    sizes: ["S", "M", "L", "XL"],
    teams: ["FC Barcelone"],
    league: "La Liga",
    season: "2024/2025",
    isHome: true,
    stock: 40,
    discount: 0,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Maillot Extérieur Manchester United 2024/2025",
    description: "Maillot extérieur officiel de Manchester United pour la saison 2024/2025",
    price: 94.99,
    images: [
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
      "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    teams: ["Manchester United"],
    league: "Premier League",
    season: "2024/2025",
    isHome: false,
    stock: 30,
    discount: 15,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

interface FeaturedProductsProps {
  title?: string;
}

export default function FeaturedProducts({ title = "Produits populaires" }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState("featured");

  const handleAddToCart = (product: Product, size: string) => {
    toast.success(`${product.name} (Taille: ${size}) ajouté au panier`);
    // Logique pour ajouter au panier à implémenter
  };

  const filteredProducts = mockProducts.filter(product => {
    if (activeTab === "featured") return product.featured;
    if (activeTab === "new") return true; // Simulation des nouveautés
    if (activeTab === "sale") return product.discount && product.discount > 0;
    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Découvrez notre sélection de maillots les plus populaires
            </p>
          </div>
          <Link 
            href="/products" 
            className="mt-4 sm:mt-0 flex items-center text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
          >
            Voir tous les produits
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="featured">Populaires</TabsTrigger>
            <TabsTrigger value="new">Nouveautés</TabsTrigger>
            <TabsTrigger value="sale">Promotions</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}