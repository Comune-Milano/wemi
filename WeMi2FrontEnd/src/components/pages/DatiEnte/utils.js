export const getInitialDataset = (parameters = {}) => {
  const { data = {}, listaCategorieAccreditamento = [], listaSpaziWeMi = [] } = parameters;

  const categorieAccreditamento = listaCategorieAccreditamento.filter((categoria) =>
    !!(data.id_cat_accreditamento?.find(idCategoria => idCategoria === categoria.id)));

  const spaziWeMi = listaSpaziWeMi.filter((spazioWeMi) =>
    !!(data.id_spazio_wemi?.find(idSpazio => idSpazio === spazioWeMi.id)));

  return {
    nomeEnte: data.nm_ente || '',
    emailEnte: data.ptx_email || '',
    partitaIva: data.id_partita_iva_ente || '',
    ragioneSociale: data.nm_ente_completo || '',
    spaziWeMi: spaziWeMi || [],
    stato: {
      id: data.cd_stato_ente ? Number.parseInt(data.cd_stato_ente, 10) : 1,
      value: data.tl_valore_testuale?.it || 'Bozza',
    },
    operatoriServiziWeMi: data.nr_operatori_servizi_wemi || 0,
    categorieAccreditate: categorieAccreditamento || [],
  };
};

const jsSede = {
  nomeSede: 'Sede Legale',
  indirizzo: {
    txCAP: null,
    txCitta: '',
    txIndirizzo: '',
    txProvincia: '',
  },
};

export const transformForSave = (values = {}, isModify) => {
  const {
    spaziWeMi,
    categorieAccreditate,
    idEnte,
    idCittadino,
  } = values;
  const spaziSelezionati = [];
  const categorieSelezionate = [];
  const inputObjectForBackend = {};
  Array.from(spaziWeMi).forEach(ele => {
    spaziSelezionati.push(ele.id);
  });
  Array.from(categorieAccreditate).forEach(ele => {
    categorieSelezionate.push(ele.id);
  });
  inputObjectForBackend.id_partita_iva_ente = values.partitaIva;
  inputObjectForBackend.nm_ente = values.nomeEnte;
  inputObjectForBackend.nr_operatori_servizi_wemi = values.operatoriServiziWeMi ? Number.parseInt(values.operatoriServiziWeMi, 10) : 0;
  inputObjectForBackend.nm_ente_completo = values.ragioneSociale;
  inputObjectForBackend.ptx_email = values.emailEnte;
  inputObjectForBackend.cd_stato_ente = values.stato ? values.stato.id.toString() : '';
  inputObjectForBackend.id_spazio_wemi = spaziSelezionati;
  inputObjectForBackend.id_cat_accreditamento = categorieSelezionate;
  if (isModify) {
    return {
      input: {
        ...inputObjectForBackend,
        id_ente: idEnte,
      },
    };
  }
  inputObjectForBackend.idCittadino = idCittadino;
  return { input: { ...inputObjectForBackend, js_sede: jsSede } };
};

export const mapper = (response) => response.map(el => ({ id: el.value, value: el.textValue }));
