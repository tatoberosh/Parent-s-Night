import React from 'react';
import { Player } from '../types';
import { Trophy } from 'lucide-react';

interface ScoreboardProps {
  players: Player[];
  compact?: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, compact = false }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className={`w-full bg-white/90 backdrop-blur-sm border-b-4 border-yellow-400 p-4 shadow-md ${compact ? 'fixed top-0 left-0 right-0 z-50' : 'rounded-2xl mb-8'}`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-700 font-bold text-xl">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span>Scores</span>
        </div>
        
        <div className="flex gap-4 md:gap-8">
          {players.map((player) => (
            <div key={player.id} className="flex flex-col items-center">
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
                {player.childName} & {player.parentName || 'Parent'}
              </span>
              <span className={`text-xl md:text-2xl font-black ${player.score === sortedPlayers[0].score ? 'text-green-600' : 'text-gray-800'}`}>
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
