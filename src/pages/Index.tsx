import React, { useState } from 'react';
import { GameMap } from '@/components/GameMap';
import { FractionLevel } from '@/components/levels/FractionLevel';
import { AlgebraLevel } from '@/components/levels/AlgebraLevel';
import { GeometryLevel } from '@/components/levels/GeometryLevel';
import { PhysicsLevel } from '@/components/levels/PhysicsLevel';
import { ProgressTracker } from '@/components/ProgressTracker';
import { About } from '@/components/About';
import { FloatingSpaceElements } from '@/components/FloatingSpaceElements';
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
      {/* 3D Floating Space Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingSpaceElements />
      </div>

      {/* Enhanced animated star background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Star 
              className="text-white opacity-30"
              style={{
                fontSize: `${Math.random() * 12 + 4}px`,
                filter: `hue-rotate(${Math.random() * 360}deg)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div className={`w-4 h-4 bg-gradient-to-r ${
              i % 4 === 0 ? 'from-cyan-400 to-blue-500' :
              i % 4 === 1 ? 'from-green-400 to-emerald-500' :
              i % 4 === 2 ? 'from-purple-400 to-pink-500' :
              'from-yellow-400 to-orange-500'
            } opacity-20 ${
              i % 3 === 0 ? 'rounded-full' : 
              i % 3 === 1 ? 'rotate-45' : 
              'clip-path-triangle'
            }`} />
          </div>
        ))}
      </div>

      {/* Header with enhanced animations */}
      <header className="relative z-10 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2 animate-bounce-gentle">
          <div className="animate-spin-slow">
            <Rocket className="text-yellow-400 w-8 h-8 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
            STEM Explorer
          </h1>
          <div className="animate-pulse-glow">
            <Target className="text-green-400 w-8 h-8 drop-shadow-lg" />
          </div>
        </div>
        <p className="text-cyan-200 text-lg animate-fade-in-up">Math & Physics Mission</p>
      </header>

      {/* Progress Tracker */}
      {currentLevel === 'map' && (
        <div className="relative z-10 px-6 animate-slide-up">
          <ProgressTracker playerStats={playerStats} />
        </div>
      )}

      {/* Main Game Area */}
      <main className="relative z-10 flex-1 animate-fade-in">
        {renderCurrentLevel()}
      </main>

      {/* Enhanced About Button */}
      {currentLevel === 'map' && (
        <div className="fixed bottom-6 right-6 z-20 animate-bounce-gentle">
          <Button 
            onClick={() => setCurrentLevel('about')}
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-full px-6 py-3 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 animate-glow"
          >
            <span className="animate-pulse">🌟</span>
            About STEM
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
