import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Zap, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
interface AlgebraLevelProps {
  onBack: () => void;
  onComplete: (points: number, badge: string) => void;
}
export const AlgebraLevel: React.FC<AlgebraLevelProps> = ({
  onBack,
  onComplete
}) => {
  const [stage, setStage] = useState(1);
  const [problem, setProblem] = useState({
    variable: 'x',
    coefficient: 1,
    constant: 5,
    result: 8
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [storyText, setStoryText] = useState('');
  const storyStages = ["🌌 You've reached the Star Gate Alpha! But it's locked with an algebra code...", "⚡ First gate opened! But there are more security layers ahead!", "🔓 Excellent! One final equation stands between you and the stars!", "🌟 All gates unlocked! You've mastered the algebra of the cosmos!"];
  const generateProblem = () => {
    const variables = ['x', 'y', 'z'];
    const variable = variables[Math.floor(Math.random() * variables.length)];
    let coefficient, constant, varValue;

    // Increase difficulty by stage
    if (stage === 1) {
      coefficient = 1;
      constant = Math.floor(Math.random() * 5) + 1;
      varValue = Math.floor(Math.random() * 5) + 1;
    } else if (stage === 2) {
      coefficient = Math.floor(Math.random() * 2) + 1;
      constant = Math.floor(Math.random() * 10) + 1;
      varValue = Math.floor(Math.random() * 8) + 1;
    } else {
      coefficient = Math.floor(Math.random() * 3) + 1;
      constant = Math.floor(Math.random() * 15) + 1;
      varValue = Math.floor(Math.random() * 10) + 1;
    }
    const result = coefficient * varValue + constant;
    setProblem({
      variable,
      coefficient,
      constant,
      result
    });
    setStoryText(storyStages[Math.min(stage - 1, 3)]);
  };
  useEffect(() => {
    generateProblem();
  }, [stage]);
  const calculateAnswer = () => {
    const {
      coefficient,
      constant,
      result
    } = problem;
    return (result - constant) / coefficient;
  };
  const checkAnswer = () => {
    const correct = calculateAnswer();
    const userNum = parseInt(userAnswer);
    if (userNum === correct) {
      setGateUnlocked(true);
      if (stage < 3) {
        toast.success(`🎉 Gate ${stage} Unlocked! Proceeding to next security layer...`);
        setTimeout(() => {
          setStage(prev => prev + 1);
          setUserAnswer('');
          setAttempts(0);
          setShowHint(false);
          setGateUnlocked(false);
        }, 2000);
      } else {
        toast.success("⚡ All Star Gates Unlocked! You're now an Algebra Master!");
        setTimeout(() => {
          onComplete(150, 'Algebra Ace');
        }, 2000);
      }
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      toast.error("Gate remains locked. Check your calculation!");
    }
  };
  const NumberLine = () => {
    const correct = calculateAnswer();
    const range = Math.max(10, correct + 5);
    const numbers = Array.from({
      length: range + 1
    }, (_, i) => i);
    return <div className="w-full overflow-x-auto">
        <div className="flex items-center min-w-max px-4">
          {numbers.map(num => <div key={num} className="flex flex-col items-center mx-2">
              <div className={`w-3 h-8 ${num === correct ? 'bg-green-400' : 'bg-white/30'} rounded`} />
              <span className="text-white text-sm mt-1">{num}</span>
            </div>)}
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
            <h1 className="text-3xl font-bold text-white">Star Gate Alpha</h1>
            <p className="text-cyan-200">Security Layer {stage} of 3</p>
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
        <Card className="bg-blue-500/20 border-blue-400/30 backdrop-blur-sm mb-8">
          <div className="p-6 text-center">
            {gateUnlocked ? <Unlock className="w-12 h-12 text-green-400 mx-auto mb-4" /> : <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />}
            <h2 className="text-2xl font-bold text-white mb-2">
              {gateUnlocked ? 'Star Gate Unlocked!' : 'Unlock the Star Gate'}
            </h2>
            <p className="text-white/80">Solve the equation to find the gate's unlock code.</p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem & Visualization */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Algebra Equation</h3>
              
              {/* Problem */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-white mb-4">
                  {problem.coefficient > 1 ? problem.coefficient : ''}{problem.variable} + {problem.constant} = {problem.result}
                </div>
                <p className="text-cyan-200">Find the value of {problem.variable}</p>
              </div>

              {/* Number Line Visualization */}
              <div className="space-y-4">
                <p className="text-white text-center mb-4">Number Line (correct answer highlighted):</p>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <NumberLine />
                </div>
              </div>
            </div>
          </Card>

          {/* Answer Input & Gate Status */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Gate Control</h3>
              
              {/* Gate Visual */}
              <div className="mb-8 text-center">
                <div className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${gateUnlocked ? 'border-green-400 bg-green-400/20 animate-pulse' : 'border-blue-400 bg-blue-400/20'}`}>
                  {gateUnlocked ? <Unlock className="w-16 h-16 text-green-400" /> : <Lock className="w-16 h-16 text-blue-400" />}
                </div>
                <p className="text-white mt-4">
                  {gateUnlocked ? 'Gate Status: UNLOCKED' : 'Gate Status: LOCKED'}
                </p>
              </div>

              {/* Answer Input */}
              <div className="space-y-4">
                <div className="text-center">
                  <label className="text-white block mb-2">Enter value for {problem.variable}:</label>
                  <Input type="number" placeholder={`${problem.variable} = ?`} value={userAnswer} onChange={e => setUserAnswer(e.target.value)} className="w-32 mx-auto text-center bg-white/20 border-white/30 text-white text-xl" />
                </div>

                <Button onClick={checkAnswer} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3" disabled={!userAnswer}>
                  <Zap className="w-4 h-4 mr-2" />
                  Unlock Gate!
                </Button>

                <Button onClick={generateProblem} className="w-full bg-slate-600 hover:bg-slate-500 text-white border-slate-400">
                  New Equation
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
                      To solve {problem.coefficient > 1 ? problem.coefficient : ''}{problem.variable} + {problem.constant} = {problem.result}, 
                      subtract {problem.constant} from both sides first!
                      <br />
                      {problem.result} - {problem.constant} = {problem.result - problem.constant}
                    </p>
                  </div>
                </Card>}
            </div>
          </Card>
        </div>
      </div>
    </div>;
};