'use client';

import { useState } from 'react';
import { useChatStore } from '@/lib/stores/chatStore';
import { useNavStore } from '@/lib/stores/navStore';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Trash2, Menu, X, BookOpen } from 'lucide-react';

export function Sidebar() {
  const { conversations, activeConversationId, createNewConversation, selectConversation, deleteConversation } = useChatStore();
  const { currentPage, setCurrentPage } = useNavStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNewConversation = () => {
    createNewConversation();
    setMobileOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    selectConversation(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Navigation Tabs */}
      <div className="p-3 border-b border-border mt-10">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setCurrentPage('history');
              setMobileOpen(false);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 'history'
                ? 'bg-primary text-primary-foreground'
                : 'bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80'
            }`}
          >
            <BookOpen size={18} />
            <span className="hidden sm:inline">Lịch sử</span>
          </button>
          <button
            onClick={() => {
              setCurrentPage('chat');
              setMobileOpen(false);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 'chat'
                ? 'bg-primary text-primary-foreground'
                : 'bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80'
            }`}
          >
            <MessageSquare size={18} />
            <span className="hidden sm:inline">Chat</span>
          </button>
        </div>
      </div>

      {/* Chat Section */}
      {currentPage === 'chat' && (
        <>
          <div className="p-4 border-b border-border">
            <Button
              onClick={handleNewConversation}
              className="w-full gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus size={18} />
              Đoạn hội thoại mới
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No conversations yet. Start a new one!
              </div>
            ) : (
              <nav className="space-y-2 p-2">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-2 group rounded-lg transition-colors ${
                      activeConversationId === conversation.id
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'hover:bg-sidebar-accent text-sidebar-foreground'
                    }`}
                  >
                    <button
                      onClick={() => handleSelectConversation(conversation.id)}
                      className="flex-1 flex items-center gap-2 px-3 py-2 text-left text-sm truncate"
                    >
                      <MessageSquare size={16} className="flex-shrink-0" />
                      <span className="truncate">{conversation.title}</span>
                    </button>
                    <button
                      onClick={() => deleteConversation(conversation.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-destructive/20 rounded transition-all"
                      title="Delete conversation"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                ))}
              </nav>
            )}
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-40 p-2 lg:hidden rounded-lg hover:bg-sidebar-accent transition-colors"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col h-full">
        {sidebarContent}
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full z-40 transform transition-transform duration-200 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
