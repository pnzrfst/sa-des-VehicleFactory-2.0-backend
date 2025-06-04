import { Product } from "@prisma/client"
import { prisma } from "../prisma/client"

class ProductServices {
    public async create({ description, code, unity, stock }: createProductRequest): Promise<void> {
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

    public async getAll() {

        const allProducts = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            where: {isActive: true}
        })

        return allProducts.map(product => ({
            description: product.description,
            code: product.code,
            unity: product.unity,
            stock: product.stock,
            id: product.id
        }))
    }
public async getByDescription(description: string) {
    const allProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
            isActive: true,
            description: {
                contains: description,
                mode: 'insensitive'
            }
        }
    })

    return allProducts.map(product => ({
        description: product.description,
        code: product.code,
        unity: product.unity,
        stock: product.stock,
        id: product.id
    }))
}

    public async update({ description, unity, stock, id }: updateProductRequest): Promise<void> {
        const productAlreadyExist = await prisma.product.findUnique({
            where: { id: id }
        })

        if (!productAlreadyExist) {
            throw new Error("Esse produto não existe na nossa base de dados.")
        }

        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                description: description,
                unity: unity,
                stock: stock,
                updatedAt: new Date()
            }
        })
    }

    public async delete({ id }: deleteProductRequest): Promise<void> {
        const findProduct = await prisma.product.findUnique({
            where: {id: id}
        })

        if(!findProduct){
            throw new Error("Esse produto não existe na nossa base de dados.")
        }

        await prisma.product.update({
            where: {
                id: id
            },

            data:{
                isActive: false,
                updatedAt: new Date()
            }
        })
    }
}

export const productServices = new ProductServices()