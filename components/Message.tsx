'use client';

import { Message as MessageType } from '@/lib/storage';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-2xl px-4 py-2 rounded-lg group relative ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card border border-border text-card-foreground rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-all"
            title="Copy message"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-muted-foreground" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
