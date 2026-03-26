'use client';

import { useEffect, useRef } from 'react';
import { Message as MessageType } from '@/lib/storage';
import { Message } from './Message';
import { Spinner } from '@/components/ui/spinner';

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="text-muted-foreground">
          <h2 className="text-lg font-semibold mb-2">Chào mừng bạn đến với hành trình học tập</h2>
          <p className="text-sm">
            Hãy bắt đầu một cuộc trò chuyện để được giải thích rõ hơn về nội dung lịch sử đảng giai đoạn 1858-1930.
            Đặt câu hỏi, tìm kiếm sự giải thích và nâng cao hiểu biết của bạn.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="bg-card border border-border rounded-lg rounded-bl-none px-4 py-3 flex items-center gap-2">
            <Spinner />
            <span className="text-sm text-muted-foreground">AI đang suy nghĩ</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
