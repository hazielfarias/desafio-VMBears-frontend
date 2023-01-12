enum Sigla{
    SE,
    S,
    NE,
    N
}

interface Item{
    _text: string
}

interface Regiao{
    _attributes:{
        sigla: Sigla
    },
    compra: {
        valor: Item[]
    },
    geracao: {
        valor: Item[]
    },
    // precoMedio: {
    //     valor: Item[]
    // },
}

interface Agente{
    codigo: number,
    data: string,
    regiao: Regiao[],

}

export interface DataModel{
    agentes:{
        agente: Agente[]
    }
}