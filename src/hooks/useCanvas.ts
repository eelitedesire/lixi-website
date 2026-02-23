import { useEffect, useRef } from 'react';

export const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  options: { fps?: number } = {}
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { fps = 60 } = options;

  useEffect(() => {
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
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
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
  }, [draw, fps]);

  return canvasRef;
};
