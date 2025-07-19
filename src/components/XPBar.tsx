import React from 'react';
import { Zap, Star } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  level: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, level }) => {
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const progressInLevel = currentXP - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = (progressInLevel / xpNeededForLevel) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-sm border-b border-chalk-green-400/30">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-chalk-green-400" />
              <span className="font-orbitron text-lg font-bold text-white">Level {level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-warm-orange-400" />
              <span className="text-warm-orange-400 font-semibold">{currentXP} XP</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            {progressInLevel}/{xpNeededForLevel} to next level
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-chalk-green-400 to-neon-blue-400 h-3 rounded-full transition-all duration-1000 glow-effect"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default XPBar;