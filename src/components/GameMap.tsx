
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rocket, Calculator, Zap, Shapes } from 'lucide-react';
import { GameLevel } from '@/pages/Index';

interface GameMapProps {
  onLevelSelect: (level: GameLevel) => void;
  playerStats: {
    score: number;
    badges: string[];
    levelsCompleted: string[];
  };
}

export const GameMap: React.FC<GameMapProps> = ({ onLevelSelect, playerStats }) => {
  const levels = [
    {
      id: 'fractions',
      title: 'Planet Fractia',
      description: 'Fuel your spaceship by mastering fractions',
      icon: Calculator,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      completed: playerStats.levelsCompleted.includes('fractions')
    },
    {
      id: 'algebra',
      title: 'Star Gate Alpha',
      description: 'Solve equations to unlock the star gate',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      completed: playerStats.levelsCompleted.includes('algebra')
    },
    {
      id: 'geometry',
      title: 'Satellite Station',
      description: 'Repair the satellite using geometry',
      icon: Shapes,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      completed: playerStats.levelsCompleted.includes('geometry')
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Mission</h2>
        <p className="text-cyan-200 text-lg">Explore the galaxy and master math concepts!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {levels.map((level, index) => (
          <Card 
            key={level.id}
            className={`${level.bgColor} border-2 border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group`}
            onClick={() => onLevelSelect(level.id as GameLevel)}
          >
            <div className="p-8 text-center relative overflow-hidden">
              {/* Completion Badge */}
              {level.completed && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}

              {/* Planet/Station Icon */}
              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                <level.icon className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{level.title}</h3>
              <p className="text-white/80 mb-6">{level.description}</p>

              <Button 
                className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-lg`}
              >
                {level.completed ? 'Replay Mission' : 'Start Mission'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Central Rocket Animation */}
      <div className="flex justify-center mt-12">
        <div className="relative">
          <Rocket className="w-16 h-16 text-yellow-400 animate-bounce" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-orange-500 to-transparent rounded-full opacity-60 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
