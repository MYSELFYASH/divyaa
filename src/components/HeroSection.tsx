import React, { useState, useEffect } from 'react';
import { Play, Zap, Trophy, Users, BookOpen, Shield, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  onStartLevel: (level: number) => void;
  gameState: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartLevel, gameState }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const levels = [
    {
      id: 1,
      title: 'The Debate Club Trial',
      description: 'Learn the 3 basic roles: Moderator, Speaker 1, Speaker 2',
      icon: Users,
      color: 'from-neon-blue-400 to-neon-blue-600',
      unlocked: true,
      completed: gameState.level1XP >= 30
    },
    {
      id: 2,
      title: 'Rules of the Round',
      description: 'Identify when rules are violated in mock debates',
      icon: BookOpen,
      color: 'from-chalk-green-400 to-chalk-green-600',
      unlocked: gameState.level1XP >= 30,
      completed: gameState.level2XP >= 30
    },
    {
      id: 3,
      title: 'Rebuttal Rescue',
      description: 'Craft strong rebuttals and evaluate opponent logic',
      icon: Shield,
      color: 'from-warm-orange-400 to-warm-orange-600',
      unlocked: gameState.level2XP >= 30,
      completed: gameState.level3XP >= 40
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 neon-text text-chalk-green-400">
              DEBATE QUEST
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-warm-orange-400 mb-4">
              The Basics Battle
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Train Your Mind. Earn Your Voice. Master the art of rebuttals, structure powerful arguments, 
              and become a persuasive powerhouse — one level at a time.
            </p>
          </div>

          {/* Animated XP Preview */}
          <div className="glass-card rounded-2xl p-6 max-w-md mx-auto mb-8 border border-chalk-green-400/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-chalk-green-400 font-semibold">Total XP</span>
              <span className="text-2xl font-bold text-white">{gameState.totalXP}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-chalk-green-400 to-neon-blue-400 h-3 rounded-full transition-all duration-1000 glow-effect"
                style={{ width: `${Math.min((gameState.totalXP / 100) * 100, 100)}%` }}
              />
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Level {Math.floor(gameState.totalXP / 100) + 1}
            </div>
          </div>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {levels.map((level, index) => {
            const IconComponent = level.icon;
            
            return (
              <div
                key={level.id}
                className={`
                  glass-card rounded-3xl p-8 border transition-all duration-500 hover:scale-105
                  ${level.unlocked 
                    ? 'border-chalk-green-400/30 cursor-pointer hover:border-chalk-green-400/60' 
                    : 'border-gray-600/30 opacity-50'
                  }
                  ${level.completed ? 'bg-gradient-to-br from-chalk-green-900/20 to-neon-blue-900/20' : ''}
                  ${isVisible ? 'slide-in' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => level.unlocked && onStartLevel(level.id)}
              >
                <div className="text-center">
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6
                    bg-gradient-to-br ${level.color} glow-effect
                  `}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="font-orbitron text-xl font-bold mb-3 text-white">
                    Level {level.id}
                  </h3>
                  <h4 className="text-lg font-semibold mb-3 text-chalk-green-400">
                    {level.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {level.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-warm-orange-400" />
                    <span className="text-warm-orange-400 font-semibold">
                      {level.id === 3 ? '40' : '30'} XP
                    </span>
                  </div>
                  
                  {level.completed && (
                    <div className="flex items-center justify-center gap-2 text-chalk-green-400">
                      <Trophy className="w-5 h-5" />
                      <span className="font-semibold">Completed</span>
                    </div>
                  )}
                  
                  {!level.unlocked && (
                    <div className="text-gray-500 text-sm">
                      Complete previous level to unlock
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => onStartLevel(1)}
            className="bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 glow-effect neon-text"
          >
            <Play className="w-6 h-6 inline mr-3" />
            Start Your Journey
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>AI Mentor Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Earn Badges & XP</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Retake & Improve</span>
            </div>
          </div>
        </div>

        {/* Progress Roadmap */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="font-orbitron text-2xl font-bold text-center mb-8 text-chalk-green-400">
            Your Learning Path
          </h3>
          <div className="flex items-center justify-between">
            {levels.map((level, index) => (
              <React.Fragment key={level.id}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold
                    ${level.completed 
                      ? 'bg-chalk-green-500 text-white' 
                      : level.unlocked 
                        ? 'bg-warm-orange-500 text-white' 
                        : 'bg-gray-600 text-gray-400'
                    }
                  `}>
                    {level.completed ? <Trophy className="w-6 h-6" /> : level.id}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 text-center max-w-20">
                    {level.title.split(' ')[0]}
                  </div>
                </div>
                {index < levels.length - 1 && (
                  <div className={`
                    flex-1 h-1 mx-4
                    ${levels[index + 1].unlocked ? 'bg-chalk-green-500' : 'bg-gray-600'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;