import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRewards, Achievement, Badge } from '@/lib/types';
import { REWARD_LEVELS, POINTS_RULES } from '@/lib/constants/rewards';

interface RewardsState {
  rewards: UserRewards;
  addPoints: (points: number, reason: string) => void;
  completeAchievement: (achievementId: string) => void;
  unlockBadge: (badge: Badge) => void;
  updateLoginStreak: () => void;
  addReferral: (userId: string) => void;
  getCurrentLevel: () => any;
  getNextLevel: () => any;
}

const initialRewards: UserRewards = {
  points: 0,
  level: 1,
  totalSpent: 0,
  totalOrders: 0,
  badges: [],
  streaks: {
    currentLoginStreak: 0,
    longestLoginStreak: 0,
  },
  achievements: [],
  referrals: {
    code: `OMAILLOT${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    referredUsers: [],
    totalEarned: 0,
  },
};

export const useRewards = create<RewardsState>()(
  persist(
    (set, get) => ({
      rewards: initialRewards,

      addPoints: (points, reason) => {
        set((state) => {
          const newPoints = state.rewards.points + points;
          const newLevel = REWARD_LEVELS.reduce((prev, current) => 
            newPoints >= current.minPoints ? current : prev
          );

          return {
            rewards: {
              ...state.rewards,
              points: newPoints,
              level: newLevel.level,
            },
          };
        });
      },

      completeAchievement: (achievementId) => {
        set((state) => ({
          rewards: {
            ...state.rewards,
            achievements: state.rewards.achievements.map((achievement) =>
              achievement.id === achievementId
                ? { ...achievement, completed: true, completedAt: new Date() }
                : achievement
            ),
          },
        }));
      },

      unlockBadge: (badge) => {
        set((state) => ({
          rewards: {
            ...state.rewards,
            badges: [...state.rewards.badges, badge],
          },
        }));
      },

      updateLoginStreak: () => {
        set((state) => {
          const today = new Date();
          const lastLogin = state.rewards.streaks.lastLoginDate;
          const isConsecutive = lastLogin && 
            (today.getTime() - lastLogin.getTime()) <= 24 * 60 * 60 * 1000;

          const newStreak = isConsecutive 
            ? state.rewards.streaks.currentLoginStreak + 1 
            : 1;

          return {
            rewards: {
              ...state.rewards,
              streaks: {
                ...state.rewards.streaks,
                currentLoginStreak: newStreak,
                longestLoginStreak: Math.max(
                  newStreak, 
                  state.rewards.streaks.longestLoginStreak
                ),
                lastLoginDate: today,
              },
            },
          };
        });
      },

      addReferral: (userId) => {
        set((state) => ({
          rewards: {
            ...state.rewards,
            referrals: {
              ...state.rewards.referrals,
              referredUsers: [...state.rewards.referrals.referredUsers, userId],
              totalEarned: state.rewards.referrals.totalEarned + POINTS_RULES.REFERRAL_SUCCESS,
            },
          },
        }));
      },

      getCurrentLevel: () => {
        const { rewards } = get();
        return REWARD_LEVELS.find(level => level.level === rewards.level) || REWARD_LEVELS[0];
      },

      getNextLevel: () => {
        const { rewards } = get();
        return REWARD_LEVELS.find(level => level.level === rewards.level + 1);
      },
    }),
    {
      name: 'rewards-storage',
    }
  )
);