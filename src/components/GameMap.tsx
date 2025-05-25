import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rocket, Calculator, Zap, Shapes, Atom, Sparkles } from 'lucide-react';
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
      difficulty: 'Beginner',
      emoji: '🪐'
    },
    {
      id: 'algebra',
      title: 'Star Gate Alpha',
      description: 'Unlock multiple star gates by solving algebraic equations',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      completed: playerStats.levelsCompleted.includes('algebra'),
      difficulty: 'Intermediate',
      emoji: '⭐'
    },
    {
      id: 'geometry',
      title: 'Satellite Station',
      description: 'Repair satellite systems using geometry and area calculations',
      icon: Shapes,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
      completed: playerStats.levelsCompleted.includes('geometry'),
      difficulty: 'Intermediate',
      emoji: '🛰️'
    },
    {
      id: 'physics',
      title: 'Reactor Station',
      description: 'Save the space station by calculating velocity and physics',
      icon: Atom,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
      completed: playerStats.levelsCompleted.includes('physics'),
      difficulty: 'Advanced',
      emoji: '⚛️'
    }
  ];

  const totalLevels = levels.length;
  const completedLevels = playerStats.levelsCompleted.length;
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="animate-bounce-gentle mb-4">
          <h2 className="text-3xl font-bold text-white mb-4 animate-gradient-x bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🌌 Choose Your Mission
          </h2>
        </div>
        <p className="text-cyan-200 text-lg mb-6 animate-fade-in-delayed">
          Explore the galaxy and master STEM concepts through exciting adventures!
        </p>
        
        {/* Enhanced Overall Progress */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto mb-8 hover:bg-white/15 transition-all duration-300 animate-glow-subtle">
          <div className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <h3 className="text-white font-bold">Mission Progress</h3>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-2000 animate-shimmer"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-cyan-200 text-sm mt-2 animate-pulse">
              {completedLevels}/{totalLevels} Missions Complete
            </p>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {levels.map((level, index) => (
          <Card 
            key={level.id}
            className={`${level.bgColor} border-2 border-white/20 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-500 cursor-pointer group relative overflow-hidden animate-slide-up hover:shadow-2xl hover:shadow-purple-500/25`}
            style={{ animationDelay: `${index * 200}ms` }}
            onClick={() => onLevelSelect(level.id as GameLevel)}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <div className="p-6 text-center relative z-10">
              {/* Completion Badge */}
              {level.completed && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                  <span className="text-white text-sm animate-pulse">✓</span>
                </div>
              )}

              {/* Difficulty Badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold transition-all duration-300 group-hover:scale-110 ${
                level.difficulty === 'Beginner' ? 'bg-green-500/80 text-white' :
                level.difficulty === 'Intermediate' ? 'bg-yellow-500/80 text-black' :
                'bg-red-500/80 text-white'
              }`}>
                {level.difficulty}
              </div>

              {/* Enhanced Planet/Station Icon */}
              <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent animate-pulse"></div>
                <level.icon className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
                <div className="absolute text-2xl animate-bounce-gentle" style={{ top: '-5px', right: '-5px' }}>
                  {level.emoji}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors duration-300">
                {level.title}
              </h3>
              <p className="text-white/80 text-sm mb-4 min-h-[3rem] group-hover:text-white transition-colors duration-300">
                {level.description}
              </p>

              <Button 
                className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white font-semibold py-2 rounded-lg shadow-lg text-sm hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <span className="animate-pulse mr-2">
                  {level.completed ? '🔄' : '🚀'}
                </span>
                {level.completed ? 'Replay Mission' : 'Start Mission'}
                <span className="animate-pulse ml-2">✨</span>
              </Button>
              
              {level.completed && (
                <p className="text-green-300 text-xs mt-2 font-semibold animate-glow">
                  ✨ Mission Complete! ✨
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Motivational Messages */}
      <div className="text-center mt-12 animate-fade-in-delayed">
        {completedLevels === 0 && (
          <Card className="bg-blue-500/20 border-blue-400/30 backdrop-blur-sm max-w-md mx-auto animate-pulse-glow">
            <div className="p-4">
              <p className="text-white">🌟 Start your adventure! Choose any mission to begin your STEM journey!</p>
            </div>
          </Card>
        )}
        
        {completedLevels === 1 && (
          <Card className="bg-green-500/20 border-green-400/30 backdrop-blur-sm max-w-md mx-auto animate-pulse-glow">
            <div className="p-4">
              <p className="text-white">🎉 Great start! You've completed your first mission. Ready for the next challenge?</p>
            </div>
          </Card>
        )}
        
        {completedLevels === 2 && (
          <Card className="bg-yellow-500/20 border-yellow-400/30 backdrop-blur-sm max-w-md mx-auto animate-pulse-glow">
            <div className="p-4">
              <p className="text-white">🔥 You're on fire! Halfway through your space adventure!</p>
            </div>
          </Card>
        )}
        
        {completedLevels === 3 && (
          <Card className="bg-purple-500/20 border-purple-400/30 backdrop-blur-sm max-w-md mx-auto animate-pulse-glow">
            <div className="p-4">
              <p className="text-white">⚡ Almost there! One final mission awaits!</p>
            </div>
          </Card>
        )}
        
        {completedLevels === totalLevels && (
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 backdrop-blur-sm max-w-md mx-auto animate-celebration">
            <div className="p-4">
              <p className="text-white">🏆 LEGEND! You've mastered all STEM missions! You're now a true Space Explorer!</p>
            </div>
          </Card>
        )}
      </div>

      {/* Enhanced Central Rocket Animation */}
      <div className="flex justify-center mt-8 animate-fade-in-delayed">
        <div className="relative animate-float">
          <Rocket className="w-16 h-16 text-yellow-400 animate-bounce drop-shadow-2xl" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-orange-500 via-red-500 to-transparent rounded-full opacity-80 animate-flicker"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-blue-400 to-transparent rounded-full opacity-60 animate-flicker" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
