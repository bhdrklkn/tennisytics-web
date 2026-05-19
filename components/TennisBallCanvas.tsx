"use client";

import { useEffect, useRef } from "react";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rotation: number;
  rotSpeed: number;
}

export default function TennisBallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const ballsRef = useRef<Ball[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll);

    // Init balls
    const count = 4;
    ballsRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.2 + (i % 2 === 0 ? 0.6 : -0.6),
      vy: (Math.random() - 0.5) * 1.2 + (i % 2 === 0 ? 0.5 : -0.5),
      r: 22 + Math.random() * 14,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
    }));

    const drawBall = (b: Ball) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rotation);

      // Ball body
      const grad = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, b.r * 0.1, 0, 0, b.r);
      grad.addColorStop(0, "#d4e84b");
      grad.addColorStop(1, "#a8c422");
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Tennis seam curves
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(b.r * 0.15, 0, b.r * 0.72, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-b.r * 0.15, 0, b.r * 0.72, Math.PI - Math.PI * 0.45, Math.PI + Math.PI * 0.45);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const speedBoost = 1 + scrollRef.current * 0.0008;

      ballsRef.current.forEach((b) => {
        b.x += b.vx * speedBoost;
        b.y += b.vy * speedBoost;
        b.rotation += b.rotSpeed * speedBoost;

        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
        if (b.x + b.r > canvas.width) { b.x = canvas.width - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy); }
        if (b.y + b.r > canvas.height) { b.y = canvas.height - b.r; b.vy = -Math.abs(b.vy); }

        ctx.globalAlpha = 0.1;
        drawBall(b);
        ctx.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
