
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rocket, Calculator, Zap, Shapes, Atom } from 'lucide-react';
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
      description: 'Fuel your spaceship by mastering fractions through 3 challenging stages',
      icon: Calculator,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      completed: playerStats.levelsCompleted.includes('fractions'),
      difficulty: 'Beginner'
    },
    {
      id: 'algebra',
      title: 'Star Gate Alpha',
      description: 'Unlock multiple star gates by solving algebraic equations',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      completed: playerStats.levelsCompleted.includes('algebra'),
      difficulty: 'Intermediate'
    },
    {
      id: 'geometry',
      title: 'Satellite Station',
      description: 'Repair satellite systems using geometry and area calculations',
      icon: Shapes,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      completed: playerStats.levelsCompleted.includes('geometry'),
      difficulty: 'Intermediate'
    },
    {
      id: 'physics',
      title: 'Reactor Station',
      description: 'Save the space station by calculating velocity and physics',
      icon: Atom,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
      completed: playerStats.levelsCompleted.includes('physics'),
      difficulty: 'Advanced'
    }
  ];

  const totalLevels = levels.length;
  const completedLevels = playerStats.levelsCompleted.length;
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">🌌 Choose Your Mission</h2>
        <p className="text-cyan-200 text-lg mb-6">Explore the galaxy and master STEM concepts through exciting adventures!</p>
        
        {/* Overall Progress */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto mb-8">
          <div className="p-4">
            <h3 className="text-white font-bold mb-2">Mission Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-cyan-200 text-sm mt-2">{completedLevels}/{totalLevels} Missions Complete</p>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {levels.map((level, index) => (
          <Card 
            key={level.id}
            className={`${level.bgColor} border-2 border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
            onClick={() => onLevelSelect(level.id as GameLevel)}
          >
            <div className="p-6 text-center relative">
              {/* Completion Badge */}
              {level.completed && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}

              {/* Difficulty Badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold ${
                level.difficulty === 'Beginner' ? 'bg-green-500/80 text-white' :
                level.difficulty === 'Intermediate' ? 'bg-yellow-500/80 text-black' :
                'bg-red-500/80 text-white'
              }`}>
                {level.difficulty}
              </div>

              {/* Planet/Station Icon */}
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                <level.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
              <p className="text-white/80 text-sm mb-4 min-h-[3rem]">{level.description}</p>

              <Button 
                className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white font-semibold py-2 rounded-lg shadow-lg text-sm`}
              >
                {level.completed ? '🔄 Replay Mission' : '🚀 Start Mission'}
              </Button>
              
              {level.completed && (
                <p className="text-green-300 text-xs mt-2 font-semibold">✨ Mission Complete!</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Motivational Messages */}
      <div className="text-center mt-12">
        {completedLevels === 0 && (
          <Card className="bg-blue-500/20 border-blue-400/30 backdrop-blur-sm max-w-md mx-auto">
            <div className="p-4">
              <p className="text-white">🌟 Start your adventure! Choose any mission to begin your STEM journey!</p>
            </div>
          </Card>
        )}
        
        {completedLevels === 1 && (
          <Card className="bg-green-500/20 border-green-400/30 backdrop-blur-sm max-w-md mx-auto">
            <div className="p-4">
              <p className="text-white">🎉 Great start! You've completed your first mission. Ready for the next challenge?</p>
            </div>
          </Card>
        )}
        
        {completedLevels === 2 && (
          <Card className="bg-yellow-500/20 border-yellow-400/30 backdrop-blur-sm max-w-md mx-auto">
            <div className="p-4">
              <p className="text-white">🔥 You're on fire! Halfway through your space adventure!</p>
            </div>
          </Card>
        )}
        
        {completedLevels === 3 && (
          <Card className="bg-purple-500/20 border-purple-400/30 backdrop-blur-sm max-w-md mx-auto">
            <div className="p-4">
              <p className="text-white">⚡ Almost there! One final mission awaits!</p>
            </div>
          </Card>
        )}
        
        {completedLevels === totalLevels && (
          <Card className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border-yellow-400/30 backdrop-blur-sm max-w-md mx-auto">
            <div className="p-4">
              <p className="text-white">🏆 LEGEND! You've mastered all STEM missions! You're now a true Space Explorer!</p>
            </div>
          </Card>
        )}
      </div>

      {/* Central Rocket Animation */}
      <div className="flex justify-center mt-8">
        <div className="relative">
          <Rocket className="w-16 h-16 text-yellow-400 animate-bounce" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-orange-500 to-transparent rounded-full opacity-60 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
