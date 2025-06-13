"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Gift, Users } from "lucide-react";
import { RewardsOverviewProps } from "@/lib/props";
import { REWARD_LEVELS } from "@/lib/constants/rewards";

export default function RewardsOverview({ rewards, level }: RewardsOverviewProps) {
  const nextLevel = REWARD_LEVELS.find(l => l.level === level.level + 1);
  const progressToNext = nextLevel 
    ? ((rewards.points - level.minPoints) / (nextLevel.minPoints - level.minPoints)) * 100
    : 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Niveau actuel */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Niveau Actuel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{level.name}</div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Niveau {level.level}
          </Badge>
          {nextLevel && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progression</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <Progress value={progressToNext} className="h-2" />
              <div className="text-xs mt-1 opacity-90">
                {nextLevel.minPoints - rewards.points} points pour {nextLevel.name}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Points totaux */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Points O'MAILLOT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {rewards.points.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Utilisez vos points pour des réductions
          </p>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-500" />
            Badges Collectés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {rewards.badges.length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Débloquez plus de badges
          </p>
        </CardContent>
      </Card>

      {/* Parrainages */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Parrainages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {rewards.referrals.referredUsers.length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Amis parrainés
          </p>
          <div className="text-xs text-green-600 mt-1">
            +{rewards.referrals.totalEarned} points gagnés
          </div>
        </CardContent>
      </Card>
    </div>
  );
}