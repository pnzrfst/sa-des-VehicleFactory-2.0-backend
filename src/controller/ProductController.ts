import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productServices } from "../service/ProductServices";


export async function productController(app: FastifyInstance) {
    

    app.post('/product/create', async(request: FastifyRequest,  reply: FastifyReply) =>{
        const body = request.body as createProductRequest;

        try {
            await productServices.create(body);
            reply.code(200).send()
        } catch (error: any) {
            reply.code(400).send({erro: error.message})
        }
    })

    app.get('/product', async(request: FastifyRequest, reply: FastifyReply) =>{
        try {
            const list = await productServices.getAll();
            reply.code(200).send(list)
        } catch (error: any) {
            reply.code(400).send({erro: error.message});
        }
    })
    

    app.patch('/product/update', async(request: FastifyRequest, reply: FastifyReply) =>{
        
    })

}