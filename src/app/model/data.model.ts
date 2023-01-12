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
    codigo: { _text: string },
    data: { _text: string },
    regiao: Regiao[],

}

export interface DataModel{
    agentes:{
        agente: Agente[]
    }
}