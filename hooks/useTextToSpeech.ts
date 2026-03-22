import { useCallback, useRef, useState, useEffect } from 'react';
import { VOICE_SETTINGS } from '@/lib/constants';

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  error: string | null;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check browser support
    const hasSpeechSynthesis = window.speechSynthesis !== undefined;
    
    if (hasSpeechSynthesis) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
      setError('Text-to-Speech API is not supported in this browser');
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      setError('Text-to-Speech API is not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = VOICE_SETTINGS.SPEECH_RATE;
    utterance.pitch = VOICE_SETTINGS.PITCH;
    utterance.volume = VOICE_SETTINGS.VOLUME;
    utterance.lang = VOICE_SETTINGS.VOICE_LANG;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setError(null);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      const errorMessage = `Speech synthesis error: ${event.error}`;
      setError(errorMessage);
      setIsSpeaking(false);
      setIsPaused(false);
      console.error(errorMessage);
    };

    synthesisRef.current = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start speech synthesis';
      setError(errorMessage);
    }
  }, []);

  const pause = useCallback(() => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  return {
    speak,
    pause,
    resume,
    stop,
    isSpeaking,
    isPaused,
    isSupported,
    error,
  };
};
