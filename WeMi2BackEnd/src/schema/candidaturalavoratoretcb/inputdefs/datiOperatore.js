export const inputDatiOperatore =  ` 

  input inputDatiOperatore {
    idLavoratore: Int!
    anniEsp: [Int]
    votoEsp: [Int]
    statoCandidatura: Int
    attributiUtenteLav: [AttrUtenteLav]
    notaOperatore: String
    documentiLavoratore: [JSON]
    documentiDaEliminare: [Int]
  }
`;