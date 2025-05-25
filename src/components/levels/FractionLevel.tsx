
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Rocket, Fuel } from 'lucide-react';
import { toast } from 'sonner';

interface FractionLevelProps {
  onBack: () => void;
  onComplete: (points: number, badge: string) => void;
}

export const FractionLevel: React.FC<FractionLevelProps> = ({ onBack, onComplete }) => {
  const [problem, setProblem] = useState({ num1: 1, den1: 4, num2: 1, den2: 2 });
  const [userAnswer, setUserAnswer] = useState({ numerator: '', denominator: '' });
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [fuelLevel, setFuelLevel] = useState(20);

  const generateProblem = () => {
    const fractions = [
      { num: 1, den: 2 }, { num: 1, den: 3 }, { num: 1, den: 4 }, 
      { num: 2, den: 3 }, { num: 3, den: 4 }, { num: 1, den: 6 }
    ];
    const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
    const frac2 = fractions[Math.floor(Math.random() * fractions.length)];
    
    setProblem({ num1: frac1.num, den1: frac1.den, num2: frac2.num, den2: frac2.den });
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const calculateAnswer = () => {
    const { num1, den1, num2, den2 } = problem;
    // Find common denominator
    const lcm = (den1 * den2) / gcd(den1, den2);
    const newNum1 = (num1 * lcm) / den1;
    const newNum2 = (num2 * lcm) / den2;
    const resultNum = newNum1 + newNum2;
    
    // Simplify the fraction
    const commonFactor = gcd(resultNum, lcm);
    return { numerator: resultNum / commonFactor, denominator: lcm / commonFactor };
  };

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const checkAnswer = () => {
    const correct = calculateAnswer();
    const userNum = parseInt(userAnswer.numerator);
    const userDen = parseInt(userAnswer.denominator);

    if (userNum === correct.numerator && userDen === correct.denominator) {
      setFuelLevel(100);
      toast.success("🚀 Excellent! Spaceship fueled and ready for launch!");
      setTimeout(() => {
        onComplete(100, 'Fraction Star');
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      toast.error("Not quite right. Try again!");
    }
  };

  const FractionBar = ({ numerator, denominator, color }: { numerator: number, denominator: number, color: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex border-2 border-white rounded">
        {[...Array(denominator)].map((_, i) => (
          <div
            key={i}
            className={`w-8 h-12 border-r border-white last:border-r-0 ${
              i < numerator ? color : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-white font-bold">{numerator}/{denominator}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} variant="outline" className="text-white border-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
          <h1 className="text-3xl font-bold text-white">Planet Fractia Mission</h1>
          <div className="w-24"></div>
        </div>

        {/* Mission Briefing */}
        <Card className="bg-orange-500/20 border-orange-400/30 backdrop-blur-sm mb-8">
          <div className="p-6 text-center">
            <Rocket className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Fuel the Spaceship!</h2>
            <p className="text-white/80">Add the fractions to calculate the fuel needed for launch.</p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem & Visualization */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Fraction Addition</h3>
              
              {/* Problem */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-white mb-4">
                  {problem.num1}/{problem.den1} + {problem.num2}/{problem.den2} = ?
                </div>
              </div>

              {/* Visual Fraction Bars */}
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-white mb-4">First Fraction:</p>
                  <FractionBar numerator={problem.num1} denominator={problem.den1} color="bg-orange-400" />
                </div>
                
                <div className="text-center text-white text-2xl">+</div>
                
                <div className="text-center">
                  <p className="text-white mb-4">Second Fraction:</p>
                  <FractionBar numerator={problem.num2} denominator={problem.den2} color="bg-blue-400" />
                </div>
              </div>
            </div>
          </Card>

          {/* Answer Input & Fuel Gauge */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Your Answer</h3>
              
              {/* Fuel Gauge */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Fuel className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Fuel Level: {fuelLevel}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${fuelLevel}%` }}
                  ></div>
                </div>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Input
                    type="number"
                    placeholder="Numerator"
                    value={userAnswer.numerator}
                    onChange={(e) => setUserAnswer(prev => ({ ...prev, numerator: e.target.value }))}
                    className="w-24 text-center bg-white/20 border-white/30 text-white"
                  />
                  <span className="text-white text-2xl">/</span>
                  <Input
                    type="number"
                    placeholder="Denominator"
                    value={userAnswer.denominator}
                    onChange={(e) => setUserAnswer(prev => ({ ...prev, denominator: e.target.value }))}
                    className="w-24 text-center bg-white/20 border-white/30 text-white"
                  />
                </div>

                <Button 
                  onClick={checkAnswer}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3"
                  disabled={!userAnswer.numerator || !userAnswer.denominator}
                >
                  Add Fuel & Launch!
                </Button>

                <Button 
                  onClick={generateProblem}
                  variant="outline"
                  className="w-full text-white border-white/30"
                >
                  New Problem
                </Button>
              </div>

              {/* Hint System */}
              {showHint && (
                <Card className="mt-6 bg-yellow-500/20 border-yellow-400/30">
                  <div className="p-4">
                    <h4 className="text-yellow-400 font-bold mb-2">🔍 Hint:</h4>
                    <p className="text-white text-sm">
                      To add fractions, find a common denominator first! 
                      Convert {problem.num1}/{problem.den1} and {problem.num2}/{problem.den2} to have the same bottom number.
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
