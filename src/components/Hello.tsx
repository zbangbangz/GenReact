import React from 'react';
import './Hello.css';

const Hello: React.FC = () => {
  return (
    <div className="hello-container">
      <h1 className="hello-title">Hello, World!</h1>
      <p className="hello-subtitle">Welcome to your React TypeScript project with Vite</p>
      <div className="hello-features">
        <div className="feature-card">
          <h3>⚡ Fast</h3>
          <p>Built with Vite for lightning-fast development</p>
        </div>
        <div className="feature-card">
          <h3>🔷 TypeScript</h3>
          <p>Type-safe development experience</p>
        </div>
        <div className="feature-card">
          <h3>⚛️ React</h3>
          <p>Modern React with hooks and components</p>
        </div>
      </div>
    </div>
  );
};

export default Hello;