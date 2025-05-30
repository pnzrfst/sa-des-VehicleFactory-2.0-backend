import { Maintenance, Quality, Situation } from "@prisma/client";
import { prisma } from "../prisma/client";
import { updateQualityType } from "../types/Quality";

class QualityServices {

  public async updateSituation({ id, idProduction, description, status }: updateQualityType) {
    const qualityRecordExists = await prisma.quality.findUnique({
      where: { id: id }
    })

    if (!qualityRecordExists) {
      throw new Error("ERRO: não existe nenhum registro para essa produção.")
    }

    if (status === Situation.aprovadas) {
      const productionDataUpdate = {
        description: description,
        status: status
      }

      await prisma.quality.update({
        where: { id: id },
        data: productionDataUpdate
      })
    } else if (status === Situation.reprovadas) {

      const productionToMaintain = await prisma.production.findUnique({
        where: { id: idProduction }
      })

      if (!productionToMaintain) {
        throw new Error("Produção não encontrada.");
      }

      const productionDataUpdate = {
        description: description,
        status: status
      }

      await prisma.quality.update({
        where: { id: id },
        data: productionDataUpdate
      })

      const maintenance: Maintenance = {
        id: crypto.randomUUID(),
        description: "",
        idProduction: idProduction,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await prisma.maintenance.create({ data: maintenance });

    } else {
      throw new Error("ERRO: Por favor, insira um valor válido entre PENDENTE, APROVADA OU REPROVADA.")
    }

  }

  public async getAll() {
    const allQualitys = await prisma.quality.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return allQualitys.map(quality => ({
      idProduction: quality.idProduction,
      description: quality.description,
      status: quality.status,
      createdAt: quality.createdAt,
      updatedAt: quality.updatedAt
    }))
  }
}

export const qualityServices = new QualityServices();
