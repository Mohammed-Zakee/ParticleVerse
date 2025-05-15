import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-black/20 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <Sparkles className="text-indigo-400 h-6 w-6" />
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          ParticleVerse
        </h1>
      </div>
      <div className="text-gray-400 text-sm hidden md:block">
        A stunning interactive particle system
      </div>
    </header>
  );
};

export default Header;