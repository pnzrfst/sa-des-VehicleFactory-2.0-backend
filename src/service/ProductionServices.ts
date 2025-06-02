import { Product_Production, Production, Quality } from "@prisma/client";
import { prisma } from "../prisma/client";
import { Situation } from "../types/Situation";

class ProductionServices {
  public async create(data: createProductionType): Promise<void> {
    if (data.vehicleComposition.length === 0) {
      throw new Error(
        "Não existe uma composição cadastrada para essa produção."
      );
    }

    const productionId = crypto.randomUUID();

    for (const product of data.vehicleComposition) {
      const foundProduct = await prisma.product.findUnique({
        where: { id: product.productId },
      });

      if (!foundProduct) {
        throw new Error("Esse produto não está na nossa base de dados.");
      }

      const totalNeeded = data.quantity * product.quantityPerVehicle;

      if (foundProduct.stock < totalNeeded) {
        throw new Error("Erro: Estamos sem estoque do produto.");
      }

      if (foundProduct.isActive === false) {
        throw new Error("Erro: Produto está inativo.");
      }

      await prisma.$transaction([
        prisma.product.update({
          where: { id: foundProduct.id },
          data: {
            stock:
              foundProduct.stock - data.quantity * product.quantityPerVehicle,
          },
        }),
      ]);
    }

    const production: Production = {
      id: productionId,
      createdAt: new Date(),
      vehicleProduced: data.vehicleProduced,
      quantity: data.quantity,
      dateStart: data.dateStart,
      endDate: data.dateStart,
    };

    const quality: Quality = {
      id: crypto.randomUUID(),
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: Situation.Pendentes,
      idProduction: production.id,
    };

    await prisma.$transaction([
      prisma.production.create({
        data: production,
      }),
      prisma.quality.create({
        data: quality,
      }),
    ]);

    for (const product of data.vehicleComposition) {
      await prisma.product_Production.create({
        data: {
          id: crypto.randomUUID(),
          idProduct: product.productId,
          idProduction: productionId,
        },
      });
    }
  }

  public async getAll() {
    const allProductions = await prisma.production.findMany({
      orderBy: { createdAt: "desc" },
    });

    return allProductions.map((production) => ({
      vehicleProduced: production.vehicleProduced,
      quantity: production.quantity,
      dateStart: production.dateStart,
      endDate: production.endDate,
      createdAt: production.createdAt,
    }));
  }
}

export const productionServices = new ProductionServices();
