import { RewardLevel, Achievement } from '../types';

export const REWARD_LEVELS: RewardLevel[] = [
  {
    level: 1,
    name: "Fan Débutant",
    minPoints: 0,
    benefits: ["Accès aux promotions exclusives"],
    discount: 0,
    color: "#6B7280"
  },
  {
    level: 2,
    name: "Supporter",
    minPoints: 500,
    benefits: ["5% de réduction", "Livraison gratuite dès 50€"],
    discount: 5,
    color: "#10B981"
  },
  {
    level: 3,
    name: "Fan Passionné",
    minPoints: 1500,
    benefits: ["10% de réduction", "Accès anticipé aux nouveautés"],
    discount: 10,
    color: "#3B82F6"
  },
  {
    level: 4,
    name: "Collectionneur",
    minPoints: 3000,
    benefits: ["15% de réduction", "Produits exclusifs", "Support prioritaire"],
    discount: 15,
    color: "#8B5CF6"
  },
  {
    level: 5,
    name: "Légende",
    minPoints: 6000,
    benefits: ["20% de réduction", "Accès VIP", "Cadeaux personnalisés"],
    discount: 20,
    color: "#F59E0B"
  }
];

export const ACHIEVEMENTS_TEMPLATES: Omit<Achievement, 'id' | 'progress' | 'completed' | 'completedAt'>[] = [
  {
    name: "Premier Achat",
    description: "Effectuer votre première commande",
    icon: "ShoppingBag",
    target: 1,
    reward: { points: 100 }
  },
  {
    name: "Fidèle Client",
    description: "Effectuer 10 commandes",
    icon: "Heart",
    target: 10,
    reward: { points: 500 }
  },
  {
    name: "Gros Dépensier",
    description: "Dépenser plus de 500€",
    icon: "CreditCard",
    target: 500,
    reward: { points: 1000 }
  },
  {
    name: "Collectionneur",
    description: "Acheter 50 maillots différents",
    icon: "Trophy",
    target: 50,
    reward: { points: 2000 }
  },
  {
    name: "Parrain",
    description: "Parrainer 5 amis",
    icon: "Users",
    target: 5,
    reward: { points: 750 }
  },
  {
    name: "Critique",
    description: "Laisser 20 avis produits",
    icon: "Star",
    target: 20,
    reward: { points: 300 }
  },
  {
    name: "Assidu",
    description: "Se connecter 30 jours consécutifs",
    icon: "Calendar",
    target: 30,
    reward: { points: 500 }
  }
];

export const POINTS_RULES = {
  ORDER_COMPLETION: 10, // Points par euro dépensé
  REVIEW_PRODUCT: 25,
  REFERRAL_SUCCESS: 200,
  DAILY_LOGIN: 5,
  FIRST_ORDER: 100,
  BIRTHDAY_BONUS: 500,
  SOCIAL_SHARE: 15
};