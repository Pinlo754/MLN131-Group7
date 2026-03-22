'use client';

import { useVoiceStore, VoiceStatus } from '@/lib/stores/voiceStore';
import { Mic } from 'lucide-react';

export function MicrophoneButton() {
  const { status, isVoiceAssistantOpen, setVoiceAssistantOpen } = useVoiceStore();

  const getButtonColor = (status: VoiceStatus) => {
    switch (status) {
      case 'LISTENING':
        return 'bg-red-500 hover:bg-red-600';
      case 'PROCESSING':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'SPEAKING':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-primary hover:bg-primary/90';
    }
  };

  const getStatusText = (status: VoiceStatus) => {
    switch (status) {
      case 'LISTENING':
        return 'Listening...';
      case 'PROCESSING':
        return 'Processing...';
      case 'SPEAKING':
        return 'Speaking...';
      default:
        return 'Start voice conversation';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setVoiceAssistantOpen(!isVoiceAssistantOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full text-white shadow-lg transition-all hover:shadow-xl active:scale-95 ${getButtonColor(status)}`}
        title={getStatusText(status)}
      >
        <Mic size={24} />
        {status !== 'IDLE' && (
          <div className="absolute inset-0 rounded-full animate-pulse border-2 border-current opacity-50"></div>
        )}
      </button>

      <div className="fixed bottom-24 right-6 bg-card border border-border rounded-lg shadow-lg p-2 text-xs text-muted-foreground pointer-events-none">
        {getStatusText(status)}
      </div>
    </div>
  );
}
