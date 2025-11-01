import React from 'react';

export interface Argument {
  name: string;
  description: string;
  required: boolean;
  type: string;
}

export interface Example {
  description: string;
  formula: string;
  result: string;
  data?: { headers: string[]; rows: (string | number)[][] };
}

export interface ExcelFunction {
  name: string;
  category: string;
  shortDescription: string;
  syntax: string;
  arguments: Argument[];
  returns: {
    type: string;
    description: string;
  };
  examples: Example[];
  commonErrors: {
    error: string;
    description: string;
  }[];
  pitfalls: string[];
  notes: string[];
  versionIntroduced: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  relatedFunctions: string[];
}

export interface Guide {
  id: string;
  title: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  content: string; // Markdown-like content
}

export type Category = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};