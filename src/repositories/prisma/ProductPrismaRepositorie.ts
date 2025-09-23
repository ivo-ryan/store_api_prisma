import { Product } from "@prisma/client";
import { CreateProductAttributes, IProductRepositorie } from "../ProductRepositorie";
import { prisma } from "../../database/database";

export class ProductPrismaRepositorie implements IProductRepositorie {
    findMany () : Promise<Product[]>{
        return prisma.product.findMany();
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

    
}