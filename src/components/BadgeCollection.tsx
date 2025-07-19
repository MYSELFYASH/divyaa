import React from 'react';
import { Trophy, Users, BookOpen, Shield } from 'lucide-react';

interface BadgeCollectionProps {
  badges: string[];
}

const badgeData = {
  'Role Master': {
    icon: Users,
    color: 'from-neon-blue-400 to-neon-blue-600',
    description: 'Mastered debate roles and responsibilities'
  },
  'Rule Keeper': {
    icon: BookOpen,
    color: 'from-chalk-green-400 to-chalk-green-600',
    description: 'Expert at spotting rule violations'
  },
  'Persuasion Pro': {
    icon: Shield,
    color: 'from-warm-orange-400 to-warm-orange-600',
    description: 'Skilled at crafting strong rebuttals'
  },
  'Comeback Champ': {
    icon: Trophy,
    color: 'from-purple-400 to-purple-600',
    description: 'Earned through retaking and improving'
  }
};

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ badges }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-chalk-green-400/30">
      <h3 className="font-orbitron text-xl font-bold text-white mb-4 text-center">
        Earned Badges
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(badgeData).map(([badgeName, badgeInfo]) => {
          const IconComponent = badgeInfo.icon;
          const isEarned = badges.includes(badgeName);
          
          return (
            <div
              key={badgeName}
              className={`
                glass-card rounded-xl p-4 border text-center transition-all duration-300
                ${isEarned 
                  ? 'border-chalk-green-400/60 bg-chalk-green-500/20 scale-105' 
                  : 'border-gray-600/30 opacity-50'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3
                bg-gradient-to-br ${badgeInfo.color}
                ${isEarned ? 'glow-effect' : 'grayscale'}
              `}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              
              <h4 className={`
                text-sm font-semibold mb-1
                ${isEarned ? 'text-white' : 'text-gray-500'}
              `}>
                {badgeName}
              </h4>
              
              <p className={`
                text-xs
                ${isEarned ? 'text-gray-300' : 'text-gray-600'}
              `}>
                {badgeInfo.description}
              </p>
              
              {isEarned && (
                <div className="mt-2">
                  <Trophy className="w-4 h-4 text-chalk-green-400 mx-auto" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Collected: {badges.length}/{Object.keys(badgeData).length} badges
        </p>
      </div>
    </div>
  );
};

export default BadgeCollection;