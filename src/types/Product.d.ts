type createProductRequest = {
    description: string;
    code: string;
    unity: string;
    stock: number;
}

type updateProductRequest = {
    description: string;
    code: string;
    unity: string;
    stock: number;
}

type deleteProductRequest = {
    id: string
}