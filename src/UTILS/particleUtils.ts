// Types
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface Mouse {
  x: number;
  y: number;
}

type ColorTheme = 'neon' | 'pastel' | 'ocean' | 'sunset' | 'monochrome';
type InteractionMode = 'attract' | 'repel' | 'orbit' | 'random';

// Color themes
const colorThemes = {
  neon: ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#0000ff'],
  pastel: ['#FFB6C1', '#FFDAB9', '#B0E0E6', '#98FB98', '#D8BFD8', '#FFFACD'],
  ocean: ['#063970', '#0353A4', '#023E7D', '#002855', '#001845', '#001233'],
  sunset: ['#F72585', '#B5179E', '#7209B7', '#560BAD', '#480CA8', '#3A0CA3'],
  monochrome: ['#ffffff', '#dddddd', '#bbbbbb', '#999999', '#777777', '#555555']
};

// Create initial particles
export const createParticles = (
  width: number,
  height: number,
  count: number,
  size: number,
  theme: ColorTheme
): Particle[] => {
  const particles: Particle[] = [];
  const colors = colorThemes[theme];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * size + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.5
    });
  }

  return particles;
};

// Update particle positions
export const updateParticles = (
  particles: Particle[],
  mouse: Mouse,
  width: number,
  height: number,
  speed: number,
  mode: InteractionMode
): void => {
  particles.forEach(p => {
    // Basic movement
    p.x += p.speedX * speed;
    p.y += p.speedY * speed;

    // Handle mouse interaction based on mode
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      const force = 0.5 / distance;
      
      switch (mode) {
        case 'attract':
          p.speedX += dx * force * 0.2;
          p.speedY += dy * force * 0.2;
          break;
        case 'repel':
          p.speedX -= dx * force * 0.2;
          p.speedY -= dy * force * 0.2;
          break;
        case 'orbit':
          p.speedX += dy * force * 0.1;
          p.speedY -= dx * force * 0.1;
          break;
        case 'random':
          if (Math.random() > 0.98) {
            p.speedX = (Math.random() - 0.5) * 4;
            p.speedY = (Math.random() - 0.5) * 4;
          }
          break;
      }
    }

    // Limit speed
    const maxSpeed = 5 * speed;
    const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
    if (currentSpeed > maxSpeed) {
      p.speedX = (p.speedX / currentSpeed) * maxSpeed;
      p.speedY = (p.speedY / currentSpeed) * maxSpeed;
    }

    // Add some randomness
    if (Math.random() > 0.97) {
      p.speedX += (Math.random() - 0.5) * 0.5;
      p.speedY += (Math.random() - 0.5) * 0.5;
    }

    // Bounce off edges
    if (p.x < 0 || p.x > width) {
      p.speedX *= -1;
      p.x = p.x < 0 ? 0 : width;
    }
    
    if (p.y < 0 || p.y > height) {
      p.speedY *= -1;
      p.y = p.y < 0 ? 0 : height;
    }
  });
};

// Draw particles on canvas
export const drawParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  glow: boolean
): void => {
  particles.forEach(p => {
    ctx.beginPath();
    ctx.globalAlpha = p.opacity;
    
    if (glow) {
      ctx.shadowBlur = p.size * 2;
      ctx.shadowColor = p.color;
    }
    
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow
    if (glow) {
      ctx.shadowBlur = 0;
    }
    
    ctx.globalAlpha = 1;
  });

  // Draw connections between nearby particles
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 0.5;
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.globalAlpha = 1 - (distance / 100);
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  
  ctx.globalAlpha = 1;
};