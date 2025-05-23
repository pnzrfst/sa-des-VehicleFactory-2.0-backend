import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productionServices } from "../service/ProductionServices";


export async function productionController( app: FastifyInstance) {

    app.post('/production/create', async(request: FastifyRequest, reply: FastifyReply) =>{
        const production = request.body as createProductionType

        try {
            await productionServices.create(production);
            reply.code(200).send();
        } catch (error: any) {
            reply.code(400).send({erro: error.message})
        }

    })
}