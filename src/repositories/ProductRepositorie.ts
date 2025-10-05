import { Product, ProductImage } from "@prisma/client";

export interface ProductWhereParams {
    name?: {
        equals?: string;
        like?: string;
        mode?: "default" | "insensitive";
    }
}

export interface FindProductParams {
    where?: ProductWhereParams;
    limit?: number;
    offset?: number;
    order?: "asc" | "desc";
    sortBy?: "name" | "createdAt"
}

export interface CreateProductAttributes {
    name: string;
    description: string;
    price: number;
    mark: string;
    categoryId: number;
    oldPrice: number;
    favorite: boolean;
    isNew: boolean;
    rating: number;
}

export interface AddImageAttributes {
    url: string;
    altText?: string;
    productId: number;
}

export interface IProductRepositorie {
    findMany: (params: FindProductParams) => Promise<Product []>;
    count: (params: ProductWhereParams) => Promise<number>;
    findUnique: (id: number) => Promise<Product | null>;
    create: (attributes: CreateProductAttributes) => Promise<Product>;
    update: (id: number , attributes: Partial<CreateProductAttributes>) => Promise<Product | null>;
    delete: (id: number) => Promise<Product | null>;
    addImage: (attributes: AddImageAttributes) => Promise<ProductImage>;
    updateImage: (id: number , attributes: Partial<AddImageAttributes>) => Promise<ProductImage | null>;
    removeImage: (id: number) => Promise<ProductImage | null>;
    imageExists: (id: number) => Promise<ProductImage | null>;
}