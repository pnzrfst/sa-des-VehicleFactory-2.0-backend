type createProductRequest = {
    description: string;
    code: string;
    unity: string;
    stock: number;
}

type updateProductRequest = {
    description: string;
    unity: string;
    stock: number;
    id: string
}

type deleteProductRequest = {
    id: string
}