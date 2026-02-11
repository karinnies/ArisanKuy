
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Anda adalah "Asisten ArisanKuy". Anda ahli dalam mengelola arisan, memberikan tips keuangan, 
dan membantu pengguna memahami cara kerja aplikasi ArisanKuy.
Gunakan bahasa Indonesia yang ramah, santai (tapi sopan), dan membantu.
Jika ditanya tentang fitur, jelaskan:
1. Cara tambah peserta.
2. Cara kocok arisan.
3. Cara konfirmasi pembayaran via WhatsApp.
`;

export const getGeminiResponse = async (history: Message[], userInput: string): Promise<string> => {
  // Fix: Initialize GoogleGenAI strictly using process.env.API_KEY in a named parameter object
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: userInput }] });

  try {
    // Fix: Directly call ai.models.generateContent with model and parameters
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    // Fix: Access text property directly (it is a property, not a method)
    return response.text || "Maaf, saya sedang kehilangan koneksi. Coba lagi ya!";
  } catch (error) {
    return "Ups, ada gangguan teknis. Silakan tanya kembali sebentar lagi.";
  }
};
