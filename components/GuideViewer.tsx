
import React from 'react';
import { Guide } from '../types';

interface GuideViewerProps {
  guide: Guide;
}

const GuideViewer: React.FC<GuideViewerProps> = ({ guide }) => {
  // Simple "Markdown" to HTML renderer
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-3 border-b border-dark-border pb-2">{line.substring(3)}</h2>;
      }
      if (line.startsWith('`') && line.endsWith('`')) {
        return <p key={index}><code className="bg-dark-surface px-2 py-1 rounded-md font-mono text-sm text-brand-emerald">{line.substring(1, line.length - 1)}</code></p>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-4 text-dark-text-secondary leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <header className="mb-8">
        <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${guide.category === 'Beginner' ? 'bg-green-500/20 text-green-300' : guide.category === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{guide.category}</span>
        <h1 className="text-4xl font-extrabold mt-3">{guide.title}</h1>
        <p className="text-lg text-dark-text-secondary mt-2">{guide.shortDescription}</p>
      </header>
      <article className="prose prose-invert max-w-none">
        {renderContent(guide.content)}
      </article>
    </div>
  );
};

export default GuideViewer;
