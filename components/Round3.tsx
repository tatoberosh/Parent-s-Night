import React, { useState } from 'react';
import { Player } from '../types';
import { ROUND_3_QUESTIONS } from '../constants';
import { Check, X, ArrowRight } from 'lucide-react';

interface Round3Props {
  players: Player[];
  updateScore: (playerId: string, points: number) => void;
  onRoundComplete: () => void;
}

const Round3: React.FC<Round3Props> = ({ players, updateScore, onRoundComplete }) => {
  // Total steps = 3 players * 4 questions each = 12 steps
  const TOTAL_STEPS = players.length * 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<'guess' | 'decision' | 'feedback'>('guess');
  const [parentGuess, setParentGuess] = useState<'left' | 'right' | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  // Determine active player and question based on step
  const currentPlayerIndex = currentStep % players.length;
  const activePlayer = players[currentPlayerIndex];
  const questionIndex = Math.floor(currentStep / players.length);
  
  // Get specific questions for this child
  const playerQuestions = ROUND_3_QUESTIONS[activePlayer.childName];
  const currentPair = playerQuestions?.[questionIndex];

  if (!currentPair) {
    // Fallback/Safety if question missing
    return <div>Error loading question data</div>;
  }

  const handleParentGuess = (side: 'left' | 'right') => {
    setParentGuess(side);
    setPhase('decision');
  };

  const handleResult = (isCorrect: boolean) => {
    if (isCorrect) {
      // Child got it correct: 50 points
      updateScore(activePlayer.id, 50);
      setResultMessage(`${activePlayer.childName} got it! (+50pts)`);
    } else {
      // Child got it wrong: Other two children get 20 points each
      players.forEach((p, idx) => {
        if (idx !== currentPlayerIndex) {
          updateScore(p.id, 20);
        }
      });
      setResultMessage("Wrong Answer. Others get +20pts.");
    }

    setPhase('feedback');
  };

  const handleNext = () => {
    // Move to next step
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
      setPhase('guess');
      setParentGuess(null);
      setResultMessage(null);
    } else {
      onRoundComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-purple-800">Round 3: Picture Choice</h2>
        
        <div className="mt-6">
          <h3 className="text-3xl font-black text-orange-500 uppercase tracking-wide drop-shadow-sm">
            {currentPair.header}
          </h3>
        </div>

        <div className="mt-4 flex justify-center items-center gap-3">
          <span className="text-gray-400 font-bold uppercase text-sm">Question {currentStep + 1} / {TOTAL_STEPS}</span>
        </div>
        
        <div className="mt-2 bg-purple-100 inline-block px-6 py-2 rounded-full text-purple-800 font-bold border-2 border-purple-200 shadow-sm">
           Active: {activePlayer.childName} & {activePlayer.parentName}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border-b-8 border-purple-200">
        
        {/* Images */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Left Choice */}
          <div 
            onClick={() => phase === 'guess' && handleParentGuess('left')}
            className={`flex-1 relative group cursor-pointer transition-all duration-300 transform ${parentGuess === 'left' ? 'ring-8 ring-purple-500 scale-105' : 'hover:scale-105'} ${parentGuess && parentGuess !== 'left' ? 'opacity-50 grayscale' : ''}`}
          >
             <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md">
                <img src={currentPair.leftImage} alt="Option Left" className="w-full h-full object-cover" />
             </div>
             
             {/* Labels - Only show in FEEDBACK phase */}
             {phase === 'feedback' && (
               <div className="mt-4 text-center animate-fade-in">
                  <span className="text-2xl font-bold text-gray-700">{currentPair.leftLabel}</span>
               </div>
             )}
             
             {parentGuess === 'left' && <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full font-bold shadow-lg z-10">Parent's Pick</div>}
          </div>

          <div className="hidden md:flex items-center justify-center font-bold text-gray-300 text-2xl">OR</div>

          {/* Right Choice */}
          <div 
            onClick={() => phase === 'guess' && handleParentGuess('right')}
            className={`flex-1 relative group cursor-pointer transition-all duration-300 transform ${parentGuess === 'right' ? 'ring-8 ring-purple-500 scale-105' : 'hover:scale-105'} ${parentGuess && parentGuess !== 'right' ? 'opacity-50 grayscale' : ''}`}
          >
             <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md">
                <img src={currentPair.rightImage} alt="Option Right" className="w-full h-full object-cover" />
             </div>
             
             {/* Labels - Only show in FEEDBACK phase */}
             {phase === 'feedback' && (
               <div className="mt-4 text-center animate-fade-in">
                  <span className="text-2xl font-bold text-gray-700">{currentPair.rightLabel}</span>
               </div>
             )}
             
             {parentGuess === 'right' && <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full font-bold shadow-lg z-10">Parent's Pick</div>}
          </div>
        </div>

        {/* Phase 1: Instruction */}
        {phase === 'guess' && (
          <div className="text-center text-xl font-medium text-gray-600">
            Parent, click the image your child will know!
          </div>
        )}

        {/* Phase 2: Host Decision (Labels still hidden) */}
        {phase === 'decision' && (
          <div className="animate-slide-up bg-blue-50 p-6 rounded-xl border border-blue-100 text-center space-y-4">
             <h3 className="text-2xl font-bold text-blue-800">Did {activePlayer.childName} get it right?</h3>
             <p className="text-sm text-blue-400 font-bold uppercase">(Pressing a button will reveal the answers)</p>
             <div className="flex justify-center gap-6">
               <button 
                 onClick={() => handleResult(true)}
                 className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-1"
               >
                 <Check /> Yes
               </button>
               <button 
                 onClick={() => handleResult(false)}
                 className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-transform hover:-translate-y-1"
               >
                 <X /> No
               </button>
             </div>
          </div>
        )}

        {/* Phase 3: Feedback (Labels Revealed) */}
        {phase === 'feedback' && (
          <div className="animate-slide-up bg-gray-50 p-6 rounded-xl border border-gray-200 text-center space-y-4">
             <h3 className="text-2xl font-bold text-gray-800">{resultMessage}</h3>
             <button 
               onClick={handleNext}
               className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-12 py-3 rounded-full font-bold text-xl shadow-lg transition-transform hover:scale-105 mx-auto"
             >
               Next Question <ArrowRight />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Round3;