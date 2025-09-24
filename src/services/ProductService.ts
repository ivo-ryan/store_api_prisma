import { HttpError } from "../errors/HttpError";
import { AddImageAttributes, CreateProductAttributes, IProductRepositorie } from "../repositories/ProductRepositorie";

export class ProductService {

    constructor( readonly productRepositorie: IProductRepositorie ){}

    async findAllProducts() {
        const products = await this.productRepositorie.findMany();
        return products
    }

    async productExists (id: number) {
        const product = await this.productRepositorie.findUnique(id);
        if(!product) new HttpError(404, "Produto não encontrado!");
    }

    async findByIdProduct(id: number) {
        await this.productExists(id);
        const product = await this.productRepositorie.findUnique(id);
        return product;
    }

    async createProduct(attributes: CreateProductAttributes) {
        const newProduct = await this.productRepositorie.create(attributes);
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
        if(!image) new HttpError(404, "Imagem não encontrada!");
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