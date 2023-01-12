import { Agente } from "./agente.model";

export interface Regiao{
    id?: number,
    geracao: string,
    compra: string,
    regionCode: string,
    agente?: Agente
}