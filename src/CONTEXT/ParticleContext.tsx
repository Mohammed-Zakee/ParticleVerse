import React, { createContext, useContext, useState, ReactNode } from 'react';

type ColorTheme = 'neon' | 'pastel' | 'ocean' | 'sunset' | 'monochrome';
type InteractionMode = 'attract' | 'repel' | 'orbit' | 'random';

interface ParticleSettings {
  particleCount: number;
  particleSize: number;
  particleSpeed: number;
  particleGlow: boolean;
  colorTheme: ColorTheme;
  interactionMode: InteractionMode;
}

interface ParticleContextType {
  settings: ParticleSettings;
  updateSettings: (newSettings: Partial<ParticleSettings>) => void;
}

const defaultSettings: ParticleSettings = {
  particleCount: 150,
  particleSize: 3,
  particleSpeed: 1,
  particleGlow: true,
  colorTheme: 'neon',
  interactionMode: 'attract'
};

const ParticleContext = createContext<ParticleContextType | undefined>(undefined);

export const ParticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ParticleSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<ParticleSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ParticleContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ParticleContext.Provider>
  );
};

export const useParticleContext = (): ParticleContextType => {
  const context = useContext(ParticleContext);
  if (context === undefined) {
    throw new Error('useParticleContext must be used within a ParticleProvider');
  }
  return context;
};