
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { useLanguage } from "@/components/providers/LanguageProvider";

const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
  </div>
);

export default function ChatMessage({ message }) {
  const { role, content, isLoading } = message;
  const { isArabic } = useLanguage();

  const isUser = role === 'user';

  if (isLoading) {
    return (
      <div className="flex items-end gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-green-500 neo-brutal-border neo-brutal-shadow-small flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="bg-gray-100 neo-brutal-border neo-brutal-shadow-small p-3 max-w-xs lg:max-w-md">
          <TypingIndicator />
        </div>
      </div>
    );
  }

  const markdownComponents = {
    h1: ({node, ...props}) => <h1 className="neo-brutal-text text-2xl mt-4 mb-2" {...props} />,
    h2: ({node, ...props}) => <h2 className="neo-brutal-text text-xl mt-3 mb-1" {...props} />,
    h3: ({node, ...props}) => <h3 className="neo-brutal-text text-lg mt-2 mb-1" {...props} />,
    p: ({node, ...props}) => <p className="mb-2" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 pl-4 space-y-1" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 pl-4 space-y-1" {...props} />,
    li: ({node, ...props}) => <li className="pl-2" {...props} />,
    strong: ({node, ...props}) => <strong className="font-extrabold" {...props} />,
    table: ({node, ...props}) => <div className="overflow-x-auto my-4 neo-brutal-border"><table className="w-full text-left" {...props} /></div>,
    thead: ({node, ...props}) => <thead className="bg-gray-200" {...props} />,
    th: ({node, ...props}) => <th className="p-3 neo-brutal-text text-sm" {...props} />,
    td: ({node, ...props}) => <td className="p-3 border-t-2 border-black" {...props} />,
  };

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-green-500 neo-brutal-border neo-brutal-shadow-small flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}

      <div className={`
        neo-brutal-border neo-brutal-shadow-small p-4 text-black max-w-md lg:max-w-xl
        ${isUser ? 'bg-blue-300' : 'bg-white'}
      `}>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 neo-brutal-border neo-brutal-shadow-small flex items-center justify-center">
          <User className="w-6 h-6 text-black" />
        </div>
      )}
    </div>
  );
}
