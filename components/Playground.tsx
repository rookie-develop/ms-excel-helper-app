
import React, { useState } from 'react';
import { LightbulbIcon, ArrowRightIcon } from './common/Icons';
import { explainFormulaWithGemini } from '../services/geminiService';

const sampleData = {
  headers: ['A', 'B', 'C', 'D'],
  rows: [
    [1, 'Product A', 150, 0.1],
    [2, 'Product B', 200, 0.15],
    [3, 'Product C', 120, 0.05],
    [4, 'Product D', 300, 0.2],
  ],
};

const Playground: React.FC = () => {
  const [formula, setFormula] = useState('=SUM(C1:C4)');
  const [result, setResult] = useState<string | number>('770');
  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleExplain = async () => {
    setIsLoadingAi(true);
    setAiExplanation('');
    try {
      const explanation = await explainFormulaWithGemini(formula);
      setAiExplanation(explanation);
    } catch (error) {
      console.error(error);
      setAiExplanation('Sorry, I was unable to explain that formula. Please check your API key and try again.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold">Formula Playground</h1>
        <p className="text-dark-text-secondary mt-1">
          Test formulas with sample data and get AI-powered explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Grid and Formula input */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono p-3 bg-dark-surface rounded-t-lg border-x border-t border-dark-border">
            <span className="text-gray-400">fx</span>
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-white"
              placeholder="Enter your formula"
            />
          </div>

          <div className="overflow-x-auto bg-dark-surface rounded-b-lg border border-dark-border">
            <table className="w-full text-center text-sm font-mono border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border border-dark-border bg-black/30 w-12"></th>
                  {sampleData.headers.map((h) => (
                    <th key={h} className="p-2 border border-dark-border bg-black/30">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleData.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 border border-dark-border bg-black/30">{rIdx + 1}</td>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 border border-dark-border hover:bg-dark-border/50 transition">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <div className="p-4 bg-dark-surface rounded-lg border border-dark-border">
                <p className="text-sm text-dark-text-secondary">Result</p>
                <p className="font-mono text-lg font-semibold">{result}</p>
            </div>
        </div>

        {/* Right side: AI Explanation */}
        <div className="flex flex-col">
            <button
                onClick={handleExplain}
                disabled={isLoadingAi || !formula}
                className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-brand-indigo hover:opacity-90 transition rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <LightbulbIcon className="w-5 h-5"/>
                {isLoadingAi ? 'Thinking...' : 'Explain with AI'}
            </button>
            <div className="mt-4 p-4 bg-dark-surface rounded-lg border border-dark-border flex-grow min-h-[200px]">
                <h3 className="font-bold mb-2">AI Explanation</h3>
                {isLoadingAi && (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-indigo"></div>
                    </div>
                )}
                {aiExplanation && (
                    <div className="prose prose-invert prose-sm max-w-none text-dark-text-secondary whitespace-pre-wrap">
                        {aiExplanation.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                )}
                {!isLoadingAi && !aiExplanation && (
                    <div className="text-center text-dark-text-secondary h-full flex flex-col justify-center">
                        <p>Enter a formula and click the button above.</p>
                        <p className="text-xs mt-2">Powered by Google Gemini.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
