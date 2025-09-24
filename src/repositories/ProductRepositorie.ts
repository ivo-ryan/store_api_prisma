import { Product, ProductImage } from "@prisma/client";

export interface CreateProductAttributes {
    name: string;
    description: string;
    price: number;
    mark: string;
    categoryId: number;
}

export interface AddImageAttributes {
    url: string;
    altText?: string;
    productId: number;
}

export interface IProductRepositorie {
    findMany: () => Promise<Product []>;
    findUnique: (id: number) => Promise<Product | null>;
    create: (attributes: CreateProductAttributes) => Promise<Product>;
    update: (id: number , attributes: Partial<CreateProductAttributes>) => Promise<Product | null>;
    delete: (id: number) => Promise<Product | null>;
    addImage: (attributes: AddImageAttributes) => Promise<ProductImage>;
    updateImage: (id: number , attributes: Partial<AddImageAttributes>) => Promise<ProductImage | null>;
    removeImage: (id: number) => Promise<ProductImage | null>;
    imageExists: (id: number) => Promise<ProductImage | null>;
}