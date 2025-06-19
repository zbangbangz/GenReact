import React from 'react';

const Hello: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-700 flex flex-col justify-center items-center text-white px-8">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center drop-shadow-lg">
        Hello, World!
      </h1>
      <p className="text-xl md:text-2xl mb-12 text-center opacity-90 max-w-2xl">
        Welcome to your React TypeScript project with Vite and Tailwind CSS
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-3">⚡</span>
            Fast
          </h3>
          <p className="opacity-90 leading-relaxed">
            Built with Vite for lightning-fast development
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-3">🔷</span>
            TypeScript
          </h3>
          <p className="opacity-90 leading-relaxed">
            Type-safe development experience
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-3">🎨</span>
            Tailwind
          </h3>
          <p className="opacity-90 leading-relaxed">
            Utility-first CSS framework for rapid styling
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hello;