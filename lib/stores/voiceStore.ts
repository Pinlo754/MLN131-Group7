import { create } from 'zustand';

export type VoiceStatus = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'SPEAKING';

interface VoiceState {
  status: VoiceStatus;
  transcript: string;
  currentResponse: string;
  isVoiceAssistantOpen: boolean;
  error: string | null;

  // Actions
  setStatus: (status: VoiceStatus) => void;
  setTranscript: (transcript: string) => void;
  clearTranscript: () => void;
  setCurrentResponse: (response: string) => void;
  clearCurrentResponse: () => void;
  toggleVoiceAssistant: () => void;
  setVoiceAssistantOpen: (open: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useVoiceStore = create<VoiceState>((set) => ({
  status: 'IDLE',
  transcript: '',
  currentResponse: '',
  isVoiceAssistantOpen: false,
  error: null,

  setStatus: (status: VoiceStatus) => {
    set({ status });
  },

  setTranscript: (transcript: string) => {
    set({ transcript });
  },

  clearTranscript: () => {
    set({ transcript: '' });
  },

  setCurrentResponse: (response: string) => {
    set({ currentResponse: response });
  },

  clearCurrentResponse: () => {
    set({ currentResponse: '' });
  },

  toggleVoiceAssistant: () => {
    set(state => ({ isVoiceAssistantOpen: !state.isVoiceAssistantOpen }));
  },

  setVoiceAssistantOpen: (open: boolean) => {
    set({ isVoiceAssistantOpen: open });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  reset: () => {
    set({
      status: 'IDLE',
      transcript: '',
      currentResponse: '',
      error: null,
    });
  },
}));
