import { Maintenance, Situation } from "@prisma/client";
import { prisma } from "../prisma/client";

class MaintenanceServices {
    public async registerMaintenance({ id, idProduction, description }: registerMaintenance) {
        const maintenance = await prisma.maintenance.findUnique({
            where: { id: id }
        })

        if (!maintenance) {
            throw new Error("ERRO: Não foi encontrada nenhuma manutenção")
        }

        const updatedMaintenance = {
            description: description
        }

        await prisma.maintenance.update({
            where: { id: id },
            data: updatedMaintenance
        });


        await prisma.quality.updateMany({
            where: { idProduction: idProduction },
            data: { status: Situation.pendentes }
        })
    }

    public async getAll() {

        const allMaintenance = await prisma.maintenance.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return allMaintenance.map(maintenance => ({
            id: maintenance.id,
            lote: maintenance.idProduction,
            description: maintenance.description,
            createdAt: maintenance.createdAt,
            updatedAt: maintenance.updatedAt
        }))
    }
}


export const maintenanceServices = new MaintenanceServices()