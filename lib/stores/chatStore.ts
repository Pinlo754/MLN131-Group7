import { create } from 'zustand';
import { storage, Conversation, Message } from '../storage';

interface ChatState {
  // Data
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadConversations: () => void;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  addMessage: (role: 'user' | 'assistant', content: string) => Message | null;
  deleteConversation: (id: string) => void;
  getActiveConversation: () => Conversation | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAllConversations: () => void;
  updateConversationTitle: (id: string, title: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  error: null,

  loadConversations: () => {
    const conversations = storage.getAllConversations();
    set({ conversations });
    // Automatically select first conversation if none is selected
    if (conversations.length > 0 && !get().activeConversationId) {
      set({ activeConversationId: conversations[0].id });
    }
  },

  createNewConversation: () => {
    const newConversation = storage.createConversation();
    set(state => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: newConversation.id,
    }));
  },

  selectConversation: (id: string) => {
    set({ activeConversationId: id });
  },

  addMessage: (role: 'user' | 'assistant', content: string) => {
    const state = get();
    if (!state.activeConversationId) return null;

    try {
      const message = storage.addMessageToConversation(state.activeConversationId, {
        role,
        content,
      });

      // Update the conversations list
      const updatedConversation = storage.getConversation(state.activeConversationId);
      if (updatedConversation) {
        set(state => ({
          conversations: state.conversations.map(conv =>
            conv.id === state.activeConversationId ? updatedConversation : conv
          ),
        }));
      }

      return message;
    } catch (error) {
      console.error('Error adding message:', error);
      set({ error: 'Failed to add message' });
      return null;
    }
  },

  deleteConversation: (id: string) => {
    storage.deleteConversation(id);
    set(state => ({
      conversations: state.conversations.filter(conv => conv.id !== id),
      activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
    }));
  },

  getActiveConversation: () => {
    const state = get();
    if (!state.activeConversationId) return null;
    return storage.getConversation(state.activeConversationId) || null;
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearAllConversations: () => {
    storage.clearAllConversations();
    set({
      conversations: [],
      activeConversationId: null,
    });
  },

  updateConversationTitle: (id: string, title: string) => {
    const conversation = storage.getConversation(id);
    if (conversation) {
      conversation.title = title;
      storage.saveConversation(conversation);
      set(state => ({
        conversations: state.conversations.map(conv =>
          conv.id === id ? conversation : conv
        ),
      }));
    }
  },
}));
