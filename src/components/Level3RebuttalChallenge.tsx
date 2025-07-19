import React, { useState } from 'react';
import { ArrowLeft, Shield, Star, Zap, CheckCircle, XCircle, DragHandleDots2Icon as Grip } from 'lucide-react';

interface Level3RebuttalChallengeProps {
  onComplete: (xp: number) => void;
  onBack: () => void;
}

const arguments = [
  {
    id: 'homework',
    statement: "Homework should be banned because it causes stress for students.",
    rebuttals: [
      { id: 'time', text: "Homework teaches time management skills", strength: 'strong', points: 20 },
      { id: 'practice', text: "Practice reinforces classroom learning", strength: 'strong', points: 20 },
      { id: 'disagree', text: "I disagree with your opinion", strength: 'weak', points: 5 },
      { id: 'stress', text: "Some stress prepares students for real challenges", strength: 'moderate', points: 15 }
    ]
  },
  {
    id: 'uniforms',
    statement: "School uniforms eliminate bullying because everyone looks the same.",
    rebuttals: [
      { id: 'studies', text: "Studies show bullying shifts to other differences", strength: 'strong', points: 20 },
      { id: 'wrong', text: "That's completely wrong and stupid", strength: 'weak', points: 5 },
      { id: 'expensive', text: "Uniforms are expensive for families", strength: 'moderate', points: 15 },
      { id: 'expression', text: "Uniforms limit important self-expression", strength: 'moderate', points: 15 }
    ]
  }
];

const evidenceItems = [
  { id: 'study1', text: "A 2023 study of 500 schools", strength: 'strong', points: 10 },
  { id: 'friend', text: "My friend told me", strength: 'weak', points: 2 },
  { id: 'expert', text: "Education expert Dr. Smith states", strength: 'strong', points: 10 },
  { id: 'blog', text: "A random blog post claims", strength: 'weak', points: 2 },
  { id: 'survey', text: "National survey of 10,000 students", strength: 'strong', points: 10 },
  { id: 'opinion', text: "I think that", strength: 'weak', points: 2 }
];

const Level3RebuttalChallenge: React.FC<Level3RebuttalChallengeProps> = ({ onComplete, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState<'rebuttal' | 'evidence' | 'final'>('rebuttal');
  const [currentArgument, setCurrentArgument] = useState(0);
  const [selectedRebuttals, setSelectedRebuttals] = useState<string[]>([]);
  const [evidenceRatings, setEvidenceRatings] = useState<{[key: string]: string}>({});
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRebuttalSelect = (rebuttalId: string) => {
    if (selectedRebuttals.includes(rebuttalId)) {
      setSelectedRebuttals(prev => prev.filter(id => id !== rebuttalId));
    } else if (selectedRebuttals.length < 2) {
      setSelectedRebuttals(prev => [...prev, rebuttalId]);
    }
  };

  const submitRebuttals = () => {
    const currentArg = arguments[currentArgument];
    let points = 0;
    
    selectedRebuttals.forEach(rebuttalId => {
      const rebuttal = currentArg.rebuttals.find(r => r.id === rebuttalId);
      if (rebuttal) {
        points += rebuttal.points;
      }
    });
    
    setScore(prev => prev + points);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentArgument < arguments.length - 1) {
        setCurrentArgument(prev => prev + 1);
        setSelectedRebuttals([]);
        setShowFeedback(false);
      } else {
        setCurrentPhase('evidence');
        setShowFeedback(false);
      }
    }, 2000);
  };

  const handleEvidenceRating = (evidenceId: string, rating: string) => {
    setEvidenceRatings(prev => ({ ...prev, [evidenceId]: rating }));
  };

  const submitEvidenceRatings = () => {
    let points = 0;
    
    evidenceItems.forEach(item => {
      const userRating = evidenceRatings[item.id];
      if (userRating === item.strength) {
        points += item.points;
      }
    });
    
    setScore(prev => prev + points);
    setCurrentPhase('final');
  };

  const finishChallenge = () => {
    onComplete(score);
  };

  if (currentPhase === 'rebuttal') {
    const currentArg = arguments[currentArgument];
    
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
                Level 3: Rebuttal Rescue
              </h1>
              <p className="text-gray-300">Craft strong rebuttals to counter arguments</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Zap className="w-5 h-5 text-warm-orange-400" />
              <span className="text-warm-orange-400 font-bold">{score} XP</span>
            </div>
          </div>

          {/* Argument */}
          <div className="glass-card rounded-3xl p-8 border border-warm-orange-400/30 mb-8">
            <div className="text-center mb-6">
              <h2 className="font-orbitron text-xl font-bold text-white mb-4">
                Opponent's Argument {currentArgument + 1}/2
              </h2>
              <div className="glass-card rounded-2xl p-6 border border-gray-600/30 bg-red-500/10">
                <p className="text-lg text-white italic">"{currentArg.statement}"</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-chalk-green-400 mb-4 text-center">
              Choose 2 strongest rebuttals:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentArg.rebuttals.map((rebuttal) => {
                const isSelected = selectedRebuttals.includes(rebuttal.id);
                
                return (
                  <button
                    key={rebuttal.id}
                    onClick={() => handleRebuttalSelect(rebuttal.id)}
                    disabled={!isSelected && selectedRebuttals.length >= 2}
                    className={`
                      glass-card rounded-2xl p-6 border transition-all duration-300 text-left
                      ${isSelected
                        ? 'border-chalk-green-400/60 bg-chalk-green-500/20 scale-105'
                        : selectedRebuttals.length >= 2
                          ? 'border-gray-600/30 opacity-50 cursor-not-allowed'
                          : 'border-chalk-green-400/30 hover:border-chalk-green-400/50 hover:scale-102'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1
                        ${isSelected 
                          ? 'border-chalk-green-400 bg-chalk-green-400' 
                          : 'border-gray-500'
                        }
                      `}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{rebuttal.text}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Star className={`
                            w-4 h-4 
                            ${rebuttal.strength === 'strong' ? 'text-chalk-green-400' :
                              rebuttal.strength === 'moderate' ? 'text-warm-orange-400' :
                              'text-gray-500'
                            }
                          `} />
                          <span className={`
                            text-sm capitalize
                            ${rebuttal.strength === 'strong' ? 'text-chalk-green-400' :
                              rebuttal.strength === 'moderate' ? 'text-warm-orange-400' :
                              'text-gray-500'
                            }
                          `}>
                            {rebuttal.strength} (+{rebuttal.points} XP)
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={submitRebuttals}
                disabled={selectedRebuttals.length !== 2 || showFeedback}
                className={`
                  px-8 py-3 rounded-full font-bold transition-all duration-300
                  ${selectedRebuttals.length === 2 && !showFeedback
                    ? 'bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white hover:scale-105 glow-effect'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Submit Rebuttals
              </button>
              <p className="text-gray-400 text-sm mt-2">
                Selected: {selectedRebuttals.length}/2
              </p>
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="glass-card rounded-2xl p-6 border border-chalk-green-400/60 text-center slide-in">
              <CheckCircle className="w-12 h-12 text-chalk-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Rebuttals Submitted!</h3>
              <p className="text-gray-300">
                You earned {selectedRebuttals.reduce((total, id) => {
                  const rebuttal = currentArg.rebuttals.find(r => r.id === id);
                  return total + (rebuttal?.points || 0);
                }, 0)} XP for your choices.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentPhase === 'evidence') {
    return (
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-orbitron text-2xl font-bold text-chalk-green-400">
                Evidence Evaluation
              </h2>
              <p className="text-gray-300">Rate the strength of each piece of evidence</p>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warm-orange-400" />
              <span className="text-warm-orange-400 font-bold">{score} XP</span>
            </div>
          </div>

          {/* Evidence Items */}
          <div className="space-y-4 mb-8">
            {evidenceItems.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-6 border border-chalk-green-400/30">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white font-medium">"{item.text}"</p>
                </div>
                
                <div className="flex gap-2">
                  {['weak', 'moderate', 'strong'].map((strength) => (
                    <button
                      key={strength}
                      onClick={() => handleEvidenceRating(item.id, strength)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize
                        ${evidenceRatings[item.id] === strength
                          ? strength === 'strong' ? 'bg-chalk-green-500 text-white' :
                            strength === 'moderate' ? 'bg-warm-orange-500 text-white' :
                            'bg-gray-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }
                      `}
                    >
                      {strength}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={submitEvidenceRatings}
              disabled={Object.keys(evidenceRatings).length !== evidenceItems.length}
              className={`
                px-8 py-3 rounded-full font-bold transition-all duration-300
                ${Object.keys(evidenceRatings).length === evidenceItems.length
                  ? 'bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white hover:scale-105 glow-effect'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Submit Ratings
            </button>
            <p className="text-gray-400 text-sm mt-2">
              Rated: {Object.keys(evidenceRatings).length}/{evidenceItems.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Final phase
  return (
    <div className="min-h-screen px-6 py-8 flex items-center justify-center">
      <div className="glass-card rounded-3xl p-8 border border-chalk-green-400/30 text-center max-w-md">
        <Shield className="w-20 h-20 text-chalk-green-400 mx-auto mb-6 glow-effect" />
        <h2 className="font-orbitron text-2xl font-bold text-white mb-4">
          Challenge Complete!
        </h2>
        <p className="text-gray-300 mb-6">
          You've demonstrated strong rebuttal skills and evidence evaluation.
        </p>
        <div className="glass-card rounded-2xl p-4 border border-warm-orange-400/30 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-6 h-6 text-warm-orange-400" />
            <span className="text-2xl font-bold text-warm-orange-400">{score} XP</span>
          </div>
          <p className="text-gray-400 text-sm">
            {score >= 40 ? 'Excellent work!' : 'Good effort! Try again to improve.'}
          </p>
        </div>
        <button
          onClick={finishChallenge}
          className="bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300 glow-effect"
        >
          Complete Level 3
        </button>
      </div>
    </div>
  );
};

export default Level3RebuttalChallenge;