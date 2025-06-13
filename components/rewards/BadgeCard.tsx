"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCardProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export default function BadgeCard({ badge, size = 'md' }: BadgeCardProps) {
  const IconComponent = Icons[badge.icon as keyof typeof Icons] as any;
  
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20", 
    lg: "h-24 w-24"
  };

  const rarityColors = {
    COMMON: "from-gray-400 to-gray-600",
    RARE: "from-blue-400 to-blue-600",
    EPIC: "from-purple-400 to-purple-600",
    LEGENDARY: "from-yellow-400 to-yellow-600"
  };

  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className={cn(
          "mx-auto rounded-full bg-gradient-to-br flex items-center justify-center mb-3",
          sizeClasses[size],
          rarityColors[badge.rarity]
        )}>
          {IconComponent && (
            <IconComponent className="h-8 w-8 text-white" />
          )}
        </div>
        <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {badge.description}
        </p>
        <Badge variant="outline" className="text-xs">
          {badge.rarity}
        </Badge>
        <div className="text-xs text-gray-500 mt-1">
          Débloqué le {new Date(badge.unlockedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}