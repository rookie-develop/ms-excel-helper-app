
import React, { useContext } from 'react';
import { ExcelFunction } from '../types';
import { BookmarkIcon } from './common/Icons';
import { CategoryIcons } from './common/Icons';
import { AppContext } from '../App';

interface FunctionCardProps {
  func: ExcelFunction;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ func }) => {
  const appContext = useContext(AppContext);
  const isBookmarked = appContext?.bookmarks.includes(func.name);
  const CategoryIcon = CategoryIcons[func.category] || CategoryIcons['Default'];

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    appContext?.toggleBookmark(func.name);
  };

  return (
    <a href={`#/function/${func.name}`} className="block p-4 bg-dark-surface rounded-lg border border-dark-border hover:border-brand-indigo transition-all duration-300 group relative">
      <button 
        onClick={handleBookmarkClick} 
        className="absolute top-3 right-3 text-dark-text-secondary hover:text-brand-indigo z-10 p-1"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <BookmarkIcon className="w-5 h-5" isFilled={isBookmarked} />
      </button>

      <div className="flex items-start gap-3">
        <div className="p-2 bg-dark-border/50 rounded-md">
            <CategoryIcon className="w-6 h-6 text-brand-emerald" />
        </div>
        <div>
          <h3 className="font-bold text-dark-text-primary group-hover:text-brand-indigo transition-colors">{func.name}</h3>
          <p className="text-sm text-dark-text-secondary">{func.category}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-dark-text-secondary line-clamp-2">{func.shortDescription}</p>
      <div className="mt-3 flex gap-2 flex-wrap">
        {func.tags.slice(0, 2).map(tag => (
          <span key={tag} className="text-xs bg-dark-border px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>
    </a>
  );
};

export default FunctionCard;
