import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from './types';

const GEMINI_API_KEY = 'AIzaSyAjPqg0osQaZJRrlGM1vXpqS17jgzS3WfE';

export function useGeminiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!GEMINI_API_KEY) {
      console.error('Gemini API anahtarı eksik!');
      return;
    }

    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'tunedModels/project1-277vhxaukc6o9',  
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
        }
      });

      const prompt = `Sağlık asistana hoşgeldiniz.
      
      Kullanıcının şikayeti: ${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.text(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Gemini API hatası:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Üzgünüm, şu anda sistemde teknik bir sorun yaşanıyor. Lütfen birkaç dakika sonra tekrar deneyin.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}