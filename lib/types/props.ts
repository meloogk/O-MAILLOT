import { ReactNode } from "react";
import { Product, Order, CartItem, DashboardStats } from "./index";

// Props partagées
export interface LayoutProps {
  children: ReactNode;
}

// Props des composants de la page d'accueil
export interface HeroSectionProps {
  slides?: Array<{
    image: string;
    title: string;
    subtitle: string;
    cta: string;
    link: string;
  }>;
}

export interface FeaturedProductsProps {
  title?: string;
  products?: Product[];
}

export interface CategorySectionProps {
  categories?: Array<{
    name: string;
    image: string;
    link: string;
    count: number;
  }>;
}

export interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
}

// Props des composants produits
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size: string) => void;
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

// Props des composants panier
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

// Props des composants admin
export interface StatsCardsProps {
  stats: DashboardStats;
}

export interface OrdersTableProps {
  orders: Order[];
  onStatusChange?: (orderId: string, status: string) => void;
}

// Props des composants équipes
export interface TeamCardProps {
  name: string;
  logo: string;
  league: string;
  productCount: number;
}

export interface TeamGridProps {
  teams: Array<{
    name: string;
    logo: string;
    league: string;
    productCount: number;
  }>;
}

// Props des composants de contact
export interface ContactFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}