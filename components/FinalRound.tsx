import React, { useState } from 'react';
import { Player, FinalRoundItem } from '../types';
import { FINAL_ROUND_ITEMS, FINAL_ROUND_CATEGORY } from '../constants';
import { Star, AlertTriangle, RefreshCcw, X } from 'lucide-react';

interface FinalRoundProps {
  players: Player[];
  updateScore: (playerId: string, multiplier: number) => void;
  onGameComplete: () => void;
}

const FinalRound: React.FC<FinalRoundProps> = ({ players, updateScore, onGameComplete }) => {
  // Determine top player(s)
  const maxScore = Math.max(...players.map(p => p.score));
  const finalists = players.filter(p => p.score === maxScore);
  const finalist = finalists[0]; // Simple tie-breaker: first one found

  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  const handleCardClick = (index: number, item: FinalRoundItem) => {
    if (gameState !== 'playing' || revealedIndices.includes(index)) return;

    setRevealedIndices([...revealedIndices, index]);

    if (item.isCorrect) {
      const newFound = foundCount + 1;
      setFoundCount(newFound);
      if (newFound === 5) {
        setGameState('won');
        updateScore(finalist.id, 2); 
      }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes > 3) {
        setGameState('lost');
      }
    }
  };

  const handleFinish = () => {
    // If won, double the score (add current score again)
    if (gameState === 'won') {
       updateScore(finalist.id, finalist.score); 
    }
    onGameComplete();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-purple-800 flex justify-center items-center gap-3">
          <Star className="text-yellow-400 fill-yellow-400 w-10 h-10" />
          Final Round
          <Star className="text-yellow-400 fill-yellow-400 w-10 h-10" />
        </h2>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl inline-block mt-4 shadow-lg">
           <p className="text-sm font-bold uppercase opacity-80">Finalist</p>
           <p className="text-3xl font-black">{finalist.childName} & {finalist.parentName}</p>
        </div>
        <p className="mt-6 text-xl text-gray-700 font-bold max-w-2xl mx-auto">
          Find the 5 items that fit the category: <br/>
          <span className="text-orange-600 text-2xl underline decoration-wavy decoration-orange-300">{FINAL_ROUND_CATEGORY}</span>
        </p>
      </div>

      <div className="flex justify-between items-center px-4 md:px-12 mb-4">
        <div className="flex gap-2">
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-8 h-8 rounded-full border-2 border-green-500 ${i < foundCount ? 'bg-green-500' : 'bg-transparent'}`} />
           ))}
           <span className="ml-2 font-bold text-green-700">Found</span>
        </div>
        <div className="flex gap-2">
           <span className="mr-2 font-bold text-red-700">Mistakes</span>
           {[...Array(3)].map((_, i) => (
             <div key={i} className={`w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center ${i < mistakes ? 'bg-red-500 text-white' : 'bg-transparent'}`}>
               {i < mistakes && <X size={16} />}
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {FINAL_ROUND_ITEMS.map((item, idx) => {
          const isRevealed = revealedIndices.includes(idx);
          let bgClass = "bg-white text-gray-900"; // Force text color for unrevealed cards
          if (isRevealed) {
            bgClass = item.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white";
          } else if (gameState === 'lost' && item.isCorrect) {
             bgClass = "bg-green-200 border-2 border-green-500 opacity-50 text-gray-900";
          }

          return (
            <button
              key={idx}
              disabled={gameState !== 'playing' || isRevealed}
              onClick={() => handleCardClick(idx, item)}
              className={`h-32 rounded-xl shadow-md font-bold text-lg md:text-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center p-4 border-b-4 ${isRevealed ? 'border-transparent' : 'border-gray-200'} ${bgClass}`}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {gameState !== 'playing' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl transform scale-100">
             {gameState === 'won' ? (
               <>
                 <h3 className="text-4xl font-black text-green-600 mb-4">DOUBLED POINTS!</h3>
                 <p className="text-gray-600 mb-8">You found all 5 items with fewer than 4 mistakes.</p>
               </>
             ) : (
               <>
                 <h3 className="text-4xl font-black text-red-600 mb-4">GAME OVER</h3>
                 <p className="text-gray-600 mb-8">Too many mistakes! Points remain the same.</p>
               </>
             )}
             <button 
               onClick={handleFinish}
               className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-purple-700 shadow-lg"
             >
               See Final Results
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalRound;