import { Product, ProductImage } from "@prisma/client";
import { AddImageAttributes, CreateProductAttributes, FindProductParams, IProductRepositorie, ProductWhereParams } from "../ProductRepositorie";
import { prisma } from "../../database/database";

export class ProductPrismaRepositorie implements IProductRepositorie {
    findMany (params: FindProductParams) : Promise<Product[]>{
        return prisma.product.findMany({
            where: {
                name: {
                    contains: params.where?.name?.like,
                    equals: params.where?.name?.equals,
                    mode: params.where?.name?.mode
                }               
            },
            skip: params.offset,
            take: params.limit,
            include: { images: true }, 
            orderBy: { [params.sortBy ?? "name"]: params.order} 
        });
    }
    
    count (params: ProductWhereParams): Promise<number>{
        return prisma.product.count({
            where: {
                name: {
                    contains: params.name?.like,
                    equals: params.name?.equals,
                    mode: params.name?.mode
                }               
            }
        })
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