import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Volume2, UserX, FileX, Zap, CheckCircle } from 'lucide-react';

interface Level2RulesChallengeProps {
  onComplete: (xp: number) => void;
  onBack: () => void;
}

const violations = [
  {
    id: 'interruption',
    name: 'Interrupting Opponent',
    icon: UserX,
    description: 'Speaker cuts off opponent during their time',
    position: { x: 25, y: 40 }
  },
  {
    id: 'overtime',
    name: 'Going Over Time',
    icon: Clock,
    description: 'Speaker exceeds their allocated speaking time',
    position: { x: 70, y: 30 }
  },
  {
    id: 'volume',
    name: 'Shouting/Aggressive Tone',
    icon: Volume2,
    description: 'Speaker uses inappropriate volume or tone',
    position: { x: 45, y: 60 }
  },
  {
    id: 'sources',
    name: 'Unreliable Sources',
    icon: FileX,
    description: 'Using questionable or unverified evidence',
    position: { x: 60, y: 70 }
  }
];

const Level2RulesChallenge: React.FC<Level2RulesChallengeProps> = ({ onComplete, onBack }) => {
  const [foundViolations, setFoundViolations] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds to find all violations
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && foundViolations.size < violations.length) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || foundViolations.size === violations.length) {
      // Game over
      setTimeout(() => onComplete(score), 1000);
    }
  }, [timeLeft, gameStarted, foundViolations.size, score, onComplete]);

  const handleViolationClick = (violationId: string) => {
    if (!foundViolations.has(violationId)) {
      setFoundViolations(prev => new Set([...prev, violationId]));
      setScore(prev => prev + 10);
      setShowFeedback(violationId);
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="glass-card p-3 rounded-full border border-chalk-green-400/30 hover:border-chalk-green-400/60 transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-chalk-green-400" />
            </button>
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-chalk-green-400">
                Level 2: Rules of the Round
              </h1>
              <p className="text-gray-300">Spot rule violations in the debate scene</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-card rounded-3xl p-8 border border-chalk-green-400/30 text-center mb-8">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-6">
              Mission Briefing
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              A mock debate is about to begin, but some participants are breaking the rules! 
              You have 60 seconds to spot all 4 violations by clicking on them.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {violations.map((violation) => {
                const IconComponent = violation.icon;
                return (
                  <div key={violation.id} className="glass-card rounded-2xl p-4 border border-gray-600/30">
                    <IconComponent className="w-8 h-8 text-warm-orange-400 mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-white mb-1">{violation.name}</h4>
                    <p className="text-xs text-gray-400">{violation.description}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 glow-effect"
            >
              Start Observation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2 rounded-full border border-warm-orange-400/30">
              <Clock className="w-5 h-5 text-warm-orange-400 inline mr-2" />
              <span className="text-warm-orange-400 font-bold">{timeLeft}s</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full border border-chalk-green-400/30">
              <Zap className="w-5 h-5 text-chalk-green-400 inline mr-2" />
              <span className="text-chalk-green-400 font-bold">{score} XP</span>
            </div>
          </div>
          
          <div className="text-white">
            Found: {foundViolations.size}/{violations.length}
          </div>
        </div>

        {/* Debate Scene */}
        <div className="relative glass-card rounded-3xl border border-chalk-green-400/30 overflow-hidden mb-8" style={{ aspectRatio: '16/10' }}>
          {/* Scene Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
            {/* Classroom elements */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg"></div>
            
            {/* Speakers */}
            <div className="absolute bottom-16 left-1/4 w-16 h-20 bg-gradient-to-b from-neon-blue-400 to-neon-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-16 right-1/4 w-16 h-20 bg-gradient-to-b from-warm-orange-400 to-warm-orange-500 rounded-full"></div>
            
            {/* Moderator */}
            <div className="absolute top-1/4 right-1/4 w-12 h-16 bg-gradient-to-b from-chalk-green-400 to-chalk-green-500 rounded-full"></div>
            
            {/* Timer Display */}
            <div className="absolute top-1/4 left-1/4 w-20 h-12 bg-red-500 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-xs">5:30</span>
            </div>

            {/* Speech bubbles for context */}
            <div className="absolute top-1/3 left-1/6 bg-white/90 rounded-2xl p-3 max-w-32">
              <p className="text-gray-800 text-xs">"But that's not true because..."</p>
            </div>
            
            <div className="absolute top-1/2 right-1/6 bg-white/90 rounded-2xl p-3 max-w-32">
              <p className="text-gray-800 text-xs">"According to my friend's blog..."</p>
            </div>
          </div>

          {/* Violation Hotspots */}
          {violations.map((violation) => {
            const IconComponent = violation.icon;
            const isFound = foundViolations.has(violation.id);
            
            return (
              <button
                key={violation.id}
                onClick={() => handleViolationClick(violation.id)}
                className={`
                  absolute w-12 h-12 rounded-full transition-all duration-300 transform
                  ${isFound
                    ? 'bg-chalk-green-500 border-4 border-chalk-green-300 scale-110 glow-effect'
                    : 'bg-warm-orange-500/80 hover:bg-warm-orange-400 hover:scale-110 animate-bounce'
                  }
                `}
                style={{ left: `${violation.position.x}%`, top: `${violation.position.y}%` }}
                disabled={isFound}
              >
                {isFound ? (
                  <CheckCircle className="w-6 h-6 text-white mx-auto" />
                ) : (
                  <IconComponent className="w-6 h-6 text-white mx-auto" />
                )}
              </button>
            );
          })}

          {/* Feedback Popup */}
          {showFeedback && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 glass-card rounded-2xl p-4 border border-chalk-green-400/60 slide-in">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-chalk-green-400" />
                <div>
                  <h4 className="text-white font-semibold">
                    {violations.find(v => v.id === showFeedback)?.name}
                  </h4>
                  <p className="text-gray-300 text-sm">+10 XP</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="glass-card rounded-2xl p-6 border border-chalk-green-400/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-orbitron text-xl font-bold text-white">Violations Found</h3>
            <span className="text-chalk-green-400 font-bold">{foundViolations.size}/4</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {violations.map((violation) => {
              const IconComponent = violation.icon;
              const isFound = foundViolations.has(violation.id);
              
              return (
                <div
                  key={violation.id}
                  className={`
                    glass-card rounded-xl p-4 border transition-all duration-300
                    ${isFound 
                      ? 'border-chalk-green-400/60 bg-chalk-green-500/20' 
                      : 'border-gray-600/30'
                    }
                  `}
                >
                  <IconComponent className={`
                    w-6 h-6 mx-auto mb-2
                    ${isFound ? 'text-chalk-green-400' : 'text-gray-500'}
                  `} />
                  <h4 className={`
                    text-sm font-semibold text-center
                    ${isFound ? 'text-white' : 'text-gray-500'}
                  `}>
                    {violation.name}
                  </h4>
                  {isFound && (
                    <div className="text-center mt-2">
                      <CheckCircle className="w-4 h-4 text-chalk-green-400 mx-auto" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level2RulesChallenge;