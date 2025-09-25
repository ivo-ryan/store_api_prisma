import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";
import { ZodError } from "zod"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export const errorHandlerMiddleware:ErrorRequestHandler = ( error , req , res  , next ) => {
    if(error instanceof HttpError){
        res.status(error.status).json({ message: error.message })
    }
    else if ( error instanceof Error){
        res.status(500).json({ message: error.message })
    }
    else if ( error instanceof ZodError ){
        res.status(500).json({ message: " Erro de validação " })
    }
    else if( error instanceof PrismaClientKnownRequestError){
        res.status(500).json({ message: " Erro de parâmetro duplicado! "})
    }
    else{
        res.status(500).json({ message: "Erro interno so servidor!" })
    }
}