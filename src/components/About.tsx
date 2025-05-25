
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Code, Calculator, Shapes, Zap } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <Button onClick={onBack} variant="outline" className="text-white border-white/20 bg-stone-600 hover:bg-stone-500 hover:scale-105 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
          <h1 className="text-3xl font-bold text-white animate-gradient-x bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            STEM Behind the Game
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Introduction */}
        <Card className="bg-purple-500/20 border-purple-400/30 backdrop-blur-sm mb-8 hover:scale-105 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 animate-slide-up">
          <div className="p-6 text-center">
            <Code className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-bounce-gentle" />
            <h2 className="text-2xl font-bold text-white mb-4">How Technology Powers Learning</h2>
            <p className="text-white/80 text-lg">
              Discover how coding, mathematics, and engineering work together to create this educational experience!
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Science & Technology */}
          <Card className="bg-blue-500/20 border-blue-400/30 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 animate-slide-up group" style={{ animationDelay: '200ms' }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-8 h-8 text-blue-400 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-300">Science & Technology</h3>
              </div>
              
              <div className="space-y-4 text-white/80 group-hover:text-white transition-colors duration-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">JavaScript Functions:</h4>
                  <code className="text-green-300 text-sm bg-black/30 px-2 py-1 rounded block hover:bg-black/50 transition-colors duration-300">
                    function calculateAnswer() {`{`}<br />
                    &nbsp;&nbsp;return (base * height) / 2;<br />
                    {`}`}
                  </code>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Visual Rendering:</h4>
                  <p>SVG graphics dynamically render mathematical shapes and fraction bars using coordinate geometry.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Real-time Feedback:</h4>
                  <p>Conditional logic provides instant hints and progress tracking based on user performance.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Engineering */}
          <Card className="bg-orange-500/20 border-orange-400/30 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/25 animate-slide-up group" style={{ animationDelay: '400ms' }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-orange-400 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors duration-300">Engineering</h3>
              </div>
              
              <div className="space-y-4 text-white/80 group-hover:text-white transition-colors duration-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Problem-Solving Design:</h4>
                  <p>Each level follows engineering principles: identify the problem, apply mathematical solutions, and validate results.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">User Interface Design:</h4>
                  <p>Carefully engineered user experience with intuitive controls, visual feedback, and progressive difficulty.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">System Architecture:</h4>
                  <p>Component-based design allows modular development and easy addition of new mathematical concepts.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Mathematics */}
          <Card className="bg-green-500/20 border-green-400/30 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/25 animate-slide-up group" style={{ animationDelay: '600ms' }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-8 h-8 text-green-400 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-white group-hover:text-green-200 transition-colors duration-300">Mathematics</h3>
              </div>
              
              <div className="space-y-4 text-white/80 group-hover:text-white transition-colors duration-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Fractions:</h4>
                  <p>Addition with common denominators, visual representation using proportional graphics.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Algebra:</h4>
                  <p>Linear equations solved through inverse operations, visualized on interactive number lines.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Geometry:</h4>
                  <p>Area calculations for triangles using the formula A = (base × height) ÷ 2, rendered with scale.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Educational Impact */}
          <Card className="bg-purple-500/20 border-purple-400/30 backdrop-blur-sm hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 animate-slide-up group" style={{ animationDelay: '800ms' }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shapes className="w-8 h-8 text-purple-400 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">Educational Impact</h3>
              </div>
              
              <div className="space-y-4 text-white/80 group-hover:text-white transition-colors duration-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Visual Learning:</h4>
                  <p>Mathematical concepts become tangible through interactive visualizations and immediate feedback.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Gamification:</h4>
                  <p>Points, badges, and story progression motivate continued learning and skill development.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Cross-Curricular Connections:</h4>
                  <p>Students see how coding skills directly support mathematical problem-solving and scientific thinking.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Technical Features */}
        <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 backdrop-blur-sm mt-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 animate-fade-in-delayed">
          <div className="p-6 bg-emerald-600">
            <h3 className="text-2xl font-bold text-white mb-4 text-center animate-bounce-gentle">Key Technical Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-white/80">
              <div className="text-center group">
                <div className="w-12 h-12 bg-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Dynamic Generation</h4>
                <p className="text-sm">Problems are randomly generated using mathematical algorithms for endless practice.</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Smart Hints</h4>
                <p className="text-sm">AI-like hint system uses conditional logic to provide contextual help when needed.</p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Shapes className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="font-bold text-white mb-2">Interactive Visuals</h4>
                <p className="text-sm">SVG-based graphics render mathematical concepts in real-time with user input.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
