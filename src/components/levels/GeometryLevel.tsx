
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Wrench, Satellite } from 'lucide-react';
import { toast } from 'sonner';

interface GeometryLevelProps {
  onBack: () => void;
  onComplete: (points: number, badge: string) => void;
}

export const GeometryLevel: React.FC<GeometryLevelProps> = ({ onBack, onComplete }) => {
  const [problem, setProblem] = useState({ base: 8, height: 6 });
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [repairProgress, setRepairProgress] = useState(0);

  const generateProblem = () => {
    const base = Math.floor(Math.random() * 8) + 4; // 4-12
    const height = Math.floor(Math.random() * 8) + 3; // 3-11
    setProblem({ base, height });
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const calculateAnswer = () => {
    return (problem.base * problem.height) / 2;
  };

  const checkAnswer = () => {
    const correct = calculateAnswer();
    const userNum = parseFloat(userAnswer);

    if (userNum === correct) {
      setRepairProgress(100);
      toast.success("🛰️ Satellite Repaired! Outstanding geometry skills!");
      setTimeout(() => {
        onComplete(100, 'Geometry Guru');
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      toast.error("Repair incomplete. Check your area calculation!");
    }
  };

  const TriangleVisual = () => {
    const scale = 12; // Scale factor for visualization
    return (
      <div className="flex justify-center">
        <svg width="300" height="200" className="border border-white/30 rounded bg-slate-800/30">
          {/* Grid lines */}
          {[...Array(21)].map((_, i) => (
            <g key={i}>
              <line 
                x1={i * 15} y1="0" x2={i * 15} y2="200" 
                stroke="rgba(255,255,255,0.1)" strokeWidth="1"
              />
              <line 
                x1="0" y1={i * 10} x2="300" y2={i * 10} 
                stroke="rgba(255,255,255,0.1)" strokeWidth="1"
              />
            </g>
          ))}
          
          {/* Triangle */}
          <polygon
            points={`50,150 ${50 + problem.base * scale},150 ${50 + (problem.base * scale) / 2},${150 - problem.height * scale}`}
            fill="rgba(34, 197, 94, 0.3)"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3"
          />
          
          {/* Base line */}
          <line 
            x1="50" y1="150" 
            x2={50 + problem.base * scale} y2="150" 
            stroke="rgb(59, 130, 246)" strokeWidth="3"
          />
          
          {/* Height line */}
          <line 
            x1={50 + (problem.base * scale) / 2} y1="150" 
            x2={50 + (problem.base * scale) / 2} y2={150 - problem.height * scale} 
            stroke="rgb(239, 68, 68)" strokeWidth="3" 
            strokeDasharray="5,5"
          />
          
          {/* Labels */}
          <text x={50 + (problem.base * scale) / 2} y="170" fill="rgb(59, 130, 246)" textAnchor="middle" fontSize="14" fontWeight="bold">
            base = {problem.base}
          </text>
          <text x={30 + (problem.base * scale) / 2} y={150 - (problem.height * scale) / 2} fill="rgb(239, 68, 68)" textAnchor="middle" fontSize="14" fontWeight="bold">
            height = {problem.height}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" className="text-white border-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
          <h1 className="text-3xl font-bold text-white">Satellite Station</h1>
          <div className="w-24"></div>
        </div>

        {/* Mission Briefing */}
        <Card className="bg-green-500/20 border-green-400/30 backdrop-blur-sm mb-8">
          <div className="p-6 text-center">
            <Satellite className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Repair the Satellite!</h2>
            <p className="text-white/80">Calculate the area of the triangular solar panel to fix the satellite.</p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem & Visualization */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Triangle Area Calculation</h3>
              
              {/* Problem */}
              <div className="text-center mb-6">
                <p className="text-white text-lg mb-4">
                  Find the area of this triangular solar panel:
                </p>
                <div className="text-2xl font-bold text-white mb-6">
                  Base = {problem.base} units<br />
                  Height = {problem.height} units
                </div>
              </div>

              {/* Triangle Visualization */}
              <div className="space-y-4">
                <TriangleVisual />
                <div className="text-center">
                  <p className="text-cyan-200 text-sm">
                    Formula: Area = (base × height) ÷ 2
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Answer Input & Repair Status */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Repair Console</h3>
              
              {/* Repair Progress */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-green-400" />
                  <span className="text-white">Repair Progress: {repairProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${repairProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Satellite Status */}
              <div className="mb-8 text-center">
                <div className={`w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                  repairProgress === 100 
                    ? 'border-green-400 bg-green-400/20 animate-pulse' 
                    : 'border-red-400 bg-red-400/20'
                }`}>
                  <Satellite className={`w-12 h-12 ${repairProgress === 100 ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <p className="text-white mt-4">
                  {repairProgress === 100 ? 'Satellite: OPERATIONAL' : 'Satellite: DAMAGED'}
                </p>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                <div className="text-center">
                  <label className="text-white block mb-2">Area (square units):</label>
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="Enter area"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-32 mx-auto text-center bg-white/20 border-white/30 text-white text-xl"
                  />
                </div>

                <Button 
                  onClick={checkAnswer}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3"
                  disabled={!userAnswer}
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Repair Satellite!
                </Button>

                <Button 
                  onClick={generateProblem}
                  variant="outline"
                  className="w-full text-white border-white/30"
                >
                  New Solar Panel
                </Button>
              </div>

              {/* Hint System */}
              {showHint && (
                <Card className="mt-6 bg-yellow-500/20 border-yellow-400/30">
                  <div className="p-4">
                    <h4 className="text-yellow-400 font-bold mb-2">🔍 Hint:</h4>
                    <p className="text-white text-sm">
                      For a triangle, the area formula is: <strong>(base × height) ÷ 2</strong>
                      <br />
                      So: ({problem.base} × {problem.height}) ÷ 2 = ?
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
