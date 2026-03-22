'use client';

import { useEffect, useState } from 'react';
import { useChatStore } from '@/lib/stores/chatStore';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { useVoiceStore } from '@/lib/stores/voiceStore';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ChatContainerProps {
  onVoiceClick?: () => void;
}

export function ChatContainer({ onVoiceClick }: ChatContainerProps) {
  const {
    conversations,
    activeConversationId,
    isLoading,
    error,
    setLoading,
    setError,
    addMessage,
    getActiveConversation,
    createNewConversation,
  } = useChatStore();

  const { sendMessage } = useGeminiChat();
  const { setVoiceAssistantOpen } = useVoiceStore();
  const [streamedContent, setStreamedContent] = useState('');

  // Initialize with first conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, []);

  const handleSendMessage = async (userMessage: string) => {
    const activeConversation = getActiveConversation();
    if (!activeConversation) {
      setError('No active conversation');
      return;
    }

    // Add user message to chat
    addMessage('user', userMessage);
    setLoading(true);
    setError(null);
    setStreamedContent('');

    // Prepare messages for API (without the response we're about to generate)
    const conversation = getActiveConversation();
    if (!conversation) {
      setLoading(false);
      return;
    }

    let fullResponse = '';

    await sendMessage(
      conversation.messages,
      (chunk: string) => {
        fullResponse += chunk;
        setStreamedContent(fullResponse);
      },
      () => {
        // On complete, save the full response
        if (fullResponse) {
          addMessage('assistant', fullResponse);
        }
        setStreamedContent('');
        setLoading(false);
      },
      (error: string) => {
        setError(error);
        setLoading(false);
      }
    );
  };

  const conversation = getActiveConversation();
  const displayMessages = conversation ? [...conversation.messages] : [];

  // Add streamed content as temporary message
  if (streamedContent) {
    displayMessages.push({
      id: 'streaming',
      role: 'assistant',
      content: streamedContent,
      timestamp: Date.now(),
    });
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      {/* Header */}
      <div className="border-b border-border bg-card p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {conversation?.title || 'New Conversation'}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Dưới đây là phản hồi từ AI, vui lòng xác thực thông tin trước khi tiếp nhận!
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <MessageList messages={displayMessages} isLoading={isLoading && !streamedContent} />
      </div>
      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onVoiceClick={onVoiceClick}
        isLoading={isLoading}
        disabled={!activeConversationId}
      />
    </div>
  );
}
