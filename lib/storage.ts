import { STORAGE_KEYS, DEFAULT_CONVERSATION_TITLE } from './constants';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
}

class StorageManager {
  private isAvailable: boolean = false;

  constructor() {
    // Check if localStorage is available (can be false in SSR contexts)
    this.isAvailable = typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  // Generate a simple UUID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Generate conversation title from first message
  private generateTitle(firstMessage: string): string {
    const maxLength = 50;
    const cleaned = firstMessage.trim().replace(/\n/g, ' ');
    return cleaned.length > maxLength ? cleaned.substring(0, maxLength) + '...' : cleaned;
  }

  // Get all conversations
  getAllConversations(): Conversation[] {
    if (!this.isAvailable) return [];
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading conversations from storage:', error);
      return [];
    }
  }

  // Get a single conversation
  getConversation(id: string): Conversation | null {
    const conversations = this.getAllConversations();
    return conversations.find(conv => conv.id === id) || null;
  }

  // Create a new conversation
  createConversation(): Conversation {
    const conversation: Conversation = {
      id: this.generateId(),
      title: DEFAULT_CONVERSATION_TITLE,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    this.saveConversation(conversation);
    return conversation;
  }

  // Save or update a conversation
  saveConversation(conversation: Conversation): void {
    if (!this.isAvailable) return;

    try {
      const conversations = this.getAllConversations();
      const index = conversations.findIndex(conv => conv.id === conversation.id);

      if (index >= 0) {
        conversations[index] = conversation;
      } else {
        conversations.push(conversation);
      }

      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch (error) {
      console.error('Error saving conversation to storage:', error);
    }
  }

  // Add a message to a conversation
  addMessageToConversation(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Message {
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(`Conversation ${conversationId} not found`);

    const newMessage: Message = {
      id: this.generateId(),
      ...message,
      timestamp: Date.now(),
    };

    // Auto-generate title from first user message
    if (conversation.messages.length === 0 && message.role === 'user') {
      conversation.title = this.generateTitle(message.content);
    }

    conversation.messages.push(newMessage);
    conversation.updatedAt = Date.now();
    this.saveConversation(conversation);

    return newMessage;
  }

  // Delete a conversation
  deleteConversation(id: string): void {
    if (!this.isAvailable) return;

    try {
      const conversations = this.getAllConversations();
      const filtered = conversations.filter(conv => conv.id !== id);
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting conversation from storage:', error);
    }
  }

  // Clear all conversations
  clearAllConversations(): void {
    if (!this.isAvailable) return;

    try {
      localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    } catch (error) {
      console.error('Error clearing conversations from storage:', error);
    }
  }

  // Get storage size estimate
  getStorageSizeEstimate(): number {
    if (!this.isAvailable) return 0;

    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return new Blob([data || '']).size;
    } catch (error) {
      console.error('Error estimating storage size:', error);
      return 0;
    }
  }
}

export const storage = new StorageManager();
