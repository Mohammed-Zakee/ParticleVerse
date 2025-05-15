import React from 'react';
import { Gauge, Circle } from 'lucide-react';

interface StatsDisplayProps {
  fps: number;
  particleCount: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ fps, particleCount }) => {
  // Determine FPS color based on performance
  const getFpsColor = (fps: number) => {
    if (fps >= 50) return 'text-green-500';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 text-white/80 text-xs flex items-center space-x-4 border border-white/10">
      <div className="flex items-center">
        <Gauge className="w-3 h-3 mr-1" />
        <span className={getFpsColor(fps)}>
          {fps} FPS
        </span>
      </div>
      <div className="flex items-center">
        <Circle className="w-3 h-3 mr-1" />
        <span>{particleCount} particles</span>
      </div>
    </div>
  );
};

export default StatsDisplay;