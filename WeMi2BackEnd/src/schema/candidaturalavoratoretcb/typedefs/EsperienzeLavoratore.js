export const EsperienzeLavoratore = `
type EsperienzeLavoratore {
  idRichiesta: Int!
  serviziPrestati: [Int]!
  inizioPeriodo: Timestamp
  finePeriodo: Timestamp
  descrizioneEsp: String
  attributi: [AttributoFamiglia]
  nomeServizioAltro: String
  type: String
}
`