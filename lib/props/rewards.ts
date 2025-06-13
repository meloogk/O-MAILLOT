import { UserRewards, Badge, Achievement, RewardLevel } from "../types";

export interface RewardsOverviewProps {
  rewards: UserRewards;
  level: RewardLevel;
}

export interface BadgeCardProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export interface AchievementCardProps {
  achievement: Achievement;
  onClaim?: (achievementId: string) => void;
}

export interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  color?: string;
}

export interface LevelProgressProps {
  currentLevel: RewardLevel;
  nextLevel?: RewardLevel;
  currentPoints: number;
}

export interface ReferralSystemProps {
  referralCode: string;
  referredUsers: string[];
  totalEarned: number;
}