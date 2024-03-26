import moment from 'moment';

export const mapUserData = (response) => {
  return {
    idUtente: response.idUtente,
    dataUltimaMod: response.dateLastModified ? moment(response.dateLastModified).format('DD/MM/YYYY-LT') : null,
    email: response.email,
    fineValidita: response.endValidDate,
    inizioValidita: response.startValidDate,
    nome: response.name,
    cognome: response.surname,
    codiceProfilo: response.profile.code,
    descProfilo: response.profile.description,
    usernameUltimaMod: response.userLastModified.username,
    autorizzazioni: dataMapperProfileCodesItems(response.authorizations)
  };
};

export const dataMapperProfileCodesItems = (response) => {
  return response?.map(el => {
    return {
      id: el.code,
      value: el.description
    }
  })
};