
import { GoogleGenAI } from "@google/genai"


export class ChatAiService {
    async chatResponse(message: string) {
        const ia = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY as string})
        const model = await ia.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

       return model.text
    }
}