import React from 'react';
import { User, Bot } from 'lucide-react';

export default function Message({ role, content }) {
  const isBot = role === 'assistant';

  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
      <div className="message-container">
        <div className={`avatar ${isBot ? 'bg-blue-600' : 'bg-gray-600'}`}>
          {isBot ? <Bot size={20} color="white" /> : <User size={20} color="white" />}
        </div>
        <div className={`message-content ${isBot ? 'bot-content' : 'user-content'}`}>
          {content.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
