import { HttpError } from "../errors/HttpError";
import { AddImageAttributes, IProductRepositorie, ProductWhereParams } from "../repositories/ProductRepositorie";

interface GetProductParams{
    name?: string;
    page?: number;
    pageSize?: number;
    order?: "asc" | "desc";
    sortBy?: "name" | "createdAt"
}

interface CreateProductAttributes {
    name: string;
    description: string;
    price: number;
    mark: string;
    categoryId: number;
    oldPrice: number;
    favorite?: boolean;
    isNew?: boolean;
    rating: number;
}

export class ProductService {

    constructor( readonly productRepositorie: IProductRepositorie ){}

    async findAllProducts({ name, order , page= 1, pageSize= 10 , sortBy }: GetProductParams) {
        const limit = pageSize;
        const offset = ( page - 1) * limit;

        const where: ProductWhereParams = {};
        if(name) where.name = { like: name, mode: "insensitive" };

        const products = await this.productRepositorie.findMany({ where, limit, offset, order, sortBy });
        const total = await this.productRepositorie.count(where);
        return {
            data: products ,
            meta: {
                page,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async productExists (id: number) {
        const product = await this.productRepositorie.findUnique(id);
        if(!product) throw new HttpError(404, "Produto não encontrado!");
    }

    async findByIdProduct(id: number) {
        await this.productExists(id);
        const product = await this.productRepositorie.findUnique(id);
        return product;
    }

    async createProduct({ categoryId, 
        description, 
        mark, 
        name, 
        oldPrice, 
        price, 
        rating, 
        favorite = false, 
        isNew = false }: CreateProductAttributes) {
        
        const newProduct = await this.productRepositorie.create({
            categoryId,
            description,
            mark,
            name,
            oldPrice,
            price,
            rating,
            favorite,
            isNew
        });
        return newProduct;
    }

    async updateProduct(id: number, attributes: Partial<CreateProductAttributes>) {
        await this.productExists(id);
        const updatedProduct = await this.productRepositorie.update(id, attributes);
        return updatedProduct;
    }

    async deleteProduct(id: number) {
        await this.productExists(id);
        const removeProduct = await this.productRepositorie.delete(id);
        return removeProduct;
    }

    async imageExists(id: number){
        const image = await this.productRepositorie.imageExists(id);
        if(!image) throw new HttpError(404, "Imagem não encontrada!");
    }

    async addImage(attributes: AddImageAttributes) {
        const createImage = await this.productRepositorie.addImage(attributes);
        return createImage;
    }

    async updateImage(id: number, attributes: Partial<AddImageAttributes>) {
        await this.imageExists(id);
        const updatedImage = await this.productRepositorie.updateImage(id, attributes);
        return updatedImage
    }

    async deleteImage(id: number) {
        await this.imageExists(id);
        const deletedImage = await this.productRepositorie.removeImage(id);
        return deletedImage;
    }

}