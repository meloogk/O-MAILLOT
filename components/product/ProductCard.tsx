"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export default function ProductCard({ 
  product, 
  onAddToCart,
  isFavorite = false,
  onToggleFavorite
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false);

  const discount = product.discount || 0;
  const discountedPrice = {
    XOF: (product.price?.XOF ?? 0) * (1 - discount / 100),
    EUR: (product.price?.EUR ?? 0) * (1 - discount / 100),
    USD: (product.price?.USD ?? 0) * (1 - discount / 100)
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);
    onAddToCart && onAddToCart(product, selectedSize);
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
      toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
    } else {
      toast.error("Connectez-vous pour ajouter aux favoris");
    }
  };

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative pt-[100%] overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="absolute inset-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-500",
                isHovered && product.images.length > 1 && "opacity-0"
              )}
            />
            {product.images.length > 1 && (
              <Image
                src={product.images[1]}
                alt={`${product.name} - Vue alternative`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={cn(
                  "object-cover opacity-0 transition-opacity duration-500",
                  isHovered && "opacity-100"
                )}
              />
            )}
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge className="bg-orange-500 hover:bg-orange-600">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-green-600 hover:bg-green-700">
              Populaire
            </Badge>
          )}
        </div>

        {/* Quick actions */}
        <div 
          className={cn(
            "absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button 
            variant="secondary" 
            size="icon" 
            className={cn(
              "rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm",
              isFavorite && "text-red-500 hover:text-red-600"
            )}
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={cn(
              "h-4 w-4",
              isFavorite ? "fill-current" : "fill-none"
            )} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link href={`/products/${product.id}`} className="block mb-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {product.teams[0]} | {product.season}
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {discountedPrice.XOF.toLocaleString()} FCFA
              </span>
              <div className="text-sm text-gray-500">
                (~{discountedPrice.EUR.toFixed(2)}€)
              </div>
            </div>
            {discount > 0 && product.price && (
              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                <div>{(product.price.XOF ?? 0).toLocaleString()} FCFA</div>
                <div>(~{(product.price.EUR ?? 0).toFixed(2)}€)</div>
              </div>
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant="outline"
                size="sm"
                className={cn(
                  "min-w-[2.5rem] h-8 px-2 py-0",
                  selectedSize === size && "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:text-white"
                )}
                onClick={() => {
                  setSelectedSize(size);
                  setShowSizeError(false);
                }}
              >
                {size}
              </Button>
            ))}
          </div>
          {showSizeError && (
            <p className="text-xs text-red-500 mt-1">
              Veuillez sélectionner une taille
            </p>
          )}
        </div>

        {/* Add to cart */}
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}