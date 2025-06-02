
export const TechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="0" x2="100" y2="100" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="0" y1="25" x2="100" y2="125" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="0" y1="50" x2="100" y2="150" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="25" y1="0" x2="125" y2="100" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="50" y1="0" x2="150" y2="100" stroke="url(#lineGradient)" strokeWidth="0.1" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};
