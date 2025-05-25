import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Zap, Atom, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
interface PhysicsLevelProps {
  onBack: () => void;
  onComplete: (points: number, badge: string) => void;
}
export const PhysicsLevel: React.FC<PhysicsLevelProps> = ({
  onBack,
  onComplete
}) => {
  const [stage, setStage] = useState(1);
  const [problem, setProblem] = useState({
    distance: 100,
    time: 10
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [powerLevel, setPowerLevel] = useState(0);
  const [storyText, setStoryText] = useState('');
  const storyStages = ["⚛️ The space station's reactor is failing! Calculate the velocity to stabilize it...", "🚀 Reactor core stabilizing! But we need more precise calculations!", "⚡ Almost there! One final velocity calculation to save the station!", "🌟 Reactor stabilized! You've mastered the physics of space travel!"];
  const generateProblem = () => {
    let distance, time;
    if (stage === 1) {
      distance = Math.floor(Math.random() * 50) + 50; // 50-100
      time = Math.floor(Math.random() * 5) + 5; // 5-10
    } else if (stage === 2) {
      distance = Math.floor(Math.random() * 100) + 100; // 100-200
      time = Math.floor(Math.random() * 10) + 10; // 10-20
    } else {
      distance = Math.floor(Math.random() * 200) + 200; // 200-400
      time = Math.floor(Math.random() * 20) + 15; // 15-35
    }
    setProblem({
      distance,
      time
    });
    setStoryText(storyStages[Math.min(stage - 1, 3)]);
  };
  useEffect(() => {
    generateProblem();
  }, [stage]);
  const calculateAnswer = () => {
    return problem.distance / problem.time;
  };
  const checkAnswer = () => {
    const correct = calculateAnswer();
    const userNum = parseFloat(userAnswer);
    if (Math.abs(userNum - correct) < 0.1) {
      // Allow small rounding differences
      const newPower = Math.min(powerLevel + 35, 100);
      setPowerLevel(newPower);
      if (stage < 3) {
        toast.success(`🎉 Reactor Core ${stage} Stabilized! Moving to next system...`);
        setTimeout(() => {
          setStage(prev => prev + 1);
          setUserAnswer('');
          setAttempts(0);
          setShowHint(false);
        }, 2000);
      } else {
        toast.success("⚛️ Space Station Saved! You're now a Physics Master!");
        setTimeout(() => {
          onComplete(150, 'Physics Prodigy');
        }, 2000);
      }
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      toast.error("Reactor unstable! Check your velocity calculation!");
    }
  };
  const VelocityVisual = () => {
    const velocity = calculateAnswer();
    const maxDistance = 400;
    const progress = problem.distance / maxDistance * 100;
    return <div className="space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-300">Start</span>
            <span className="text-green-300">Destination</span>
          </div>
          <div className="relative w-full h-8 bg-gray-700 rounded-full">
            <div className="absolute top-0 left-0 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000" style={{
            width: `${Math.min(progress, 100)}%`
          }}></div>
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              🚀
            </div>
          </div>
          <div className="text-center mt-2 text-white">
            Distance: {problem.distance}m | Time: {problem.time}s | Velocity: {velocity.toFixed(1)} m/s
          </div>
        </div>
      </div>;
  };
  return <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" className="bg-slate-700 hover:bg-slate-600 text-white border-slate-500 hover:border-slate-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Reactor Station</h1>
            <p className="text-cyan-200">System {stage} of 3</p>
          </div>
          <div className="w-24"></div>
        </div>

        {/* Story Card */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/30 backdrop-blur-sm mb-6">
          <div className="p-4 text-center bg-emerald-600">
            <p className="text-white text-lg font-medium">{storyText}</p>
          </div>
        </Card>

        {/* Mission Briefing */}
        <Card className="bg-purple-500/20 border-purple-400/30 backdrop-blur-sm mb-8">
          <div className="p-6 text-center">
            <Atom className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Stabilize the Reactor!</h2>
            <p className="text-white/80">Calculate velocity using distance and time to save the space station.</p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem & Visualization */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Velocity Calculation</h3>
              
              {/* Problem */}
              <div className="text-center mb-6">
                <p className="text-white text-lg mb-4">
                  Calculate the velocity needed:
                </p>
                <div className="text-2xl font-bold text-white mb-6">
                  Distance = {problem.distance} meters<br />
                  Time = {problem.time} seconds
                </div>
              </div>

              {/* Velocity Visualization */}
              <div className="space-y-4">
                <VelocityVisual />
                <div className="text-center">
                  <p className="text-cyan-200 text-sm">
                    Formula: Velocity = Distance ÷ Time
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Answer Input & Power Status */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Reactor Control</h3>
              
              {/* Power Level */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Power Level: {powerLevel}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-1000" style={{
                  width: `${powerLevel}%`
                }}></div>
                </div>
              </div>

              {/* Reactor Status */}
              <div className="mb-8 text-center">
                <div className={`w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${powerLevel === 100 ? 'border-green-400 bg-green-400/20 animate-pulse' : 'border-red-400 bg-red-400/20'}`}>
                  <Atom className={`w-12 h-12 ${powerLevel === 100 ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <p className="text-white mt-4">
                  {powerLevel === 100 ? 'Reactor: STABLE' : 'Reactor: CRITICAL'}
                </p>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                <div className="text-center">
                  <label className="text-white block mb-2">Velocity (m/s):</label>
                  <Input type="number" step="0.1" placeholder="Enter velocity" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} className="w-32 mx-auto text-center bg-white/20 border-white/30 text-white text-xl" />
                </div>

                <Button onClick={checkAnswer} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3" disabled={!userAnswer}>
                  <Zap className="w-4 h-4 mr-2" />
                  Stabilize Reactor!
                </Button>

                <Button onClick={generateProblem} className="w-full bg-slate-600 hover:bg-slate-500 text-white border-slate-400">
                  New Calculation
                </Button>
              </div>

              {/* Hint System */}
              {showHint && <Card className="mt-6 bg-yellow-500/20 border-yellow-400/30">
                  <div className="p-4">
                    <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Hint:
                    </h4>
                    <p className="text-white text-sm">
                      Velocity = Distance ÷ Time
                      <br />
                      So: {problem.distance} ÷ {problem.time} = ?
                    </p>
                  </div>
                </Card>}
            </div>
          </Card>
        </div>
      </div>
    </div>;
};