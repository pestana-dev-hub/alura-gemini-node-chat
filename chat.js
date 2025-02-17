import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Oi, adoro viajar!" }],
    },
    {
      role: "model",
      parts: [{ text: "Ah, que legal. Para onde deseja viajar?" }],
    },
  ],
});

const msg = "Quero ir para o Canadá";

const result = await chat.sendMessage(msg);
const response = await result.response;
const text = response.text();
console.log(text);