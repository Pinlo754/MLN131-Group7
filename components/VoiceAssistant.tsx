'use client';

import { useVoiceStore } from '@/lib/stores/voiceStore';
import { X, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConversation } from '@elevenlabs/react';

export function VoiceAssistant() {
  const {
    isVoiceAssistantOpen,
    setVoiceAssistantOpen,
    setError,
  } = useVoiceStore();

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (msg) => console.log(msg),
    onError: (err) => {
      console.error(err);
      setError('Voice error');
    },
  });

  const start = async () => {
    try {
      await conversation.startSession({
        agentId: 'agent_5401kma0cf7femm881zffkyvw227',
        connectionType: 'webrtc', // 🔥 FIX
      });
    } catch (err) {
      setError('Cannot start voice session');
    }
  };

  const stop = () => {
    conversation.endSession();
  };

  if (!isVoiceAssistantOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border rounded-xl w-full max-w-md flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <h2 className="font-semibold">Học giả Mác - Lênin</h2>
          <button onClick={() => setVoiceAssistantOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Status */}
        <div className="p-6 text-center">
          <p>Trạng thái kết nối: {conversation.status}</p>
          <p>
            {conversation.isSpeaking
              ? 'AI đang nói...'
              : 'Đang lắng nghe...'}
          </p>
        </div>

        {/* Controls */}
        <div className="p-4 border-t">
          {conversation.status === 'connected' ? (
            <Button onClick={stop} className="w-full bg-red-600">
              <Square size={18} /> Stop
            </Button>
          ) : (
            <Button onClick={start} className="w-full">
              <Mic size={18} /> Start
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}