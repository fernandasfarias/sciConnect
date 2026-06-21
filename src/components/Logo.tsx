import React from "react";

interface LogoProps {
  className?: string; // height styled classes, e.g., "h-10"
  showText?: boolean;
}

export default function Logo({ className = "h-10", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SciConnect do Dcomp Logo Icon with high fidelity SVG */}
      <svg
        viewBox="0 0 120 120"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Logo gradient: Cobalt Blue to Electric Purple */}
          <linearGradient id="sciGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Outer speech-bubble combined with abstract brain shell */}
        {/* Symmetrical outline with tail at bottom-right */}
        <path
          d="M 60,15 
             C 85,15 105,32 105,53 
             C 105,62 101,71 94,78 
             C 99,87 101,92 101,93 
             C 101,94 100,95 99,95 
             C 98,95 90,92 81,86 
             C 74,90 67,92 60,92 
             C 35,92 15,75 15,53 
             C 15,31 35,15 60,15 Z"
          stroke="url(#sciGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Inside: Science Chemistry/Lab Flask Beaker */}
        {/* Flask Rim & Neck */}
        <path
          d="M 68,36 L 78,36"
          stroke="url(#sciGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 73,36 L 73,46"
          stroke="url(#sciGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Flask Body */}
        <path
          d="M 73,46 L 61,68 C 59,71 61,75 65,75 L 85,75 C 89,75 91,71 89,68 L 77,46"
          stroke="url(#sciGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Liquid within flask */}
        <path
          d="M 63,64 C 67,61 71,67 75,64 C 79,61 83,67 87,64 L 86,72 C 86,73 85,74 84,74 L 66,74 C 65,74 64,73 64,72 Z"
          fill="url(#sciGrad)"
          opacity="0.9"
        />
        {/* Droplets above beaker */}
        <circle cx="73" cy="29" r="1.5" fill="url(#sciGrad)" />

        {/* Left Inside: Connected Brain Network Nodes */}
        {/* Edges */}
        <line x1="52" y1="23" x2="33" y2="33" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="52" y1="23" x2="48" y2="48" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="33" y1="33" x2="33" y2="52" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="33" y1="33" x2="48" y2="48" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="33" y1="52" x2="27" y2="71" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="33" y1="52" x2="48" y2="48" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="27" y1="71" x2="40" y2="88" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="27" y1="71" x2="48" y2="48" stroke="url(#sciGrad)" strokeWidth="2.5" />
        <line x1="40" y1="88" x2="48" y2="48" stroke="url(#sciGrad)" strokeWidth="2.5" />

        {/* Nodes */}
        <circle cx="52" cy="23" r="3.5" fill="url(#sciGrad)" />
        <circle cx="33" cy="33" r="3.5" fill="url(#sciGrad)" />
        <circle cx="33" cy="52" r="3.5" fill="url(#sciGrad)" />
        <circle cx="27" cy="71" r="3.5" fill="url(#sciGrad)" />
        <circle cx="40" cy="88" r="3.5" fill="url(#sciGrad)" />
        
        {/* central cluster primary node */}
        <circle cx="48" cy="48" r="5" fill="url(#sciGrad)" />
        <circle cx="48" cy="48" r="1.8" fill="white" className="dark:fill-slate-900 transition-colors" />
      </svg>

      {showText && (
        <div className="flex flex-col tracking-tight leading-none">
          <span className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            SciConnect
          </span>
          <span className="text-[9px] uppercase font-bold text-slate-800 dark:text-slate-300 tracking-wider mt-0.5">
            do Dcomp
          </span>
        </div>
      )}
    </div>
  );
}
