import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import OptionsPanel from './components/OptionsPanel';
import ChatInput from './components/ChatInput';
import { initialGreeting } from './data/knowledgeBase';
import { ShieldCheck } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialGreeting }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (option) => {
    handleSendMessage(option.label, option.content);
  };

  const handleSendMessage = async (text, predefinedResponse = null) => {
    const newUserMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMessage]);

    if (predefinedResponse) {
      // For predefined options, just use the response from knowledge base
      const newAssistantMessage = { role: 'assistant', content: predefinedResponse };
      setMessages((prev) => [...prev, newAssistantMessage]);
      return;
    }

    // Call the backend API for custom questions
    setIsLoading(true);
    try {
      // In development, the proxy handles this or full URL
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/chat' 
        : 'http://localhost:3000/api/chat';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const newAssistantMessage = { role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I am having trouble connecting to the server right now. Please try again later.' 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
        <div className="options-section">
          <OptionsPanel onOptionSelect={handleOptionSelect} />
        </div>
      </main>
    </div>
  );
}

export default App;
