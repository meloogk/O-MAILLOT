import { Product, CartItem } from "../types";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export interface ProductFiltersProps {
  leagues: string[];
  teams: string[];
  onFilterChange: (filters: any) => void;
}

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}