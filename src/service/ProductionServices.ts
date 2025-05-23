
import { Product_Production, Production } from "@prisma/client"
import { prisma } from "../prisma/client"


class ProductionServices {
    public async create(data: createProductionType) {

        if (data.vehicleComposition.length < 0) {
            throw new Error("Não existe uma composição cadastrada para essa produção.")
        }

        const list = []

        for (const product of data.vehicleComposition) {
            const foundProduct = await prisma.product.findUnique({
                where: { id: product }
            });


            if (!foundProduct) {
                throw new Error("Esse produto não está na nossa base de dados.")
            }

            if(foundProduct.stock === 0){
                throw new Error("Erro: Estamos sem estoque do produto.s")
            }

            if(foundProduct.isActive === false){
                throw new Error("Erro: Produto está inativo.")
            }

            await prisma.product.update({
                {data: }
            })
        }


        
        const production : Production = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            vehicleProduced: data.vehicleProduced,
            quantity: data.quantity,
            dateStart: data.dateStart,
            endDate: data.dateStart,
            approved: false
        }


    }
}


export const productionServices = new ProductionServices()