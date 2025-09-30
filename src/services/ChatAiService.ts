import { GoogleGenerativeAI } from "@google/generative-ai"

export class ChatAiService {
    async chatResponse(message: string) {
        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(message);
       return result.response.text();
    }
}