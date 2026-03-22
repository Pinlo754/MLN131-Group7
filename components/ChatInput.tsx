'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onVoiceClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  onVoiceClick,
  isLoading = false,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed && !isLoading && !disabled) {
      onSendMessage(trimmed);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background p-4 space-y-3">
      <div className="flex gap-3">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about religion and socialism... (Shift+Enter for new line)"
          disabled={isLoading || disabled}
          className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed max-h-30"
          rows={1}
        />
        <div className="flex gap-2 flex-col">
          {onVoiceClick && (
            <Button
              onClick={onVoiceClick}
              size="icon"
              variant="outline"
              disabled={isLoading || disabled}
              title="Use voice input"
            >
              <Mic size={18} />
            </Button>
          )}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading || disabled}
            size="icon"
            className="bg-primary hover:bg-primary/90"
            title="Send message (Enter)"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
