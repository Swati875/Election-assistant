import React from 'react';
import { knowledgeBase } from '../data/knowledgeBase';
import { MessageSquare } from 'lucide-react';

export default function OptionsPanel({ onOptionSelect }) {
  return (
    <div className="options-panel">
      <h3>Common Questions</h3>
      <div className="options-grid">
        {knowledgeBase.map((option) => (
          <button
            key={option.id}
            className="option-button"
            onClick={() => onOptionSelect(option)}
          >
            <MessageSquare size={16} className="icon" />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
