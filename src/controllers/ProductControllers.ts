import { Handler } from "express";
import { ProductService } from "../services/ProductService";
import { GetProductRequestSchema, ProductRequestSchema, UpdateProductRequestSchema } from "./schema/ProductRequestSchema";
import { AuthenticatedRequest } from "../middlewares/auth";

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

    featuredProduct: Handler = async ( req, res , next ) => {
        try {
            const featuredProducts = await this.productService.featuredProducts();
            res.json(featuredProducts);
        } catch (error) {
            next(error)
        }
    }

    addFavorite: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const userId = req.user!.id;
            const productId: { productId:number } = req.body;
            const addFavorite = await this.productService.addFavorite(userId, productId.productId);
            res.status(201).json(addFavorite);
        } catch (error) {
            next(error)
        }
    }

    getFavoriteProduct: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const userId = req.user!.id;
            const productId: { productId: number } = req.body;
            const getFavoriteProduct = await this.productService.findUniqueFavorites(userId, productId.productId);
            res.json(getFavoriteProduct);
            
        } catch (error) {
            next(error)
        }
    }

    getAllFavorites: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const userId = req.user!.id;
            const favorites = await this.productService.favorites(userId);
            res.json(favorites);
        } catch (error) {
            next(error)
        }
    }

    deleteFavorite: Handler = async (req: AuthenticatedRequest, res , next) => {
        try {
            const userId = req.user!.id;
            const productId = +req.params.id;
            const deleteFavorite = await this.productService.deleteFavorite(userId, productId);
            res.json(deleteFavorite);
        } catch (error) {
            next(error)
        }
    }
}