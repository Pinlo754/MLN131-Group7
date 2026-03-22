import { useCallback, useState } from 'react';
import { 
  GoogleGenerativeAI, 
  HarmCategory, 
  HarmBlockThreshold,
  Part
} from "@google/generative-ai";
import { Message } from '@/lib/storage'; // Giữ nguyên theo import cũ của bạn
import { CHAT_SYSTEM_PROMPT } from '@/lib/constants';

export const useGeminiChat = () => {
  const [isConfigured, setIsConfigured] = useState<boolean>(!!process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const sendMessage = useCallback(
    async (
      messages: Message[],
      onChunk: (chunk: string) => void,
      onComplete: () => void,
      onError: (error: string) => void
    ): Promise<void> => {
      if (!apiKey) {
        onError('API_KEY_SETUP_REQUIRED');
        return;
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Danh sách model ưu tiên (tương tự logic test trong Chatbox)
        const modelsToTry = [
          "gemini-2.5-flash", 
          "gemini-2.5-pro",
          "gemini-2.0-flash-exp"
        ];

        // Lấy lịch sử chat và loại bỏ tin nhắn cuối (vì tin nhắn đó là prompt hiện tại)
        const history = messages.slice(0, -1).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content } as Part],
        }));

        const lastUserMessage = messages[messages.length - 1].content;

        // Khởi tạo model với cấu hình an toàn
        const model = genAI.getGenerativeModel({
          model: modelsToTry[0], // Bạn có thể thêm logic loop thử model ở đây nếu muốn
          systemInstruction: CHAT_SYSTEM_PROMPT,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Chỉnh lại tùy độ nhạy cảm nội dung
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
          ],
        });

        // Sử dụng stream để có trải nghiệm gõ chữ mượt mà
        const result = await model.generateContentStream({
          contents: [...history, { role: 'user', parts: [{ text: lastUserMessage }] }],
        });

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            onChunk(chunkText);
          }
        }

        onComplete();
      } catch (error: any) {
        console.error('Gemini SDK Error:', error);
        
        if (error.message?.includes('API_KEY')) {
          onError('API_KEY_SETUP_REQUIRED');
        } else {
          onError(error.message || 'Lỗi kết nối AI');
        }
      }
    },
    [apiKey]
  );

  return { sendMessage, isConfigured };
};