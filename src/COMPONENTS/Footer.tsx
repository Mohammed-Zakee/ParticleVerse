import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-3 px-6 bg-black/20 backdrop-blur-sm text-gray-400 text-sm flex justify-between items-center">
      <div className="flex items-center space-x-1">
        <span>Made with</span>
        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        <span>in 2025</span>
      </div>
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-1 text-gray-400 hover:text-white transition duration-200"
      >
        <Github className="h-4 w-4" />
        <span>Star on GitHub</span>
      </a>
    </footer>
  );
};

export default Footer;