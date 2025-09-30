import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatAiService {
  private ia: GoogleGenerativeAI;

  constructor() {
    this.ia = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  }

  async chatResponse(message: string) {
    const model = this.ia.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(message);

    return result.response.text(); // <- aqui é o texto da resposta
  }
}
