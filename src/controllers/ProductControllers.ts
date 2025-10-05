import { Handler } from "express";
import { ProductService } from "../services/ProductService";
import { GetProductRequestSchema, ProductRequestSchema, UpdateProductRequestSchema } from "./schema/ProductRequestSchema";

export class ProductController{

    constructor( readonly productService: ProductService ){}

    index: Handler = async ( req, res, next ) => {
        try {
            const { name, order="asc", page="1", pageSize="10", sortBy="name" } = GetProductRequestSchema.parse(req.query);

            const products = await this.productService.findAllProducts({
                name,
                order,
                page: +page,
                pageSize: +pageSize,
                sortBy
            });
            res.json(products);
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async ( req, res, next ) => {
        try {
            const id = +req.params.id;
            const product = await this.productService.findByIdProduct(id);
            res.json(product);
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async ( req, res, next ) => {
        try {
            const body = ProductRequestSchema.parse(req.body);
            const newProduct = await this.productService.createProduct(body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async ( req, res, next ) => {
        try {
            const id = +req.params.id;
            const body = UpdateProductRequestSchema.parse(req.body);
            const updatedProduct = await this.productService.updateProduct(id, body);
            res.json(updatedProduct);
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async ( req, res, next ) => {
        try {
            const id = +req.params.id;
            const deletedProduct = await this.productService.deleteProduct(id);
            res.json(deletedProduct);
        } catch (error) {
            next(error)
        }
    }
}