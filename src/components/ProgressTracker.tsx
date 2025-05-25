
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star } from 'lucide-react';

interface ProgressTrackerProps {
  playerStats: {
    score: number;
    badges: string[];
    levelsCompleted: string[];
  };
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ playerStats }) => {
  const allBadges = [
    { id: 'Fraction Star', color: 'bg-orange-500', icon: '🌟' },
    { id: 'Algebra Ace', color: 'bg-blue-500', icon: '⚡' },
    { id: 'Geometry Guru', color: 'bg-green-500', icon: '📐' }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Score */}
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-semibold text-lg">
              Score: <span className="text-yellow-400">{playerStats.score}</span>
            </span>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-semibold">
              Missions: {playerStats.levelsCompleted.length}/3
            </span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Badges:</span>
            <div className="flex gap-2">
              {allBadges.map(badge => (
                <Badge 
                  key={badge.id}
                  className={`${
                    playerStats.badges.includes(badge.id) 
                      ? badge.color 
                      : 'bg-gray-600'
                  } text-white px-3 py-1`}
                >
                  {badge.icon} {badge.id}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
