export type UserRole = 'USER' | 'ADMIN';

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  favorites: string[]; // IDs des produits favoris
  giftCards: GiftCard[];
  rewards: UserRewards;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRewards = {
  points: number;
  level: number;
  totalSpent: number;
  totalOrders: number;
  badges: Badge[];
  streaks: {
    currentLoginStreak: number;
    longestLoginStreak: number;
    lastLoginDate?: Date;
  };
  achievements: Achievement[];
  referrals: {
    code: string;
    referredUsers: string[];
    totalEarned: number;
  };
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
  completedAt?: Date;
  reward: {
    points: number;
    badge?: Badge;
  };
};

export type RewardLevel = {
  level: number;
  name: string;
  minPoints: number;
  benefits: string[];
  discount: number; // Pourcentage de réduction
  color: string;
};

export type GiftCard = {
  id: string;
  code: string;
  amount: {
    XOF: number;
    EUR: number;
    USD: number;
  };
  recipientEmail?: string;
  recipientName?: string;
  message?: string;
  issuedBy: string; // User ID
  redeemedBy?: string; // User ID
  status: 'ACTIVE' | 'REDEEMED' | 'EXPIRED';
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};