import { Situation } from "@prisma/client"

type updateSituationRequest = {
    id: string,
    approved: Situation
}