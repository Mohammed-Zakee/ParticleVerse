import React, { useState } from 'react';
import { useParticleContext } from '../context/ParticleContext';
import { 
  Settings, 
  Droplets, 
  Palette, 
  BarChart, 
  X, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

const ControlPanel: React.FC = () => {
  const { settings, updateSettings } = useParticleContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('particles');

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className={`
      fixed top-4 right-4 z-10 bg-black/30 backdrop-blur-md
      rounded-xl overflow-hidden transition-all duration-300 ease-in-out
      ${isOpen ? 'w-72 md:w-80' : 'w-12'}
      text-white shadow-xl border border-white/10
    `}>
      {/* Toggle button */}
      <button 
        onClick={togglePanel}
        className="absolute top-3 left-3 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Header */}
      <div className="px-6 py-3 flex items-center border-b border-white/10">
        <Settings className="text-indigo-400 mr-2" size={16} />
        <h3 className="text-sm font-semibold">
          {isOpen ? 'Controls' : ''}
        </h3>
      </div>

      {/* Control panel content */}
      {isOpen && (
        <div className="p-4">
          {/* Tabs */}
          <div className="flex mb-4 bg-black/20 rounded-lg p-1">
            <button
              className={`flex-1 py-1 text-xs rounded-md transition-colors ${activeTab === 'particles' ? 'bg-indigo-500 text-white' : 'text-white/70 hover:text-white'}`}
              onClick={() => setActiveTab('particles')}
            >
              <Droplets size={14} className="inline mr-1" />
              Particles
            </button>
            <button
              className={`flex-1 py-1 text-xs rounded-md transition-colors ${activeTab === 'colors' ? 'bg-indigo-500 text-white' : 'text-white/70 hover:text-white'}`}
              onClick={() => setActiveTab('colors')}
            >
              <Palette size={14} className="inline mr-1" />
              Colors
            </button>
            <button
              className={`flex-1 py-1 text-xs rounded-md transition-colors ${activeTab === 'behavior' ? 'bg-indigo-500 text-white' : 'text-white/70 hover:text-white'}`}
              onClick={() => setActiveTab('behavior')}
            >
              <BarChart size={14} className="inline mr-1" />
              Behavior
            </button>
          </div>

          {/* Particles Tab */}
          {activeTab === 'particles' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1 text-gray-300">Particle Count: {settings.particleCount}</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={settings.particleCount}
                  onChange={(e) => updateSettings({ particleCount: parseInt(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1 text-gray-300">Particle Size: {settings.particleSize}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={settings.particleSize}
                  onChange={(e) => updateSettings({ particleSize: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="glow"
                  checked={settings.particleGlow}
                  onChange={(e) => updateSettings({ particleGlow: e.target.checked })}
                  className="mr-2 accent-indigo-500"
                />
                <label htmlFor="glow" className="text-xs text-gray-300">Enable Glow Effect</label>
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-2 text-gray-300">Color Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {['neon', 'pastel', 'ocean', 'sunset', 'monochrome'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => updateSettings({ colorTheme: theme })}
                      className={`
                        py-1 px-2 text-xs rounded capitalize 
                        ${settings.colorTheme === theme ? 'ring-2 ring-indigo-500 bg-indigo-500/20' : 'bg-black/30 hover:bg-black/40'}
                      `}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Behavior Tab */}
          {activeTab === 'behavior' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1 text-gray-300">Particle Speed: {settings.particleSpeed.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings.particleSpeed}
                  onChange={(e) => updateSettings({ particleSpeed: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-2 text-gray-300">Interaction Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {['attract', 'repel', 'orbit', 'random'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateSettings({ interactionMode: mode })}
                      className={`
                        py-1 px-2 text-xs rounded capitalize 
                        ${settings.interactionMode === mode ? 'ring-2 ring-indigo-500 bg-indigo-500/20' : 'bg-black/30 hover:bg-black/40'}
                      `}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;