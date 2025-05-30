import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { maintenanceServices } from "../service/Maintenance";

export async function maintenanceController(app: FastifyInstance) {
    app.patch("/maintenance/update", async (request: FastifyRequest, reply: FastifyReply) => {
        const registeredMaintenance = request.body as registerMaintenance
        try {
            await maintenanceServices.registerMaintenance(registeredMaintenance);
            reply.code(200).send()
        } catch (error: any) {
            reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/maintenance",async(request: FastifyRequest, reply: FastifyReply) => {
        try {
            const list = await maintenanceServices.getAll();
            reply.code(200).send(list)
        } catch (error: any) {
            reply.code(400).send({erro: error.message})
        }
    })



}