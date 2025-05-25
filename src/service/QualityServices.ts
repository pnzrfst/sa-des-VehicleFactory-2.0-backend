import { Situation } from "@prisma/client";
import { prisma } from "../prisma/client";
import { updateSituationRequest } from "../types/Quality";

class QualityServices {

  public async getAll() {
    const list = await prisma.production.findMany({
      orderBy: {createdAt: 'desc'}
    })

    return list.map((production) => ({
      veihicleProduced: production.vehicleProduced,
      quantity: production.quantity,
      dateStart: production.dateStart,
      endDate: production.endDate,
      approved: production.approved
    }))
  }


  public async getPending() {
    const list = await prisma.production.findMany({
      where: {
        approved: "pendentes",
      },
    });

    return list.map((production) => ({
      vehicleProduced: production.vehicleProduced,
      quantity: production.quantity,
      dateStart: production.dateStart,
      endDate: production.endDate,
      approved: production.approved,
    }));
  }

  public async getApproved() {
    const list = await prisma.production.findMany({
      where: {
        approved: "aprovadas",
      },
    });

    return list.map((production) => ({
      vehicleProduced: production.vehicleProduced,
      quantity: production.quantity,
      dateStart: production.dateStart,
      endDate: production.endDate,
      approved: production.approved,
    }));
  }

  public async getRejected() {
    const list = await prisma.production.findMany({
      where: {
        approved: "reprovadas",
      },
    });

    return list.map((production) => ({
      vehicleProduced: production.vehicleProduced,
      quantity: production.quantity,
      dateStart: production.dateStart,
      endDate: production.endDate,
      approved: production.approved,
    }));
  }

  public async patchApprovedProduction({
    id,
    approved,
  }: updateSituationRequest): Promise<void> {
    const productionAlreadyExist = await prisma.production.findUnique({
      where: { id: id },
    });

    if (!productionAlreadyExist) {
      throw new Error("ERRO: Essa produção não consta na nossa base de dados.");
    }

    await prisma.production.update({
      where: {
        id: id,
      },
      data: {
        approved: approved,
      },
    });
  }
}

export const qualityServices = new QualityServices();
