import React from 'react';
import { Download, Award } from 'lucide-react';

interface CertificateGeneratorProps {
  playerName: string;
  totalXP: number;
  badges: string[];
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ 
  playerName, 
  totalXP, 
  badges 
}) => {
  const generateCertificate = () => {
    const certificateContent = `
🏆 CERTIFICATE OF PERSUASION 🏆

This certifies that

${playerName}

has successfully completed

DEBATE QUEST: THE BASICS BATTLE

Demonstrating mastery in:
✓ Debate Roles & Responsibilities
✓ Rule Recognition & Enforcement  
✓ Rebuttal Construction & Logic
✓ Evidence Evaluation Skills

Final Statistics:
• Total XP Earned: ${totalXP}
• Badges Collected: ${badges.length}/4
• Completion Level: ${totalXP >= 100 ? 'Expert' : totalXP >= 70 ? 'Advanced' : 'Proficient'}

Badges Earned:
${badges.map(badge => `• ${badge}`).join('\n')}

Congratulations on mastering the fundamentals of debate!
You are now equipped with essential skills for persuasive communication.

Date: ${new Date().toLocaleDateString()}
Issued by: Debate Quest Academy

"Train Your Mind. Earn Your Voice."
    `;

    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debate-quest-certificate-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={generateCertificate}
      className="flex items-center gap-3 bg-gradient-to-r from-chalk-green-500 to-chalk-green-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 glow-effect"
    >
      <Award className="w-5 h-5" />
      Download Certificate
    </button>
  );
};

export default CertificateGenerator;