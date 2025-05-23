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
            orderBy: { createdAt: 'desc' }
        })

        return allProducts.map(product => ({
            description: product.description,
            code: product.code,
            unity: product.unity,
            stock: product.stock
        }))
    }

    public async update({ description, code, unity, stock }: updateProductRequest): Promise<void> {
        const productAlreadyExist = await prisma.product.findUnique({
            where: { code: code }
        })

        if (!productAlreadyExist) {
            throw new Error("Esse produto não existe na nossa base de dados.")
        }

        await prisma.product.update({
            where: {
                code: code
            },
            data: {
                description: description,
                code: code,
                unity: unity,
                stock: stock
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
                isActive: false
            }
        })
    }
}

export const productServices = new ProductServices()