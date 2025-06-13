"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { ProductGridProps } from "@/lib/types/props";
import ProductCard from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

// Données de démonstration
const products: Product[] = [
  // ... (même contenu que FeaturedProducts)
];

const leagues = ["Premier League", "La Liga", "Ligue 1", "Serie A", "Bundesliga", "NBA"];
const teams = ["Lakers", "Warriors", "PSG", "Real Madrid", "Barcelona", "Manchester United"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");

  const handleAddToCart = (product: Product, size: string) => {
    toast.success(`${product.name} (Taille: ${size}) ajouté au panier`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLeague = selectedLeague === "all" || product.league === selectedLeague;
    const matchesTeam =
      selectedTeam === "all" || product.teams.includes(selectedTeam);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesLeague && matchesTeam && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtres */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Filtres</h3>
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Championnat
                </label>
                <Select
                  value={selectedLeague}
                  onValueChange={setSelectedLeague}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les championnats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les championnats</SelectItem>
                    {leagues.map((league) => (
                      <SelectItem key={league} value={league}>
                        {league}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Équipe
                </label>
                <Select
                  value={selectedTeam}
                  onValueChange={setSelectedTeam}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les équipes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les équipes</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Prix (€)
                </label>
                <div className="pt-4">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={200}
                    step={10}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLeague("all");
                  setSelectedTeam("all");
                  setPriceRange([0, 200]);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Produits */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Maillots ({sortedProducts.length})
            </h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Mis en avant</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Aucun produit ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}