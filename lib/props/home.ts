import { Product } from "../types";

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