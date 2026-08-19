import React, { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
}

interface FallingHeartsProps {
  density?: number;
}

export const FallingHearts: React.FC<FallingHeartsProps> = ({ density = 40 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(244, 114, 182, 0.75)', // pink-400
      'rgba(251, 113, 133, 0.75)', // rose-400
      'rgba(244, 63, 94, 0.7)',   // rose-500
      'rgba(236, 72, 153, 0.65)',  // pink-500
      'rgba(253, 164, 175, 0.8)',  // rose-300
      'rgba(255, 255, 255, 0.85)', // white sparkle
    ];

    const createHeart = (initialY = -20): Heart => ({
      x: Math.random() * width,
      y: initialY === -20 ? Math.random() * -100 : initialY,
      size: Math.random() * 16 + 10, // 10px to 26px
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      swayAmplitude: Math.random() * 2 + 1,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
    });

    const hearts: Heart[] = Array.from({ length: density }, () =>
      createHeart(Math.random() * height)
    );

    // Draw path for heart shape
    const drawHeartShape = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(x, y + topCurveHeight);
      // top left curve
      context.bezierCurveTo(
        x, y,
        x - size / 2, y,
        x - size / 2, y + topCurveHeight
      );
      // bottom left curve
      context.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2,
        x, y + size,
        x, y + size
      );
      // bottom right curve
      context.bezierCurveTo(
        x, y + size,
        x + size / 2, y + (size + topCurveHeight) / 2,
        x + size / 2, y + topCurveHeight
      );
      // top right curve
      context.bezierCurveTo(
        x + size / 2, y,
        x, y,
        x, y + topCurveHeight
      );
      context.closePath();
    };

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 1;

      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];

        // Sway logic
        h.y += h.speedY;
        h.x += Math.sin(step * h.swaySpeed + h.swayOffset) * h.swayAmplitude + h.speedX;
        h.rotation += h.rotationSpeed;

        // Reset if off bottom
        if (h.y > height + 30) {
          hearts[i] = createHeart(-30);
        }

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rotation);
        ctx.fillStyle = h.color;
        ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
        ctx.shadowBlur = 8;
        drawHeartShape(ctx, 0, 0, h.size);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Spawn heart on click
    const handleCanvasClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        const extraHeart = createHeart(e.clientY);
        extraHeart.x = e.clientX + (Math.random() - 0.5) * 40;
        extraHeart.speedY = Math.random() * -2 - 1; // Float up first
        hearts.push(extraHeart);
      }
      if (hearts.length > 80) {
        hearts.splice(0, 5);
      }
    };

    window.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
