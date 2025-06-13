import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategorySection from "@/components/home/CategorySection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <NewsletterSection />
    </div>
  );
}