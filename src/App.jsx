import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import OptionsPanel from './components/OptionsPanel';
import { initialGreeting } from './data/knowledgeBase';
import { ShieldCheck } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialGreeting }
  ]);

  const handleOptionSelect = (option) => {
    // Add user's question to the chat
    const newUserMessage = { role: 'user', content: option.label };
    
    // Add assistant's response to the chat
    const newAssistantMessage = { role: 'assistant', content: option.content };

    setMessages((prev) => [...prev, newUserMessage, newAssistantMessage]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <ShieldCheck size={32} className="logo-icon" />
          <div className="header-text">
            <h1>Election Assistant</h1>
            <p>Your guide to a smooth voting experience</p>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <div className="chat-section">
          <ChatWindow messages={messages} />
        </div>
        <div className="options-section">
          <OptionsPanel onOptionSelect={handleOptionSelect} />
        </div>
      </main>
    </div>
  );
}

export default App;
