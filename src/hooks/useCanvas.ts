import { useEffect, useRef } from 'react';

export const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  options: { fps?: number; enabled?: boolean } = {}
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Default to 30 fps to reduce CPU work for continuous animations
  const { fps = 30, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return; // don't start any animation when disabled

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let frameCount = 0;
    let animationFrameId: number;
    let lastTime = 0;
    const interval = 1000 / fps;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      // Use setTransform to avoid cumulative scaling when resize is called multiple times
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      if (!document.hidden && time - lastTime >= interval) {
        frameCount++;
        draw(context, frameCount);
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [draw, fps, enabled]);

  return canvasRef;
};
