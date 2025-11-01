
import React, { useState, useContext } from 'react';
import { ExcelFunction, Example } from '../types';
import { AppContext } from '../App';
import { BookmarkIcon, CopyIcon, CheckIcon, ExternalLinkIcon, LightbulbIcon, AlertTriangleIcon } from './common/Icons';

interface FunctionDetailProps {
  func: ExcelFunction;
}

const FunctionDetail: React.FC<FunctionDetailProps> = ({ func }) => {
  const [copiedSyntax, setCopiedSyntax] = useState(false);
  const [copiedExample, setCopiedExample] = useState<number | null>(null);
  const appContext = useContext(AppContext);
  const isBookmarked = appContext?.bookmarks.includes(func.name);

  const handleCopy = (text: string, type: 'syntax' | 'example', index?: number) => {
    navigator.clipboard.writeText(text);
    if (type === 'syntax') {
      setCopiedSyntax(true);
      setTimeout(() => setCopiedSyntax(false), 2000);
    } else {
      setCopiedExample(index as number);
      setTimeout(() => setCopiedExample(null), 2000);
    }
  };
  
  const renderExample = (example: Example, index: number) => (
    <div key={index} className="p-4 bg-dark-bg/50 rounded-lg">
        <p className="text-dark-text-secondary mb-2">{example.description}</p>
        {example.data && (
            <div className="mb-4 overflow-x-auto">
                <table className="text-sm w-full text-left border-collapse">
                    <thead>
                        <tr>
                            {example.data.headers.map(h => <th key={h} className="p-2 border border-dark-border bg-dark-border/50 font-normal">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {example.data.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                                {row.map((cell, cIdx) => <td key={cIdx} className="p-2 border border-dark-border">{cell}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        <div className="font-mono text-sm p-3 bg-black/30 rounded-md flex justify-between items-center">
            <code>{example.formula}</code>
            <button onClick={() => handleCopy(example.formula, 'example', index)} className="text-dark-text-secondary hover:text-white transition">
                {copiedExample === index ? <CheckIcon className="w-4 h-4 text-brand-emerald"/> : <CopyIcon className="w-4 h-4"/>}
            </button>
        </div>
        <div className="mt-2 text-sm">
            <span className="font-semibold">Result:</span> <code className="bg-dark-border/50 px-1 py-0.5 rounded">{example.result}</code>
        </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div>
            <span className="text-sm font-medium text-brand-emerald">{func.category}</span>
            <h1 className="text-4xl font-extrabold text-white">{func.name}</h1>
            <p className="mt-2 text-lg text-dark-text-secondary">{func.shortDescription}</p>
        </div>
        <button onClick={() => appContext?.toggleBookmark(func.name)} className="flex items-center gap-2 px-3 py-2 bg-dark-surface border border-dark-border rounded-lg hover:border-brand-indigo transition">
          <BookmarkIcon className="w-5 h-5" isFilled={isBookmarked} />
          <span className="text-sm">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Syntax */}
        <section>
          <h2 className="text-xl font-bold mb-3">Syntax</h2>
          <div className="font-mono text-lg p-4 bg-dark-surface rounded-lg flex justify-between items-center border border-dark-border">
            <code>{func.syntax}</code>
            <button onClick={() => handleCopy(func.syntax, 'syntax')} className="text-dark-text-secondary hover:text-white transition">
              {copiedSyntax ? <CheckIcon className="w-5 h-5 text-brand-emerald"/> : <CopyIcon className="w-5 h-5"/>}
            </button>
          </div>
        </section>

        {/* Arguments */}
        <section>
          <h2 className="text-xl font-bold mb-3">Arguments</h2>
          <div className="space-y-3">
            {func.arguments.map(arg => (
              <div key={arg.name} className="p-3 bg-dark-surface/50 rounded-lg">
                <p><code className="font-bold text-base">{arg.name}</code> <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${arg.required ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300'}`}>{arg.required ? 'Required' : 'Optional'}</span></p>
                <p className="text-sm text-dark-text-secondary mt-1">{arg.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Returns */}
        <section>
            <h2 className="text-xl font-bold mb-3">Returns</h2>
            <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-dark-text-secondary">{func.returns.description}</p>
                <p className="text-sm mt-2"><strong>Type:</strong> <code className="bg-dark-border/50 px-1 py-0.5 rounded">{func.returns.type}</code></p>
            </div>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-xl font-bold mb-3">Examples</h2>
          <div className="space-y-4">
            {func.examples.map(renderExample)}
          </div>
        </section>
        
        {/* Common Errors */}
        {func.commonErrors.length > 0 && <section>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><AlertTriangleIcon className="w-5 h-5 text-yellow-400" /> Common Errors</h2>
            <div className="space-y-2">
                {func.commonErrors.map(err => (
                    <div key={err.error} className="p-3 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-lg">
                        <p><code className="font-bold">{err.error}</code></p>
                        <p className="text-sm text-yellow-200/80">{err.description}</p>
                    </div>
                ))}
            </div>
        </section>}
        
        {/* Notes & Pitfalls */}
        {(func.notes.length > 0 || func.pitfalls.length > 0) && <section>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><LightbulbIcon className="w-5 h-5 text-blue-400"/> Notes & Pitfalls</h2>
             <div className="space-y-2">
                {func.notes.map((note, i) => (
                    <p key={`n-${i}`} className="p-3 bg-blue-500/10 text-blue-200/80 rounded-lg text-sm">{note}</p>
                ))}
                {func.pitfalls.map((pitfall, i) => (
                    <p key={`p-${i}`} className="p-3 bg-red-500/10 text-red-200/80 rounded-lg text-sm">{pitfall}</p>
                ))}
            </div>
        </section>}

        {/* Metadata */}
        <section>
            <h2 className="text-xl font-bold mb-3">Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-dark-surface/50 rounded-lg">
                    <p className="font-semibold">Difficulty</p>
                    <p className="text-dark-text-secondary">{func.difficulty}</p>
                </div>
                 <div className="p-3 bg-dark-surface/50 rounded-lg">
                    <p className="font-semibold">Introduced</p>
                    <p className="text-dark-text-secondary">{func.versionIntroduced}</p>
                </div>
                <div className="p-3 bg-dark-surface/50 rounded-lg col-span-2 md:col-span-1">
                    <p className="font-semibold">Related Functions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                    {func.relatedFunctions.map(rf => (
                        <a key={rf} href={`#/function/${rf}`} className="bg-dark-border hover:bg-brand-indigo px-2 py-0.5 rounded text-xs transition">{rf}</a>
                    ))}
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default FunctionDetail;
