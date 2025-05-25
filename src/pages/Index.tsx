
import React, { useState } from 'react';
import { GameMap } from '@/components/GameMap';
import { FractionLevel } from '@/components/levels/FractionLevel';
import { AlgebraLevel } from '@/components/levels/AlgebraLevel';
import { GeometryLevel } from '@/components/levels/GeometryLevel';
import { PhysicsLevel } from '@/components/levels/PhysicsLevel';
import { ProgressTracker } from '@/components/ProgressTracker';
import { About } from '@/components/About';
import { Button } from '@/components/ui/button';
import { Rocket, Star, Target } from 'lucide-react';

export type GameLevel = 'map' | 'fractions' | 'algebra' | 'geometry' | 'physics' | 'about';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState<GameLevel>('map');
  const [playerStats, setPlayerStats] = useState({
    score: 0,
    badges: [] as string[],
    levelsCompleted: [] as string[]
  });

  const updatePlayerStats = (points: number, badge?: string, levelCompleted?: string) => {
    setPlayerStats(prev => ({
      score: prev.score + points,
      badges: badge && !prev.badges.includes(badge) ? [...prev.badges, badge] : prev.badges,
      levelsCompleted: levelCompleted && !prev.levelsCompleted.includes(levelCompleted) 
        ? [...prev.levelsCompleted, levelCompleted] : prev.levelsCompleted
    }));
  };

  const renderCurrentLevel = () => {
    switch (currentLevel) {
      case 'fractions':
        return (
          <FractionLevel 
            onBack={() => setCurrentLevel('map')}
            onComplete={(points, badge) => {
              updatePlayerStats(points, badge, 'fractions');
              setCurrentLevel('map');
            }}
          />
        );
      case 'algebra':
        return (
          <AlgebraLevel 
            onBack={() => setCurrentLevel('map')}
            onComplete={(points, badge) => {
              updatePlayerStats(points, badge, 'algebra');
              setCurrentLevel('map');
            }}
          />
        );
      case 'geometry':
        return (
          <GeometryLevel 
            onBack={() => setCurrentLevel('map')}
            onComplete={(points, badge) => {
              updatePlayerStats(points, badge, 'geometry');
              setCurrentLevel('map');
            }}
          />
        );
      case 'physics':
        return (
          <PhysicsLevel 
            onBack={() => setCurrentLevel('map')}
            onComplete={(points, badge) => {
              updatePlayerStats(points, badge, 'physics');
              setCurrentLevel('map');
            }}
          />
        );
      case 'about':
        return <About onBack={() => setCurrentLevel('map')} />;
      default:
        return (
          <GameMap 
            onLevelSelect={setCurrentLevel}
            playerStats={playerStats}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated star background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Star 
            key={i}
            className={`absolute text-white opacity-20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 4}px`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Rocket className="text-yellow-400 w-8 h-8" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            STEM Explorer
          </h1>
          <Target className="text-green-400 w-8 h-8" />
        </div>
        <p className="text-cyan-200 text-lg">Math & Physics Mission</p>
      </header>

      {/* Progress Tracker */}
      {currentLevel === 'map' && (
        <div className="relative z-10 px-6">
          <ProgressTracker playerStats={playerStats} />
        </div>
      )}

      {/* Main Game Area */}
      <main className="relative z-10 flex-1">
        {renderCurrentLevel()}
      </main>

      {/* About Button */}
      {currentLevel === 'map' && (
        <div className="fixed bottom-6 right-6 z-20">
          <Button 
            onClick={() => setCurrentLevel('about')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-6 py-3 shadow-lg"
          >
            About STEM
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
