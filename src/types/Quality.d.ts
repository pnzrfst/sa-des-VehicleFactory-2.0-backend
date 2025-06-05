import { Situation } from "@prisma/client"

type createQualityType = {
    id: string,
    description: string,
    idProduction: string,
    status: Situation
}

type updateQualityType = {
    id: string;
    idProduction: string;
    description: string;
    status: Situation
}