
export const ProductPageBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900"></div>
      
      {/* Animated Neon Grid */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full animated-grid"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px),
              linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
          }}
        ></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/20 rotate-45 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 border border-purple-400/20 rotate-12 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-28 h-28 border border-pink-400/20 -rotate-12 animate-pulse delay-2000"></div>

      {/* Neon Orbs */}
      <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-2/3 right-1/5 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M20,20 L40,20 L40,40 L60,40 L60,20 L80,20" stroke="url(#circuitGradient)" strokeWidth="0.2" fill="none" />
          <path d="M20,60 L40,60 L40,80 L60,80 L60,60 L80,60" stroke="url(#circuitGradient)" strokeWidth="0.2" fill="none" />
          <circle cx="40" cy="20" r="1" fill="#06b6d4" opacity="0.3" />
          <circle cx="60" cy="40" r="1" fill="#06b6d4" opacity="0.3" />
          <circle cx="40" cy="80" r="1" fill="#06b6d4" opacity="0.3" />
        </svg>
      </div>

      <style>
        {`
          @keyframes grid-float {
            0%, 100% { 
              transform: translate(0, 0) rotate(0deg); 
            }
            33% { 
              transform: translate(10px, -5px) rotate(1deg); 
            }
            66% { 
              transform: translate(-5px, 10px) rotate(-1deg); 
            }
          }
          
          .animated-grid {
            animation: grid-float 20s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};
