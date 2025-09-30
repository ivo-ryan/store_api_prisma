import { GoogleGenerativeAI } from "@google/generative-ai"

export class ChatAiService {
    async chatResponse(message: string) {
        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "chave-super-secreta");
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
       return result.response.text();
    }
}