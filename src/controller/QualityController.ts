import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityServices } from "../service/QualityServices";
// import { updateSituationRequest } from "../types/Quality";

export async function qualityController(app: FastifyInstance) {
  // app.get("/quality", async (request: FastifyRequest, reply: FastifyReply) => {
  //   try {
  //     const list = await qualityServices.getAll();
  //     reply.code(200).send(list);
  //   } catch (error: any) {
  //     reply.code(400).send({ erro: error.message });
  //   }
  // });

  // app.get(
  //   "/quality/approved",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     try {
  //       const list = await qualityServices.getApproved();
  //       reply.code(200).send(list);
  //     } catch (error: any) {
  //       reply.code(400).send({ erro: error.message });
  //     }
  //   }
  // );

  // app.get(
  //   "/quality/rejected",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     try {
  //       const list = await qualityServices.getRejected();
  //       reply.code(200).send(list);
  //     } catch (error: any) {
  //       reply.code(400).send({ erro: error.message });
  //     }
  //   }
  // );

  // app.get(
  //   "/quality/pending",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     try {
  //       const list = await qualityServices.getPending();
  //       reply.code(200).send(list);
  //     } catch (error: any) {
  //       reply.code(400).send({ erro: error.message });
  //     }
  //   }
  // );

  // app.patch(
  //   "/quality/update",
  //   async (request: FastifyRequest, reply: FastifyReply) => {
  //     try {
  //       const productionToUpdate = request.body as updateSituationRequest


  //       const list = await qualityServices.patchApprovedProduction(productionToUpdate);
  //       reply.code(200).send(list);
  //     } catch (error: any) {
  //       reply.code(400).send({ erro: error.message });
  //     }
  //   }
  // );
}
