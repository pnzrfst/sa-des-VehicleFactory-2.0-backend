import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productServices } from "../service/ProductServices";


export async function productController(app: FastifyInstance) {
    
    //criar o produto
    app.post('/product/create', async(request: FastifyRequest,  reply: FastifyReply) =>{
        const body = request.body as createProductRequest;

        try {
            await productServices.create(body);
            reply.code(200).send()
        } catch (error: any) {
            reply.code(400).send({erro: error.message})
        }
    })

    //trazer os produtos criados
    app.get('/product', async(request: FastifyRequest, reply: FastifyReply) =>{
        try {
            const list = await productServices.getAll();
            reply.code(200).send(list)
        } catch (error: any) {
            reply.code(400).send({erro: error.message});
        }
    })

    app.get('/product/filtered', async(request: FastifyRequest, reply: FastifyReply) =>{
        const {search} =  request.query as { search: string };
        try {
            const list = await productServices.getByDescription(search);
            reply.code(200).send(list)
        } catch (error: any) {
            reply.code(400).send({erro: error.message});
        }
    })
    
    //atualizar um produto
    app.patch('/product/update', async(request: FastifyRequest, reply: FastifyReply) =>{
        const updatedProduct = request.body as updateProductRequest;
        
        try {
            await productServices.update(updatedProduct);
            reply.code(200).send()
        } catch (error: any) {
            reply.code(400).send({erro: error.message})
        }
    })

    app.delete('/product/delete', async(request: FastifyRequest, reply: FastifyReply) => {
        const productToDelete = request.body as deleteProductRequest

        try {
            await productServices.delete(productToDelete);
            reply.code(200).send();
        } catch (error: any) {
            reply.code(400).send({erro: error.message})
        }
    })

}