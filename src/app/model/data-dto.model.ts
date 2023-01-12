import { Agente } from "./agente.model"
import { DataModel } from "./data.model"
import { Regiao } from "./regiao.model"

export interface DataDTO {
    agente: Agente,
    regiaoList: Regiao[]
}

export function dataToDTO(data: DataModel) {
    
    const dataDTO: DataDTO[] = data.agentes.agente.map((item) => {

        return {
            agente: {
                codigo: Number(item.codigo._text),
                data: item.data._text
            },
            regiaoList: item.regiao.map((reg) => ({
                regionCode: reg._attributes.sigla,
                compra: reg.compra.valor.map(item => item._text).join(', '),
                geracao: reg.geracao.valor.map(item => item._text).join(', '),
            }
            ))
        };
    }) as unknown as DataDTO[];

    return dataDTO;
}