import { codiceMunicipio } from "types/codiceMunicipio";

export function getMapMunicipalityRecord(idMunicipio) {
  const colorByMunicipioMap = new Map([
    [codiceMunicipio.MUNICIPIO_1, {
      brandColor: 'yellow',
      contrastColor: 'black',
    }],
    [codiceMunicipio.MUNICIPIO_2, {
      brandColor: 'red',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_3, {
      brandColor: 'purple',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_4, {
      brandColor: 'darkPurple',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_5, {
      brandColor: 'primary',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_6, {
      brandColor: 'green',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_7, {
      brandColor: 'blue',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_8, {
      brandColor: 'orange',
      contrastColor: 'white',
    }],
    [codiceMunicipio.MUNICIPIO_9, {
      brandColor: 'marinBlue',
      contrastColor: 'black',
    }],
  ]);

  return colorByMunicipioMap.get(idMunicipio) || {};
}

export function getMunicipioBrandColor(idMunicipio) {
  const municipalityRecord = getMapMunicipalityRecord(idMunicipio);
  return municipalityRecord.brandColor;
}

export function getMunicipioContrastColor(idMunicipio) {
  const municipalityRecord = getMapMunicipalityRecord(idMunicipio);
  return municipalityRecord.contrastColor;
}
