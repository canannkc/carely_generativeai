import React, { useState } from 'react';
import { Send, Loader2, Brain, Pill, Clipboard, ChevronFirst as FirstAid } from 'lucide-react';
import { useGeminiChat } from './useGeminiChat';

function App() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useGeminiChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  const features = [
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Carely</h1>
          <p className="text-red-200 text-sm">Yapay Zeka ile Doktorunuz Evinizde</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
              <feature.icon className="h-8 w-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-2xl p-6 min-h-[500px] flex flex-col border border-red-100">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                 
                </div>
                <h2 className="text-2xl font-semibold text-red-800 mb-3"></h2>
                <p className="text-gray-600 mb-2 max-w-md mx-auto">
                  Semptomlarınızı ve şikayetlerinizi yazın.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                        : 'bg-red-50 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Şikayetlerinizi detaylı bir şekilde anlatın..."
              className="flex-1 rounded-xl border-2 border-red-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl px-6 py-3 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;