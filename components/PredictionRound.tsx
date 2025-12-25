import React, { useState, useEffect } from 'react';
import { Player, QuestionCategory } from '../types';
import { ROUND_1_CATEGORIES, ROUND_2_CATEGORIES } from '../constants';
import { Timer, Check, X, ArrowRight, Play } from 'lucide-react';

interface PredictionRoundProps {
  roundNumber: 1 | 2;
  players: Player[];
  updateScore: (playerId: string, points: number) => void;
  onRoundComplete: () => void;
}

const PredictionRound: React.FC<PredictionRoundProps> = ({ roundNumber, players, updateScore, onRoundComplete }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [phase, setPhase] = useState<'predict' | 'playing' | 'scoring'>('predict');
  const [prediction, setPrediction] = useState(0);
  const [actualScore, setActualScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentPlayer = players[currentPlayerIndex];
  const categories = roundNumber === 1 
    ? ROUND_1_CATEGORIES[currentPlayer.childName] 
    : ROUND_2_CATEGORIES[currentPlayer.childName];
  
  // Automatically select the first category
  const currentCategory = categories[0];

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setPhase('scoring');
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimerActive(true);
    setPhase('playing');
  };

  const calculatePoints = () => {
    // Rules:
    // < Prediction: 5x per answer
    // >= Prediction: 25x up to Prediction + 5x for extras
    
    if (actualScore < prediction) {
      return actualScore * 5;
    } else {
      const basePoints = prediction * 25;
      const extraPoints = (actualScore - prediction) * 5;
      return basePoints + extraPoints;
    }
  };

  const handleScoreUpdate = (isCorrect: boolean) => {
    if (roundNumber === 1) {
      // Round 1 Logic: Trivia Flow
      // Check: +1 Score, Next Question
      // X: No Score Change, Next Question
      
      if (isCorrect) {
        setActualScore(prev => prev + 1);
      }
      
      // Move to next question automatically for both Correct and Wrong
      setCurrentQuestionIndex(prev => {
        const maxQuestions = currentCategory.questions?.length || 1;
        // If we reach the end, we just stay at the end (or could wrap, but staying is safer)
        return Math.min(maxQuestions - 1, prev + 1);
      });

    } else {
      // Round 2 Logic: List Counter (Manual +)
      if (isCorrect) {
        setActualScore(prev => prev + 1);
      }
    }
  };

  const handleNextPlayer = () => {
    const points = calculatePoints();
    updateScore(currentPlayer.id, points);

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setPhase('predict');
      setPrediction(0);
      setActualScore(0);
      setTimeLeft(60);
      setCurrentQuestionIndex(0);
    } else {
      onRoundComplete();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-purple-800 drop-shadow-sm">
          Round {roundNumber}: {roundNumber === 1 ? 'Trivia Prediction' : 'List Prediction'}
        </h2>
        <div className="mt-4 flex justify-center items-center gap-3">
          <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-purple-100">
            <span className="text-gray-500 font-bold uppercase text-sm">Now Playing</span>
            <p className="text-2xl font-bold text-purple-600">{currentPlayer.parentName} & {currentPlayer.childName}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border-b-8 border-purple-200 min-h-[400px] flex flex-col justify-center">
        
        {/* Phase 1: Parent Prediction */}
        {phase === 'predict' && currentCategory && (
          <div className="space-y-8 text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-700">
              How many {roundNumber === 1 ? 'questions' : 'items'} in <span className="text-orange-500">{currentCategory.category}</span> can {currentPlayer.childName} answer?
            </h3>
            
            <div className="flex items-center justify-center gap-8">
              <button 
                onClick={() => setPrediction(Math.max(0, prediction - 1))}
                className="w-16 h-16 rounded-full bg-red-100 text-red-600 font-bold text-3xl hover:bg-red-200"
              >-</button>
              <div className="text-8xl font-black text-purple-600">{prediction}</div>
              <button 
                onClick={() => setPrediction(prediction + 1)}
                className="w-16 h-16 rounded-full bg-green-100 text-green-600 font-bold text-3xl hover:bg-green-200"
              >+</button>
            </div>

            <button
              onClick={startTimer}
              className="mt-8 bg-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
            >
              <Play fill="white" /> Start Timer
            </button>
          </div>
        )}

        {/* Phase 2: Gameplay */}
        {phase === 'playing' && currentCategory && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center mb-8">
               <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border-8 ${timeLeft < 10 ? 'border-red-500 text-red-600 animate-pulse' : 'border-purple-500 text-purple-600'}`}>
                 <span className="text-5xl font-black">{timeLeft}</span>
                 <Timer className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-400 rounded-full" />
               </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              {roundNumber === 1 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400 uppercase font-bold">Category: {currentCategory.category}</p>
                    <p className="text-sm text-gray-400 font-bold">Q: {currentQuestionIndex + 1} / {currentCategory.questions?.length || '?'}</p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-purple-100 min-h-[160px] flex items-center justify-center relative">
                     <p className="text-2xl md:text-3xl font-bold text-center text-gray-800 leading-snug">
                       {currentCategory.questions?.[currentQuestionIndex] || "No more questions available"}
                     </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 uppercase font-bold">Category</p>
                  <p className="text-3xl font-bold text-gray-800">{currentCategory.category}</p>
                  <p className="text-sm text-gray-500 italic">Host: Click checkmark for every correct answer.</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
               <p className="text-gray-500 font-bold uppercase">Answers Tracker</p>
               <div className="flex items-center gap-6">
                {roundNumber === 1 && (
                  <button 
                    onClick={() => handleScoreUpdate(false)}
                    className="p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors transform active:scale-95"
                    aria-label="Wrong / Next"
                  ><X size={48} strokeWidth={3} /></button>
                )}
                
                <span className="text-6xl font-black text-gray-800 min-w-[3ch]">{actualScore}</span>
                
                <button 
                  onClick={() => handleScoreUpdate(true)}
                  className="p-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors transform active:scale-95"
                  aria-label="Correct"
                ><Check size={48} strokeWidth={3} /></button>
               </div>
               {roundNumber === 1 && <p className="text-xs text-gray-400">(X = Next Question, ✓ = Correct & Next)</p>}
            </div>
            
            <button onClick={() => { setTimerActive(false); setPhase('scoring'); }} className="text-gray-400 underline text-sm hover:text-red-500">End Round Early</button>
          </div>
        )}

        {/* Phase 3: Scoring */}
        {phase === 'scoring' && (
          <div className="text-center space-y-8 animate-fade-in">
            <h3 className="text-3xl font-bold text-purple-800">Time's Up!</h3>
            
            <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
              <div className="bg-gray-100 p-6 rounded-2xl">
                <p className="text-gray-500 font-bold uppercase text-sm">Predicted</p>
                <p className="text-4xl font-black text-gray-800">{prediction}</p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-2xl border-2 border-yellow-300">
                <p className="text-yellow-700 font-bold uppercase text-sm">Actual</p>
                <p className="text-4xl font-black text-yellow-800">{actualScore}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-100 shadow-inner">
              <p className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">Score Calculation</p>
              
              {actualScore < prediction ? (
                <div className="space-y-2">
                  <p className="text-xl font-bold text-red-500">Missed Prediction</p>
                  <p className="text-sm text-gray-500">You needed {prediction}, but got {actualScore}.</p>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 mt-2 inline-block w-full max-w-md">
                     <span className="font-mono text-lg text-gray-700">{actualScore} correct × 5 pts = </span>
                     <span className="font-black text-3xl text-red-600 block mt-1">{calculatePoints()} pts</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xl font-bold text-green-500">Hit Prediction!</p>
                  <p className="text-sm text-gray-500">You predicted {prediction} and got {actualScore}.</p>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100 mt-2 inline-block w-full max-w-md">
                     <span className="font-mono text-sm text-gray-500 block mb-1">({prediction} × 25) + ({actualScore - prediction} extras × 5)</span>
                     <span className="font-black text-3xl text-green-600">{calculatePoints()} pts</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleNextPlayer}
              className="bg-green-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-green-600 transition-all flex items-center gap-2 mx-auto"
            >
              Next <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionRound;