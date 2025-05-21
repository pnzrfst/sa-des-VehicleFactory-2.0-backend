import { Product } from "@prisma/client"
import { prisma } from "../prisma/client"

class ProductServices{
    public async create({ description, code, unity, stock}: createProductRequest): Promise<void> {
        const productAlreadyExist = await prisma.product.findUnique({
            where: { code: code }
        })

        if (productAlreadyExist) {
            throw new Error("Produto já cadastrado!")
        }

        const product: Product = {
            id: crypto.randomUUID(),
            description: description,
            code: code,
            unity: unity,
            stock: stock,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        }

        await prisma.product.create({ data: product })
    }

    public async getAll(){
        return await prisma.product.findMany({
            orderBy: {createdAt: 'desc'}
        })
    }
}

export const productServices = new ProductServices()