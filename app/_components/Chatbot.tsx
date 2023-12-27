'use client';
import React, { useEffect } from 'react';

interface ChatbotProps {
  chatbotId: string;
  domain: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ chatbotId, domain }) => {

  useEffect(() => {
    // Set up the configuration object
    const configScript = document.createElement('script');
    configScript.setAttribute('type', 'text/javascript');
    configScript.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "${chatbotId}",
        domain: "${domain}"
      };
    `;
    document.head.appendChild(configScript);

    // Load the external script
    const chatbotScript = document.createElement('script');
    chatbotScript.src = 'https://www.chatbase.co/embed.min.js';
    chatbotScript.defer = true;
    document.head.appendChild(chatbotScript);

    // Clean up function to remove the script when the component is unmounted
    return () => {
      document.head.removeChild(configScript);
      document.head.removeChild(chatbotScript);
    };
  }, [chatbotId, domain]);

  return null;
};

export default Chatbot;
