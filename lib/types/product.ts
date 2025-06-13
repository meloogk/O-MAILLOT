export type Product = {
  id: string;
  name: string;
  description: string;
  price: {
    XOF: number;
    EUR: number;
    USD: number;
  };
  images: string[];
  sizes: string[];
  teams: string[];
  league: string;
  season: string;
  isHome: boolean;
  stock: number;
  discount?: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  price: {
    XOF: number;
    EUR: number;
    USD: number;
  };
};