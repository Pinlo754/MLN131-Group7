'use client';

import { useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatContainer } from '@/components/ChatContainer';
import { HistoryPage } from '@/components/HistoryPage';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { MicrophoneButton } from '@/components/MicrophoneButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useChatStore } from '@/lib/stores/chatStore';
import { useVoiceStore } from '@/lib/stores/voiceStore';
import { useNavStore } from '@/lib/stores/navStore';



export default function Home() {
  const { loadConversations } = useChatStore();
  const { toggleVoiceAssistant } = useVoiceStore();
  const { currentPage, setCurrentPage } = useNavStore();

  // Load conversations from storage on mount
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const getPageTitle = () => {
    return currentPage === 'history'
      ? 'Tôn giáo trong Xã hội Chủ nghĩa'
      : 'Religion & Socialism Learning Platform';
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full bg-background">
        {/* Top bar */}
        <div className="h-14 bg-card border-b border-border px-4 flex items-center justify-end gap-2 lg:justify-between">
          <div className="hidden lg:block text-sm font-medium truncate">
            {getPageTitle()}
          </div>
          <ThemeToggle />
        </div>

        {/* Content - History or Chat */}
        {currentPage === 'history' ? (
          <HistoryPage key="history" setCurrentPage={setCurrentPage} />
        ) : (
          <ChatContainer key="chat" onVoiceClick={toggleVoiceAssistant} />
        )}
      </div>

      {/* Voice Assistant - Only show on chat page */}
      {currentPage === 'chat' && (
        <>
          <VoiceAssistant />
        </>
      )}
    </div>
  );
}
