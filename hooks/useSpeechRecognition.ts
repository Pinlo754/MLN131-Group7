import { useCallback, useRef, useState, useEffect } from 'react';

interface SpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  error: string | null;
}

export const useSpeechRecognition = (
  onTranscriptChange?: (transcript: string) => void,
  options: SpeechRecognitionOptions = { language: 'en-US' }
): UseSpeechRecognitionReturn => {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      
      recognition.continuous = options.continuous ?? false;
      recognition.interimResults = options.interimResults ?? true;
      recognition.lang = options.language ?? 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            final += transcript + ' ';
          } else {
            interim += transcript;
          }
        }

        setInterimTranscript(interim);
        if (final) {
          setTranscript(prev => prev + final);
          onTranscriptChange?.(prev => prev + final);
        }
      };

      recognition.onerror = (event: any) => {
        const errorMessage = `Speech recognition error: ${event.error}`;
        setError(errorMessage);
        console.error(errorMessage);
      };
    } else {
      setIsSupported(false);
      setError('Speech Recognition API is not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [options, onTranscriptChange]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return;
    
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    
    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.error('Error stopping speech recognition:', err);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error,
  };
};
