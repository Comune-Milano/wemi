export const estraiCurriculumLavoratore = [
  '',
  `query estraiCurriculumLavoratore($idUtenteLav: Int!, $idServizio: Int!, $brandColor: String, $anonymous: Boolean, $logoWemi: Boolean) {
    estraiCurriculumLavoratore(idUtenteLav: $idUtenteLav, idServizio: $idServizio, brandColor: $brandColor, anonymous: $anonymous, logoWemi: $logoWemi)
  }`,
  'estraiCurriculumLavoratore',
];

export const estraiServiziTcbCandidaturaLavoratore = [
  '',
  `query estraiServiziTcbCandidaturaLavoratore($idUtenteLav: Int!) {
    estraiServiziTcbCandidaturaLavoratore(idUtenteLav: $idUtenteLav)
  }`,
  'estraiServiziTcbCandidaturaLavoratore',
];
