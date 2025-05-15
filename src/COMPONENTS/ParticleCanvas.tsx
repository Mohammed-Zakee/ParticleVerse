import React, { useRef, useEffect, useState } from 'react';
import { useParticleContext } from '../context/ParticleContext';
import { createParticles, updateParticles, drawParticles } from '../utils/particleUtils';
import useWindowSize from '../hooks/useWindowSize';
import StatsDisplay from './StatsDisplay';

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();
  const { settings } = useParticleContext();
  const [fps, setFps] = useState(0);
  
  // Animation tracking
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);
  const requestRef = useRef<number>();

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  // Handle touch movement
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas && e.touches[0]) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
  };

  // Reset particles when settings change
  useEffect(() => {
    if (canvasRef.current) {
      particlesRef.current = createParticles(
        canvasRef.current.width,
        canvasRef.current.height,
        settings.particleCount,
        settings.particleSize,
        settings.colorTheme
      );
    }
  }, [settings.particleCount, settings.particleSize, settings.colorTheme, width, height]);

  // Set up canvas and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Create initial particles
    particlesRef.current = createParticles(
      canvas.width,
      canvas.height,
      settings.particleCount,
      settings.particleSize,
      settings.colorTheme
    );

    // Set up event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    
    // Animation loop
    const animate = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      updateParticles(
        particlesRef.current,
        mouseRef.current,
        canvas.width,
        canvas.height,
        settings.particleSpeed,
        settings.interactionMode
      );
      
      drawParticles(ctx, particlesRef.current, settings.particleGlow);
      
      // Calculate FPS
      frameCountRef.current++;
      if (time - lastTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        lastTimeRef.current = time;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [width, height, settings]);

  return (
    <div className="w-full h-full absolute top-0 left-0">
      <canvas
        ref={canvasRef}
        className="block absolute top-0 left-0 w-full h-full"
      />
      <StatsDisplay fps={fps} particleCount={settings.particleCount} />
    </div>
  );
};

export default ParticleCanvas;