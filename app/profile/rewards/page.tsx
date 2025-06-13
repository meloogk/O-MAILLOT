"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, Gift, Trophy, Star, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import RewardsOverview from "@/components/rewards/RewardsOverview";
import BadgeCard from "@/components/rewards/BadgeCard";
import AchievementCard from "@/components/rewards/AchievementCard";
import { UserRewards, Badge as BadgeType, Achievement } from "@/lib/types";
import { REWARD_LEVELS, ACHIEVEMENTS_TEMPLATES } from "@/lib/constants/rewards";

// Données de démonstration
const mockUserRewards: UserRewards = {
  points: 2450,
  level: 3,
  totalSpent: 890.50,
  totalOrders: 12,
  badges: [
    {
      id: "1",
      name: "Premier Achat",
      description: "Votre première commande",
      icon: "ShoppingBag",
      color: "#10B981",
      unlockedAt: new Date("2024-01-15"),
      rarity: "COMMON"
    },
    {
      id: "2", 
      name: "Fidèle Client",
      description: "10 commandes effectuées",
      icon: "Heart",
      color: "#3B82F6",
      unlockedAt: new Date("2024-02-20"),
      rarity: "RARE"
    },
    {
      id: "3",
      name: "Critique Expert",
      description: "20 avis produits",
      icon: "Star",
      color: "#F59E0B",
      unlockedAt: new Date("2024-03-10"),
      rarity: "EPIC"
    }
  ],
  streaks: {
    currentLoginStreak: 7,
    longestLoginStreak: 15,
    lastLoginDate: new Date()
  },
  achievements: [
    {
      id: "1",
      name: "Gros Dépensier",
      description: "Dépenser plus de 500€",
      icon: "CreditCard",
      progress: 890,
      target: 500,
      completed: true,
      completedAt: new Date("2024-02-15"),
      reward: { points: 1000 }
    },
    {
      id: "2",
      name: "Collectionneur",
      description: "Acheter 50 maillots différents",
      icon: "Trophy",
      progress: 32,
      target: 50,
      completed: false,
      reward: { points: 2000 }
    },
    {
      id: "3",
      name: "Parrain",
      description: "Parrainer 5 amis",
      icon: "Users",
      progress: 2,
      target: 5,
      completed: false,
      reward: { points: 750 }
    }
  ],
  referrals: {
    code: "OMAILLOT2024",
    referredUsers: ["user1", "user2"],
    totalEarned: 400
  }
};

export default function RewardsPage() {
  const [referralCode] = useState(mockUserRewards.referrals.code);
  const currentLevel = REWARD_LEVELS.find(l => l.level === mockUserRewards.level) || REWARD_LEVELS[0];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Code de parrainage copié !");
  };

  const handleClaimAchievement = (achievementId: string) => {
    toast.success("Récompense réclamée !");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Mes Récompenses</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gagnez des points, débloquez des badges et profitez d'avantages exclusifs
        </p>
      </div>

      <RewardsOverview rewards={mockUserRewards} level={currentLevel} />

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="achievements">Défis</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="levels">Niveaux</TabsTrigger>
          <TabsTrigger value="referral">Parrainage</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Défis en cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockUserRewards.achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    onClaim={handleClaimAchievement}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-500" />
                Collection de badges ({mockUserRewards.badges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockUserRewards.badges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="levels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-orange-500" />
                Système de niveaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {REWARD_LEVELS.map((level) => (
                  <div
                    key={level.level}
                    className={`p-4 rounded-lg border-2 ${
                      level.level === currentLevel.level
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : level.level < currentLevel.level
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg" style={{ color: level.color }}>
                          Niveau {level.level}: {level.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {level.minPoints} points requis
                        </p>
                      </div>
                      {level.level === currentLevel.level && (
                        <Badge className="bg-orange-500">Actuel</Badge>
                      )}
                      {level.level < currentLevel.level && (
                        <Badge className="bg-green-500">Débloqué</Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      {level.benefits.map((benefit, index) => (
                        <div key={index} className="text-sm flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {benefit}
                        </div>
                      ))}
                      {level.discount > 0 && (
                        <div className="text-sm flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {level.discount}% de réduction permanente
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Programme de parrainage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Comment ça marche ?</h3>
                <ul className="text-sm space-y-1">
                  <li>• Partagez votre code avec vos amis</li>
                  <li>• Ils obtiennent 10% de réduction sur leur première commande</li>
                  <li>• Vous gagnez 200 points par parrainage réussi</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Votre code de parrainage
                </label>
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly className="font-mono" />
                  <Button onClick={copyReferralCode} variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {mockUserRewards.referrals.referredUsers.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Amis parrainés
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {mockUserRewards.referrals.totalEarned}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Points gagnés
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}