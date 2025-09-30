import { Handler } from "express";
import { ChatAiService } from "../services/ChatAiService";

export class ChatAiController {

    constructor(readonly chatAiService: ChatAiService){}

    chat: Handler = async (req , res , next) => {
        try {
            const  { message }:{message: string} = req.body;
            const chatResponse = await this.chatAiService.chatResponse(message);
            res.json({ chatAi: chatResponse });
        } catch (error) {
            next(error)
        }
    }
}