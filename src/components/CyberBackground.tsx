"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

interface TelemetryParticle {
  x: number;
  y: number;
  vy: number;
  text: string;
  alpha: number;
  size: number;
  fadeSpeed: number;
}

const TELEMETRY_POOL = [
  "0x8F4A", "0x00D2", "0xAC31", "0x7F22", "0x1E05",
  "10.0.1.45", "192.168.4.10", "172.16.8.22",
  "port:443", "port:8080", "port:22", "port:3389",
  "SYN_SENT", "ESTABLISHED", "LISTEN",
  "PKG_INJECT", "TWIN_SYNC", "C2_ACTIVE",
  "010110", "110001", "001110"
];

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let telemetry: TelemetryParticle[] = [];
    const maxNodes = 60;
    const maxTelemetry = 15;
    const connectionDist = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
      initTelemetry();
    };

    const initNodes = () => {
      nodes = [];
      const count = Math.min(maxNodes, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.5 + 0.1,
          targetAlpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const initTelemetry = () => {
      telemetry = [];
      for (let i = 0; i < maxTelemetry; i++) {
        telemetry.push(createTelemetryParticle(true));
      }
    };

    const createTelemetryParticle = (randomY = false): TelemetryParticle => {
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 20,
        vy: -0.15 - Math.random() * 0.25,
        text: TELEMETRY_POOL[Math.floor(Math.random() * TELEMETRY_POOL.length)],
        alpha: Math.random() * 0.2 + 0.05,
        size: Math.floor(Math.random() * 3) + 7, // 7px to 9px
        fadeSpeed: 0.0002 + Math.random() * 0.0003,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cyber grid gridlines in background
      ctx.strokeStyle = "rgba(6, 182, 212, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw floating telemetry particles
      telemetry.forEach((p, idx) => {
        p.y += p.vy;
        p.alpha -= p.fadeSpeed;

        if (p.alpha <= 0 || p.y < -20) {
          telemetry[idx] = createTelemetryParticle(false);
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
          ctx.font = `${p.size}px monospace`;
          ctx.fillText(p.text, p.x, p.y);
        }
      });

      // Update and draw network nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off bounds
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction (repulsion)
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          node.x += (dx / dist) * force * 1.2;
          node.y += (dy / dist) * force * 1.2;
          node.targetAlpha = 0.8;
        } else {
          node.targetAlpha = Math.max(0.1, node.targetAlpha - 0.01);
        }

        // Smooth alpha changes
        node.alpha += (node.targetAlpha - node.alpha) * 0.1;

        // Draw node
        ctx.fillStyle = `rgba(6, 182, 212, ${node.alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw node connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12 * Math.min(n1.alpha, n2.alpha);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
            
            // Random packet transfer simulation along paths
            if (Math.random() < 0.00015) {
              ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
              ctx.beginPath();
              const px = n1.x + dx * 0.5;
              const py = n1.y + dy * 0.5;
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
