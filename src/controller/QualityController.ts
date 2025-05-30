import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityServices } from "../service/QualityServices";
import { updateQualityType } from "../types/Quality";


export async function qualityController(app: FastifyInstance) {
  app.get("/quality", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const list = await qualityServices.getAll();
      reply.code(200).send(list);
    } catch (error: any) {
      reply.code(400).send({ erro: error.message });
    }
  });
  app.patch("/quality/update", async (request: FastifyRequest, reply: FastifyReply) => {
    const updatedProduction = request.body as updateQualityType
    try {
      await qualityServices.updateSituation(updatedProduction);
      reply.code(200).send()
    } catch (error: any) {
      reply.code(400).send({ erro: error.message })
    }
  })
}
