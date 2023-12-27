// components/Chatbot.tsx
"use client"
import React, { useEffect } from 'react';

interface ChatbotProps {
  chatbotId: string;
  domain: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ chatbotId, domain }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "${chatbotId}",
        domain: "${domain}"
      };
    `;
    document.head.appendChild(script);

    const chatbotScript = document.createElement('script');
    chatbotScript.src = 'https://www.chatbase.co/embed.min.js';
    chatbotScript.defer = true;
    document.head.appendChild(chatbotScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(chatbotScript);
    };
  }, [chatbotId, domain]);

  return null;
};

export default Chatbot;
