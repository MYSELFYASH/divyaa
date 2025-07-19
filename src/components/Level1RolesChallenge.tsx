import React, { useState } from 'react';
import { ArrowLeft, Users, Gavel, Mic, CheckCircle, XCircle, Zap } from 'lucide-react';

interface Level1RolesChallengeProps {
  onComplete: (xp: number) => void;
  onBack: () => void;
}

const roles = [
  {
    id: 'moderator',
    name: 'Moderator',
    icon: Gavel,
    color: 'from-neon-blue-400 to-neon-blue-600',
    responsibilities: [
      'Keeps order and manages time',
      'Ensures fair play for both sides',
      'Introduces speakers and topics',
      'Maintains respectful discussion'
    ]
  },
  {
    id: 'speaker1',
    name: 'Speaker 1 (Affirmative)',
    icon: Mic,
    color: 'from-chalk-green-400 to-chalk-green-600',
    responsibilities: [
      'Argues FOR the resolution',
      'Presents opening arguments',
      'Provides evidence and examples',
      'Defends the positive position'
    ]
  },
  {
    id: 'speaker2',
    name: 'Speaker 2 (Negative)',
    icon: Users,
    color: 'from-warm-orange-400 to-warm-orange-600',
    responsibilities: [
      'Argues AGAINST the resolution',
      'Challenges opposing arguments',
      'Presents counter-evidence',
      'Questions the affirmative case'
    ]
  }
];

const Level1RolesChallenge: React.FC<Level1RolesChallengeProps> = ({ onComplete, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState<'learn' | 'challenge'>('learn');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question: "Who keeps order and manages time in a debate?",
      correct: "moderator",
      options: ["moderator", "speaker1", "speaker2"]
    },
    {
      question: "Which role argues FOR the resolution?",
      correct: "speaker1",
      options: ["moderator", "speaker1", "speaker2"]
    },
    {
      question: "Who challenges opposing arguments and presents counter-evidence?",
      correct: "speaker2",
      options: ["moderator", "speaker1", "speaker2"]
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const startChallenge = () => {
    setCurrentPhase('challenge');
  };

  const handleAnswer = (selectedRoleId: string) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedRoleId === currentQ.correct;
    
    setAnswers(prev => [...prev, isCorrect]);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setShowFeedback(false);
      } else {
        // Challenge complete
        setTimeout(() => onComplete(score + (isCorrect ? 10 : 0)), 1000);
      }
    }, 2000);
  };

  if (currentPhase === 'learn') {
    return (
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-6xl mx-auto">
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
                Level 1: The Debate Club Trial
              </h1>
              <p className="text-gray-300">Learn the 3 basic roles in debate</p>
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {roles.map((role, index) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`
                    glass-card rounded-3xl p-8 cursor-pointer transition-all duration-300 border
                    ${isSelected 
                      ? 'border-chalk-green-400/60 scale-105 glow-effect' 
                      : 'border-chalk-green-400/30 hover:border-chalk-green-400/50 hover:scale-102'
                    }
                    slide-in
                  `}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-center mb-6">
                    <div className={`
                      w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
                      bg-gradient-to-br ${role.color} glow-effect
                    `}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                      {role.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {role.responsibilities.map((responsibility, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-chalk-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                  
                  {isSelected && (
                    <div className="mt-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-chalk-green-500/20 text-chalk-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Selected
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={startChallenge}
              disabled={!selectedRole}
              className={`
                px-12 py-4 rounded-full font-bold text-xl transition-all duration-300
                ${selectedRole
                  ? 'bg-gradient-to-r from-warm-orange-500 to-warm-orange-600 text-white hover:scale-105 glow-effect'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Start Challenge
            </button>
            <p className="text-gray-400 text-sm mt-4">
              Select a role to learn about it, then start the challenge!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Challenge Phase
  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-chalk-green-400 mb-4">
            Role Matching Challenge
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-gray-300">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warm-orange-400" />
              <span className="text-warm-orange-400 font-bold">{score} XP</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-chalk-green-400 to-neon-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="glass-card rounded-3xl p-8 mb-8 border border-chalk-green-400/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            {currentQ.question}
          </h3>
          
          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentQ.options.map((optionId) => {
              const role = roles.find(r => r.id === optionId)!;
              const IconComponent = role.icon;
              
              return (
                <button
                  key={optionId}
                  onClick={() => !showFeedback && handleAnswer(optionId)}
                  disabled={showFeedback}
                  className={`
                    glass-card rounded-2xl p-6 border transition-all duration-300
                    ${showFeedback
                      ? optionId === currentQ.correct
                        ? 'border-chalk-green-400 bg-chalk-green-500/20'
                        : 'border-gray-600 opacity-50'
                      : 'border-chalk-green-400/30 hover:border-chalk-green-400/60 hover:scale-105'
                    }
                  `}
                >
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                    bg-gradient-to-br ${role.color}
                  `}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">{role.name}</h4>
                  
                  {showFeedback && optionId === currentQ.correct && (
                    <div className="mt-3">
                      <CheckCircle className="w-6 h-6 text-chalk-green-400 mx-auto" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`
            glass-card rounded-2xl p-6 border text-center slide-in
            ${currentAnswer ? 'border-chalk-green-400/60' : 'border-warm-orange-400/60'}
          `}>
            <div className="flex items-center justify-center gap-3 mb-4">
              {currentAnswer ? (
                <>
                  <CheckCircle className="w-8 h-8 text-chalk-green-400" />
                  <span className="text-2xl font-bold text-chalk-green-400">Correct! +10 XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-warm-orange-400" />
                  <span className="text-2xl font-bold text-warm-orange-400">Try Again!</span>
                </>
              )}
            </div>
            <p className="text-gray-300">
              {currentAnswer 
                ? "Great job! You understand this role perfectly." 
                : "Don't worry, you'll get it next time!"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level1RolesChallenge;