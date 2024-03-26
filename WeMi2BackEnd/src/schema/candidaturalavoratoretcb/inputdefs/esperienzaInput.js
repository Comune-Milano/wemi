
export const esperienzaInput = `
input esperienzaInput {
  idRichiesta: Int
  idUtenteLav: Int!
  serviziPrestati: [Int]!
  inizioPeriodo: String
  finePeriodo: String
  descrizioneEsp: String
  arrayAttrFamiglia: [attrFamigliaInput]!
  tipologiaServizio: String
}
`
