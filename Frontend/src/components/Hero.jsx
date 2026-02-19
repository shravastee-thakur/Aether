import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen mt-10 w-full overflow-hidden bg-white flex items-center justify-center font-sans text-slate-900 selection:bg-indigo-500/20">
      {/* --- PERFORMANCE-OPTIMIZED LIGHT BACKGROUND --- */}

      {/* 1. Base Background */}
      <div className="absolute inset-0 bg-white z-0" />

      {/* 2. Soft Aurora Gradients (GPU Accelerated) */}
      {/* Much softer opacity for light mode to maintain text readability */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-100/60 rounded-full blur-[100px] animate-orbit-slow z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-100/60 rounded-full blur-[100px] animate-orbit-slow-reverse z-0" />
      <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-purple-100/40 rounded-full blur-[80px] animate-orbit-slow delay-1000 z-0" />

      {/* 3. Tech Grid Pattern (Dark lines on Light) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 4. Noise Grain (Inline SVG - Dark noise for light mode) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-slate-200 backdrop-blur-md shadow-sm mb-8 animate-fade-in-up">
          {/* <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span> */}
          {/* <span className="text-xs font-medium text-slate-600 tracking-wide uppercase">
            Aether Network v2.6
          </span> */}
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] max-w-5xl mx-auto animate-fade-in-up delay-100">
          Elevate Your Team's <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-slate-800 to-cyan-600">
            Velocity.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
          Experience a workspace that moves at the speed of thought. Aether
          bridges the gap between complex planning and instant execution with
          real-time synchronization that feels like second nature.
        </p>

        {/* CTA Button */}
        <div className="group relative animate-fade-in-up delay-300">
          {/* Subtle Shadow Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <button className="relative flex items-center gap-3 px-8 py-4 bg-slate-900 rounded-lg leading-none text-white font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-900/20">
            <span>Enter the Aether</span>
            <ArrowRight className="w-5 h-5 text-indigo-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        
      </div>

      {/* --- OPTIMIZED CSS --- */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes orbitSlow {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(2%, 2%, 0) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes orbitSlowReverse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-2%, -2%, 0) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          will-change: opacity, transform;
        }

        .animate-orbit-slow {
          animation: orbitSlow 20s ease-in-out infinite;
          will-change: transform;
        }

        .animate-orbit-slow-reverse {
          animation: orbitSlowReverse 25s ease-in-out infinite;
          will-change: transform;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
