"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AchievementCardProps } from "@/lib/props";
import * as Icons from "lucide-react";

export default function AchievementCard({ achievement, onClaim }: AchievementCardProps) {
  const IconComponent = Icons[achievement.icon as keyof typeof Icons] as any;
  const progressPercentage = (achievement.progress / achievement.target) * 100;

  return (
    <Card className={`${achievement.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-3">
          {IconComponent && (
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
          )}
          <div>
            <div className="font-semibold">{achievement.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              {achievement.description}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progression</span>
              <span>{achievement.progress}/{achievement.target}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-yellow-600 font-semibold">
                +{achievement.reward.points} points
              </span>
              {achievement.reward.badge && (
                <span className="text-purple-600 ml-2">+ Badge</span>
              )}
            </div>
            
            {achievement.completed && !achievement.completedAt && onClaim && (
              <Button 
                size="sm" 
                onClick={() => onClaim(achievement.id)}
                className="bg-green-500 hover:bg-green-600"
              >
                Réclamer
              </Button>
            )}
            
            {achievement.completedAt && (
              <div className="text-xs text-green-600 font-medium">
                ✓ Complété
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}