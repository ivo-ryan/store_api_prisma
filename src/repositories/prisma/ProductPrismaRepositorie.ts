import { Product, ProductImage } from "@prisma/client";
import { AddImageAttributes, CreateProductAttributes, IProductRepositorie } from "../ProductRepositorie";
import { prisma } from "../../database/database";

export class ProductPrismaRepositorie implements IProductRepositorie {
    findMany () : Promise<Product[]>{
        return prisma.product.findMany({ include: { images: true } });
    }

    findUnique (id: number) : Promise<Product | null>{
        return prisma.product.findUnique({
             where: { id } ,
             include: {
                images: true
             }
        });
    }

    create (attributes: CreateProductAttributes) : Promise<Product>{
        return prisma.product.create({ data: attributes });
    }

    update (id: number, attributes: Partial<CreateProductAttributes>) : Promise<Product | null>{
        return prisma.product.update({
            where: { id },
            data: attributes
        });
    }

    delete (id: number) : Promise<Product | null>{
        return prisma.product.delete({ where: { id } });
    }

    addImage (attributes: AddImageAttributes): Promise<ProductImage> {
        return prisma.productImage.create({
            data: attributes
        });
    }

    updateImage (id: number, attributes: Partial<AddImageAttributes>) : Promise<ProductImage | null>{
        return prisma.productImage.update({
            where: { id },
            data: attributes
        });
    }

    removeImage (id: number) : Promise<ProductImage | null>{
        return prisma.productImage.delete({ where: { id } });
    }

    imageExists (id: number) : Promise<ProductImage | null>{
        return prisma.productImage.findUnique({ where: { id } });
    }
    
}