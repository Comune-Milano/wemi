export const cercaQualifiche = (qualificheId = [], contenutoPerQualifiche = [], locale="it") => {
  const ris = [];
  contenutoPerQualifiche.forEach(element => {
    const qualifica = qualificheId.find(el => element.id_contenuto === el);
    if (qualifica) {
      ris.push(element.tl_testo_1[locale]);
    }
  });
  return ris;
}