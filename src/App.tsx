import React from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import { ParticleProvider } from './context/ParticleContext';

function App() {
  return (
    <ParticleProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center relative">
          <ParticleCanvas />
          <ControlPanel />
        </main>
        <Footer />
      </div>
    </ParticleProvider>
  );
}

export default App;