
import React, { useState, useMemo, useContext } from 'react';
import { functions } from '../data/functions';
import { guides } from '../data/guides';
import FunctionCard from './FunctionCard';
import { SearchIcon, ChevronRightIcon } from './common/Icons';
import { CategoryIcons } from './common/Icons';
import { AppContext } from '../App';
import { ExcelFunction } from '../types';
import { useDebounce } from '../hooks/useDebounce';

const categories = Array.from(new Set(functions.map(f => f.category))).sort();

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const appContext = useContext(AppContext);

  const filteredFunctions = useMemo(() => {
    let results: ExcelFunction[] = functions;

    if (showBookmarked) {
      results = results.filter(f => appContext?.bookmarks.includes(f.name));
    }
    
    if (activeCategory) {
      results = results.filter(f => f.category === activeCategory);
    }

    if (debouncedSearchTerm) {
      const lowercasedTerm = debouncedSearchTerm.toLowerCase();
      results = results.filter(f =>
        f.name.toLowerCase().includes(lowercasedTerm) ||
        f.shortDescription.toLowerCase().includes(lowercasedTerm) ||
        f.tags.some(t => t.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    return results;
  }, [debouncedSearchTerm, activeCategory, showBookmarked, appContext?.bookmarks]);

  return (
    <div className="space-y-8">
      <section className="text-center animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
          Master any Excel Formula
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-dark-text-secondary">
          Your complete, searchable guide to every function. Fast, accessible, and always up-to-date.
        </p>
      </section>

      <div className="sticky top-16 z-40 bg-dark-bg py-4 -my-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
          <input
            type="text"
            placeholder="Search for a function (e.g., XLOOKUP, SUMIF)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => { setActiveCategory(null); setShowBookmarked(false); }} className={`px-3 py-1 text-sm rounded-full transition ${!activeCategory && !showBookmarked ? 'bg-brand-indigo text-white' : 'bg-dark-surface hover:bg-dark-border'}`}>
                All
            </button>
            <button onClick={() => { setShowBookmarked(!showBookmarked); setActiveCategory(null); }} className={`px-3 py-1 text-sm rounded-full transition ${showBookmarked ? 'bg-brand-indigo text-white' : 'bg-dark-surface hover:bg-dark-border'}`}>
                Bookmarked
            </button>
            {categories.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setShowBookmarked(false); }} className={`px-3 py-1 text-sm rounded-full transition ${activeCategory === cat ? 'bg-brand-indigo text-white' : 'bg-dark-surface hover:bg-dark-border'}`}>
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFunctions.map(func => (
            <FunctionCard key={func.name} func={func} />
          ))}
        </div>
        {filteredFunctions.length === 0 && (
            <div className="text-center py-16 text-dark-text-secondary">
                <p className="font-semibold">No functions found.</p>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Learning Path Guides</h2>
        <div className="space-y-3">
            {guides.map(guide => (
                <a key={guide.id} href={`#/guide/${guide.id}`} className="block p-4 bg-dark-surface rounded-lg border border-dark-border hover:border-brand-indigo transition-all duration-300 group">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${guide.category === 'Beginner' ? 'bg-green-500/20 text-green-300' : guide.category === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{guide.category}</span>
                            <h3 className="font-bold mt-1">{guide.title}</h3>
                            <p className="text-sm text-dark-text-secondary">{guide.shortDescription}</p>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 text-dark-text-secondary group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </div>
                </a>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
