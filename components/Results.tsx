import React from 'react';
import { Player } from '../types';
import { Trophy, RefreshCcw, Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsProps {
  players: Player[];
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ players, onReset }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const data = players.map(p => ({
    name: p.childName,
    score: p.score,
    color: p.color.replace('bg-', '') // minimal hack for chart colors
  }));
  
  // Map tailwind color names to hex for Recharts
  const getColorHex = (twClass: string) => {
    if (twClass.includes('pink')) return '#ec4899';
    if (twClass.includes('purple')) return '#a855f7';
    if (twClass.includes('blue')) return '#3b82f6';
    return '#8884d8';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-b-8 border-yellow-400 text-center">
      <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
      <h2 className="text-5xl font-black text-purple-800 mb-2">WINNER!</h2>
      <p className="text-2xl font-bold text-gray-600 mb-10">
        {winner.childName} & {winner.parentName}
      </p>

      <div className="h-64 w-full mb-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorHex(players[index].color)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {sortedPlayers.map((player, idx) => (
          <div key={player.id} className={`p-4 rounded-xl border-2 flex items-center gap-4 ${idx === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-100'}`}>
            <div className="font-black text-2xl text-gray-400">#{idx + 1}</div>
            <div className="text-left">
              <div className="font-bold text-gray-800">{player.childName}</div>
              <div className="text-sm text-gray-500">{player.score} pts</div>
            </div>
            {idx === 0 && <Medal className="ml-auto text-yellow-500" />}
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto"
      >
        <RefreshCcw size={20} /> Play Again
      </button>
    </div>
  );
};

export default Results;
