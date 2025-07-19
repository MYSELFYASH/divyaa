import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Lightbulb, HelpCircle } from 'lucide-react';

interface MentorChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  currentLevel: number;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const MentorChatbot: React.FC<MentorChatbotProps> = ({ isOpen, onToggle, currentLevel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const levelHints = {
    0: [
      "Welcome to Debate Quest! I'm Mentor Owl, your AI guide. Ready to start your journey?",
      "Each level teaches important debate skills. Click on a level to begin!",
      "Remember: practice makes perfect. You can retake any level to improve your score."
    ],
    1: [
      "In Level 1, you'll learn about the three key roles in debate.",
      "The Moderator keeps order, Speaker 1 argues FOR, and Speaker 2 argues AGAINST.",
      "Think about what each role's main responsibility is when answering questions."
    ],
    2: [
      "Level 2 is all about spotting rule violations. Look carefully at the debate scene!",
      "Common violations include: interrupting, going over time, shouting, and using bad sources.",
      "Click on anything that seems wrong or inappropriate in the debate."
    ],
    3: [
      "Level 3 tests your rebuttal skills. Choose rebuttals that directly counter the argument.",
      "Strong rebuttals use evidence and logic. Weak ones are just opinions or attacks.",
      "For evidence evaluation: studies and experts are strong, opinions and blogs are weak."
    ]
  };

  const quickResponses = {
    "What are debate roles?": "There are 3 main roles: Moderator (keeps order), Speaker 1 (argues FOR), and Speaker 2 (argues AGAINST). Each has specific responsibilities!",
    "How do I spot violations?": "Look for: interrupting opponents, going over time limits, shouting/aggressive tone, and using unreliable sources. Click on these when you see them!",
    "What makes a strong rebuttal?": "Strong rebuttals: use evidence, address the main point, and provide logical counter-arguments. Avoid personal attacks or simple disagreements!",
    "How is evidence rated?": "Strong: studies, expert opinions, official data. Moderate: surveys, some statistics. Weak: personal opinions, blogs, 'my friend said'.",
    "Can I retake levels?": "Absolutely! If you don't get enough XP, you'll get a chance to retake. Practice makes perfect!"
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      const greeting = levelHints[currentLevel as keyof typeof levelHints]?.[0] || 
                      "Hello! I'm here to help you master debate skills. What would you like to know?";
      
      setMessages([{
        id: '1',
        text: greeting,
        isBot: true,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, currentLevel]);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    addMessage(inputText, false);
    const userInput = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      let response = "I'm here to help! Try asking about debate roles, rule violations, rebuttals, or evidence evaluation.";

      // Check for quick responses
      const quickResponse = Object.entries(quickResponses).find(([key]) => 
        userInput.includes(key.toLowerCase())
      );

      if (quickResponse) {
        response = quickResponse[1];
      } else if (userInput.includes('role') || userInput.includes('moderator') || userInput.includes('speaker')) {
        response = levelHints[1][1];
      } else if (userInput.includes('rule') || userInput.includes('violation') || userInput.includes('spot')) {
        response = levelHints[2][1];
      } else if (userInput.includes('rebuttal') || userInput.includes('counter') || userInput.includes('argue')) {
        response = levelHints[3][1];
      } else if (userInput.includes('evidence') || userInput.includes('source') || userInput.includes('strong')) {
        response = levelHints[3][2];
      } else if (userInput.includes('help') || userInput.includes('stuck')) {
        const hints = levelHints[currentLevel as keyof typeof levelHints];
        response = hints ? hints[Math.floor(Math.random() * hints.length)] : response;
      } else if (userInput.includes('xp') || userInput.includes('score') || userInput.includes('point')) {
        response = "You earn XP by making correct choices! Level 1 & 2 need 30 XP, Level 3 needs 40 XP to pass.";
      }

      setIsTyping(false);
      addMessage(response, true);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickResponse = (question: string) => {
    addMessage(question, false);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage(quickResponses[question as keyof typeof quickResponses], true);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-neon-blue-500 to-neon-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 glow-effect z-50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 glass-card rounded-3xl border border-neon-blue-400/30 flex flex-col z-50 slide-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neon-blue-400/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-neon-blue-500 to-neon-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🦉</span>
          </div>
          <div>
            <h3 className="font-orbitron text-sm font-bold text-white">Mentor Owl</h3>
            <p className="text-xs text-gray-400">AI Debate Coach</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`
                max-w-xs p-3 rounded-2xl text-sm
                ${message.isBot
                  ? 'bg-neon-blue-500/20 text-white border border-neon-blue-400/30'
                  : 'bg-warm-orange-500/20 text-white border border-warm-orange-400/30'
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neon-blue-500/20 text-white border border-neon-blue-400/30 p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neon-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neon-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-neon-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Responses */}
      {messages.length <= 2 && (
        <div className="p-3 border-t border-neon-blue-400/30">
          <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
          <div className="space-y-1">
            {Object.keys(quickResponses).slice(0, 2).map((question) => (
              <button
                key={question}
                onClick={() => handleQuickResponse(question)}
                className="w-full text-left text-xs bg-neon-blue-500/10 hover:bg-neon-blue-500/20 text-neon-blue-300 p-2 rounded-lg transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-neon-blue-400/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-full border border-gray-600 focus:border-neon-blue-400 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all
              ${inputText.trim()
                ? 'bg-neon-blue-500 hover:bg-neon-blue-600 text-white'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorChatbot;