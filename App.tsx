
import React, { useState, useEffect, createContext, useCallback } from 'react';
import Home from './components/Home';
import FunctionDetail from './components/FunctionDetail';
import Playground from './components/Playground';
import GuideViewer from './components/GuideViewer';
import Header from './components/Header';
import { ExcelFunction, Guide } from './types';
import { functions } from './data/functions';
import { guides } from './data/guides';

type Route = 
  | { name: 'home' }
  | { name: 'function'; id: string }
  | { name: 'playground' }
  | { name: 'guide'; id: string };

export const AppContext = createContext<{
  bookmarks: string[];
  toggleBookmark: (functionName: string) => void;
} | null>(null);

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('excel-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.slice(1);
    const [path, id] = hash.split('/');

    if (path === 'function' && id) {
      setRoute({ name: 'function', id: decodeURIComponent(id) });
    } else if (path === 'playground') {
      setRoute({ name: 'playground' });
    } else if (path === 'guide' && id) {
      setRoute({ name: 'guide', id });
    } else {
      setRoute({ name: 'home' });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial route check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  useEffect(() => {
    localStorage.setItem('excel-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (functionName: string) => {
    setBookmarks(prev => 
      prev.includes(functionName) 
        ? prev.filter(b => b !== functionName) 
        : [...prev, functionName]
    );
  };

  const renderContent = () => {
    switch (route.name) {
      case 'function':
        const func = functions.find(f => f.name.toUpperCase() === route.id.toUpperCase());
        return func ? <FunctionDetail func={func} /> : <Home />;
      case 'playground':
        return <Playground />;
      case 'guide':
        const guide = guides.find(g => g.id === route.id);
        return guide ? <GuideViewer guide={guide} /> : <Home />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <AppContext.Provider value={{ bookmarks, toggleBookmark }}>
      <div className="min-h-screen bg-dark-bg text-dark-text-primary font-sans">
        <Header />
        <main className="container mx-auto p-4 md:p-6 animate-fade-in">
          {renderContent()}
        </main>
        <footer className="text-center p-4 text-xs text-dark-text-secondary/50">
            <p>Excel Formula Companion is an independent educational resource and is not affiliated with, endorsed by, or sponsored by Microsoft Corporation. Microsoft Excel is a trademark of Microsoft Corporation.</p>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
