import React, { useState } from 'react';
import { Player } from '../types';
import { CHILDREN_DATA } from '../constants';
import { Shuffle, ArrowRight } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (players: Player[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [orderedChildren, setOrderedChildren] = useState(CHILDREN_DATA);
  const [parentNames, setParentNames] = useState<string[]>(['', '', '']);
  const [isShuffled, setIsShuffled] = useState(false);

  const handleShuffle = () => {
    const shuffled = [...orderedChildren].sort(() => Math.random() - 0.5);
    setOrderedChildren(shuffled);
    setIsShuffled(true);
  };

  const handleStart = () => {
    if (parentNames.some(name => !name.trim())) {
      alert("Please enter all parent names!");
      return;
    }

    const newPlayers: Player[] = orderedChildren.map((child, index) => ({
      id: child.name,
      childName: child.name,
      childAge: child.age,
      parentName: parentNames[index],
      score: 0,
      color: child.color
    }));

    onComplete(newPlayers);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-300">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Let's Pick Teams!</h2>
      
      {!isShuffled ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-8">Who will choose their parent first?</p>
          <button 
            onClick={handleShuffle}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto"
          >
            <Shuffle className="w-8 h-8" />
            Random Draw
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <p className="text-center text-lg text-gray-600 mb-4">Enter Parent names in the randomly drawn order:</p>
          
          {orderedChildren.map((child, idx) => (
            <div key={child.name} className="flex items-center gap-4 bg-orange-50 p-4 rounded-xl border-2 border-orange-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-xl font-bold text-white shadow-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <span className="block text-sm text-gray-500 font-bold uppercase">{child.name} ({child.age})</span>
                <input
                  type="text"
                  placeholder={`${child.name}'s Parent`}
                  value={parentNames[idx]}
                  onChange={(e) => {
                    const newNames = [...parentNames];
                    newNames[idx] = e.target.value;
                    setParentNames(newNames);
                  }}
                  className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none font-bold text-lg"
                />
              </div>
            </div>
          ))}

          <button 
            onClick={handleStart}
            className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            Start The Game <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default SetupScreen;
