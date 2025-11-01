
import React from 'react';
import { CodeIcon, BookOpenIcon } from './common/Icons';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-dark-surface/80 backdrop-blur-lg border-b border-dark-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/#" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-emerald to-brand-indigo">
              Excel Formula Companion
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <a href="#/" className="text-dark-text-secondary hover:text-dark-text-primary transition-colors">
              Search
            </a>
            <a href="#/playground" className="flex items-center gap-1 text-dark-text-secondary hover:text-dark-text-primary transition-colors">
              <CodeIcon className="w-4 h-4" /> Playground
            </a>
            <a href="#/guide/getting-started" className="flex items-center gap-1 text-dark-text-secondary hover:text-dark-text-primary transition-colors">
                <BookOpenIcon className="w-4 h-4" /> Guides
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
