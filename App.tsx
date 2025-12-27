import React, { useState } from 'react';
import { Player, GamePhase } from './types';
import SetupScreen from './components/SetupScreen';
import Scoreboard from './components/Scoreboard';
import PredictionRound from './components/PredictionRound';
import Round3 from './components/Round3';
import FinalRound from './components/FinalRound';
import Results from './components/Results';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);

  const handleSetupComplete = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setPhase('round1');
  };

  const handleUpdateScore = (playerId: string, pointsToAdd: number) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, score: p.score + pointsToAdd };
      }
      return p;
    }));
  };

  const handleReset = () => {
    setPlayers([]);
    setPhase('setup');
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Sticky Header Scoreboard (except setup/results) */}
      {players.length > 0 && phase !== 'setup' && phase !== 'results' && (
        <Scoreboard players={players} compact />
      )}

      <div className={`container mx-auto px-4 ${phase !== 'setup' && phase !== 'results' ? 'pt-24' : 'pt-12'}`}>
        {/* Header Title for Setup */}
        {phase === 'setup' && (
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-purple-600 drop-shadow-md tracking-tight mb-2">Parents' Evening</h1>
            <p className="text-xl text-purple-400 font-medium">Home Edition</p>
          </div>
        )}

        {/* Phase Rendering */}
        {phase === 'setup' && <SetupScreen onComplete={handleSetupComplete} />}
        
        {phase === 'round1' && (
          <PredictionRound 
            roundNumber={1} 
            players={players} 
            updateScore={handleUpdateScore} 
            onRoundComplete={() => setPhase('round2')} 
          />
        )}

        {phase === 'round2' && (
          <PredictionRound 
            roundNumber={2} 
            players={players} 
            updateScore={handleUpdateScore} 
            onRoundComplete={() => setPhase('round3')} 
          />
        )}

        {phase === 'round3' && (
          <Round3 
            players={players} 
            updateScore={handleUpdateScore} 
            onRoundComplete={() => setPhase('round4')} 
          />
        )}

        {phase === 'round4' && (
          <FinalRound 
            players={players} 
            updateScore={handleUpdateScore} 
            onGameComplete={() => setPhase('results')} 
          />
        )}

        {phase === 'results' && (
          <Results players={players} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;
