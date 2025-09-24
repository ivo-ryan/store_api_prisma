import { Handler } from "express";
import { ProductService } from "../services/ProductService";
import { ImageProductRequestSchema, UpdatedImageProductRequestSchema } from "./schema/ProductRequestSchema";

export class ImageProductController{
    constructor( readonly productService: ProductService ){}

    addImage: Handler = async (req , res , next) => {
        try {
            const body = ImageProductRequestSchema.parse(req.body);
            const newImage = await this.productService.addImage(body);
            res.status(201).json(newImage);
        } catch (error) {
            next(error)
        }
    }

    updateImage: Handler = async (req , res , next) => {
        try {
            const body = UpdatedImageProductRequestSchema.parse(req.body);
            const id = +req.params.id;
            const updatedImage = await this.productService.updateImage(id, body);
            res.json(updatedImage);
            
        } catch (error) {
            next(error)
        }
    }

    deleteImage: Handler = async (req , res , next) => {
        try {
            const id = + req.params.id;
            const deletedImage = await this.productService.deleteImage(id);
            res.json(deletedImage);
        } catch (error) {
            next(error)
        }
    }
}