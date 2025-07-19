import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import Level1RolesChallenge from './Level1RolesChallenge';
import Level2RulesChallenge from './Level2RulesChallenge';
import Level3RebuttalChallenge from './Level3RebuttalChallenge';
import MentorChatbot from './MentorChatbot';
import XPBar from './XPBar';
import BadgeCollection from './BadgeCollection';
import CertificateGenerator from './CertificateGenerator';
import { Zap, Trophy, RotateCcw } from 'lucide-react';

interface GameState {
  currentLevel: number;
  totalXP: number;
  level1XP: number;
  level2XP: number;
  level3XP: number;
  badges: string[];
  showRetake: boolean;
  retakeLevel: number;
  gameCompleted: boolean;
  showChatbot: boolean;
}

const DebateQuestApp: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0, // 0 = hero, 1-3 = levels
    totalXP: 0,
    level1XP: 0,
    level2XP: 0,
    level3XP: 0,
    badges: [],
    showRetake: false,
    retakeLevel: 0,
    gameCompleted: false,
    showChatbot: false
  });

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    // Load saved progress
    const saved = localStorage.getItem('debateQuestProgress');
    if (saved) {
      setGameState(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save progress
    localStorage.setItem('debateQuestProgress', JSON.stringify(gameState));
  }, [gameState]);

  const startLevel = (level: number) => {
    setGameState(prev => ({ ...prev, currentLevel: level, showRetake: false }));
  };

  const completeLevel = (level: number, xpEarned: number) => {
    const xpNeeded = level === 3 ? 40 : 30;
    
    if (xpEarned >= xpNeeded) {
      // Success
      setGameState(prev => {
        const newState = {
          ...prev,
          totalXP: prev.totalXP + xpEarned,
          [`level${level}XP`]: xpEarned,
          currentLevel: level === 3 ? 4 : 0, // Go to completion or back to hero
          gameCompleted: level === 3
        };
        
        // Add badge
        const badgeName = level === 1 ? 'Role Master' : 
                         level === 2 ? 'Rule Keeper' : 'Persuasion Pro';
        if (!prev.badges.includes(badgeName)) {
          newState.badges = [...prev.badges, badgeName];
        }
        
        return newState;
      });
      
      if (level === 3) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      }
    } else {
      // Need to retake
      setGameState(prev => ({
        ...prev,
        showRetake: true,
        retakeLevel: level,
        currentLevel: 0
      }));
    }
  };

  const retakeLevel = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: prev.retakeLevel,
      showRetake: false
    }));
  };

  const resetGame = () => {
    setGameState({
      currentLevel: 0,
      totalXP: 0,
      level1XP: 0,
      level2XP: 0,
      level3XP: 0,
      badges: [],
      showRetake: false,
      retakeLevel: 0,
      gameCompleted: false,
      showChatbot: false
    });
    localStorage.removeItem('debateQuestProgress');
  };

  const toggleChatbot = () => {
    setGameState(prev => ({ ...prev, showChatbot: !prev.showChatbot }));
  };

  // Confetti particles
  const renderConfetti = () => {
    if (!confetti) return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-warm-orange-400 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen chalkboard-bg font-inter text-white relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-chalk-green-400 rounded-full opacity-30 float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* XP Bar - Always visible except on hero */}
      {gameState.currentLevel > 0 && !gameState.gameCompleted && (
        <XPBar 
          currentXP={gameState.totalXP} 
          level={Math.floor(gameState.totalXP / 100) + 1}
        />
      )}

      {/* Main Content */}
      {gameState.currentLevel === 0 && !gameState.showRetake && !gameState.gameCompleted && (
        <HeroSection 
          onStartLevel={startLevel}
          gameState={gameState}
        />
      )}

      {gameState.currentLevel === 1 && (
        <Level1RolesChallenge 
          onComplete={(xp) => completeLevel(1, xp)}
          onBack={() => setGameState(prev => ({ ...prev, currentLevel: 0 }))}
        />
      )}

      {gameState.currentLevel === 2 && (
        <Level2RulesChallenge 
          onComplete={(xp) => completeLevel(2, xp)}
          onBack={() => setGameState(prev => ({ ...prev, currentLevel: 0 }))}
        />
      )}

      {gameState.currentLevel === 3 && (
        <Level3RebuttalChallenge 
          onComplete={(xp) => completeLevel(3, xp)}
          onBack={() => setGameState(prev => ({ ...prev, currentLevel: 0 }))}
        />
      )}

      {/* Retake Screen */}
      {gameState.showRetake && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="glass-card rounded-3xl p-8 max-w-md text-center border border-warm-orange-400/30">
            <div className="w-20 h-20 bg-warm-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
              <RotateCcw className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-orbitron text-2xl font-bold mb-4 neon-text text-warm-orange-400">
              Need More Practice!
            </h2>
            <p className="text-gray-300 mb-6">
              You need {gameState.retakeLevel === 3 ? '40' : '30'} XP to advance. 
              Let's try Level {gameState.retakeLevel} again!
            </p>
            <button
              onClick={retakeLevel}
              className="bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 glow-effect"
            >
              Retake Level {gameState.retakeLevel}
            </button>
          </div>
        </div>
      )}

      {/* Game Completion */}
      {gameState.gameCompleted && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="glass-card rounded-3xl p-8 max-w-2xl text-center border border-chalk-green-400/30">
            <div className="w-32 h-32 bg-gradient-to-r from-chalk-green-400 to-neon-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 glow-effect">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h1 className="font-orbitron text-4xl font-bold mb-4 neon-text text-chalk-green-400">
              Quest Complete!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              You've mastered the basics of debate! Total XP: {gameState.totalXP}
            </p>
            
            <BadgeCollection badges={gameState.badges} />
            
            <div className="flex gap-4 justify-center mt-8">
              <CertificateGenerator 
                playerName="Debate Champion"
                totalXP={gameState.totalXP}
                badges={gameState.badges}
              />
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-neon-blue-500 to-neon-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
              >
                Start New Quest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Chatbot */}
      <MentorChatbot 
        isOpen={gameState.showChatbot}
        onToggle={toggleChatbot}
        currentLevel={gameState.currentLevel}
      />

      {/* Confetti */}
      {renderConfetti()}
    </div>
  );
};

export default DebateQuestApp;