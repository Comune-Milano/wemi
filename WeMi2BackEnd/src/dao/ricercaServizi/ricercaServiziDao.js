import * as query from '../../sql/ricercaservizi/select';
import { condition0_18_active } from 'sql/sharedConditions/condition0_18';

/**
 * Classe che gestisce la ricerca dei servizi
 */
export default class ricercaServiziDao {
  /**
   * The constructor of the class
   * @param {*} connection the connection object
   * @param {*} formatter the formatter
   */
  constructor(connection, formatter) {
    this.connection = connection;
    this.formatter = formatter;
  }
  /**
   * The function to compose filters
   * @param {*} filters the filters
   * @returns {*} the filters composed
   */
  composeFilters(filters) {
    let conditions = '';

    if (!filters) {
      return conditions;
    }
    if (filters.is0_18) {
      conditions += this.formatter.format(condition0_18_active);
    }
    if (Array.isArray(filters.mansioni) && filters.mansioni.length > 0) {
      conditions += this.formatter.format(query.checkMansioni, {
        mansioni: filters.mansioni,
      });
    }
    if (Array.isArray(filters.destinatari) && filters.destinatari.length > 0) {
      conditions += this.formatter.format(query.checkDestinatari, {
        destinatari: filters.destinatari,
      });
    }
    if (Array.isArray(filters.fasceOrarie) && filters.fasceOrarie.length > 0) {
      conditions += this.formatter.format(query.checkFasceOrarie, {
        fasceOrarie: filters.fasceOrarie,
      });
    }
    if ([1, 2].includes(filters.cdTipoServizioErogato)) {
      conditions += this.formatter.format(query.checkCdStatoServizi, {
        cdTipoServizioErogato: filters.cdTipoServizioErogato,
      });
    }
    if (typeof filters.prezzo === 'number') {
      conditions += this.formatter.format(query.checkPrezzo, {
        prezzo: filters.prezzo,
        quantita: filters.quantitaUnita,
      });
    }
    if (Number.isInteger(filters.municipio)) {
      conditions += this.formatter.format(query.checkMunicipio, {
        municipio: filters.municipio,
      });
    }
    if (filters.gratuito) {
      conditions += query.checkGratuito;
    }
    if (filters.quantitaPersone && filters.quantitaUnita) {
      conditions += this.formatter.format(query.checkPersoneQuantita, {
        quantitaPersone: filters.quantitaPersone,
        quantitaUnita: filters.quantitaUnita,
      });
    }
    return conditions;
  }
  /**
   * The function to compose order by clause
   * @param {*} type the type
   * @returns {*} the order by composed
   */
  composeOrderBy(type) {
    switch (type) {
      case 1: return query.prezzoCrescente;
      case 2: return query.prezzoDecrescente;
      case 3: return query.recensioneDecrescente;
      default: return query.prezzoCrescente;
    }
  }
  /**
   * Extract the type of service
   * @param {*} ids the ids
   * @returns {number} the code
   */
  extractCdTipoServizio(ids) {
    if (Array.isArray(ids) && ids.length > 0) {
      const individuale = ids.includes(1);
      const condiviso = ids.includes(2);
      if (individuale && condiviso) {
        return 3;
      }
      if (individuale) {
        return 1;
      }
      if (condiviso) {
        return 2;
      }
    }
    return 3;
  }

  /**
   * The function to select the service institution
   * @param {*} idServizio id del servizio di riferimento
   * @param {*} filters filtri da applicare
   * @param {*} index numero di pagina
   * @param {*} elementsToShow numero di elementi da restituire per pagina
   * @returns {object} the object
   */
  async selectServiziEnteByIdServizio(
    idServizio,
    filters,
    index = 1,
    elementsToShow = 6,
    is0_18,
  ) {
    const orderState = this.composeOrderBy(filters.orderBy);
    const cdTipoServizioErogato = this.extractCdTipoServizio(filters.cdStatoServizi);
    const whereConditions = this.composeFilters({
      is0_18,
      ...filters,
      cdTipoServizioErogato,
    });
    const select = query.selectServicesFields(whereConditions, orderState);
    const result = await this.connection.any(select, {
      idServizioRiferimento: idServizio,
      quantita: filters.quantitaUnita,
      cdTipoServizioErogato,
      limit: elementsToShow,
      offset: (index - 1) * elementsToShow,
    });
    return {
      itemsPerPage: elementsToShow,
      page: index,
      ...result.reduce((acc, el) => ({
        totalItems: el.count,
        data: [
          ...acc.data, el,
        ],
      }), { data: [] }),
    };
  }


  /**
   * Metodo che estrae i filtri mansioni in base al servizio di riferimento
   * @param {*} idServizioRiferimento the id of the service
   * @returns {object[]} le mansioni
   */
  getMansioni(idServizioRiferimento) {
    return this.connection.any(query.selectMansioni, { idServizioRiferimento });
  }

  /**
   * Metodo che estrae i filtri fasce orarie in base al servizio di riferimento
   * @param {*} idServizioRiferimento the id of the service
   * @returns {object[]} le fascie orarie
   */
  getFasceOrarie(idServizioRiferimento) {
    return this.connection.any(query.selectFasceOrarie, { idServizioRiferimento });
  }

  /**
   * Metodo che estrae il filtro destinatari in base al servizio di riferimento
   * @param {*} idServizioRiferimento the id of the service
   * @returns {object[]} i destinatari
   */
  getDestinatari(idServizioRiferimento) {
    return this.connection.any(query.selectDestinatari, { idServizioRiferimento });
  }

  /**
   * Metodo che estrae il prezzo massimo e minimo di un dato servizio di riferimento
   * @param {*} idServizioRiferimento the id service
   * @param {*} filters the filters
   * @returns {object} the price
   */
  getPrezzoMaxMin(idServizioRiferimento, filters) {
    const { prezzo, ...restFilters } = filters;
    const where = this.composeFilters(restFilters);
    return this.connection.oneOrNone(query.selectPrezzoMaxMin(where), {
      idServizioRiferimento,
      quantita: filters.quantitaUnita,
    });
  }

  /**
   * Metodo che estrae i dati di un servizio(attualmente solo il nome)
   * @param {*} idServizioRiferimento the id of service
   * @returns {object} the service data
   */
  getServiceData(idServizioRiferimento) {
    return this.connection.oneOrNone(
      query.selectServizioRiferimento, { idServizioRiferimento },
      serviceData => ({
        ...serviceData,
        fgGenereMaschile: serviceData?.fgGenereMaschile === '0',
      })
    );
  }

  /**
   * Metodo che estrae gli spazi wemi di un ente
   * @param {*} idEnte the of institution
   * @returns {object[]} the array of space WeMi
   */
  getSpaziWemi(idEnte) {
    return this.connection.any(query.selectSpaziWemi, { idEnte });
  }

  /**
   * get the min person
   * @param {*} idServizioRiferimento the service
   * @returns {object[]} the return
   */
  getMinPersoneQuantita(idServizioRiferimento) {
    return this.connection.oneOrNone(query.selectMinPersoneQuantita, { idServizioRiferimento });
  }

  /**
   * Metodo che estrae i filtri relativi alla tipologia di servizio (individuale/condiviso)
   * @param {*} idServizioRiferimento the service
   * @returns {object[]} the return
   */
  async getCdStatoServizi(idServizioRiferimento) {
    const individuale = { id: 1, label: 'Individuale' };
    const condiviso = { id: 2, label: 'Condiviso' };
    const result = await this.connection.any(query.selectCdTipoServizio, { idServizioRiferimento });
    if (result.some(el => el.codice === 3)) {
      return [
        individuale,
        condiviso,
      ];
    }
    return result
      .filter(el => el.codice === 1 || el.codice === 2)
      .map(el => ({
        id: el.codice,
        label: el.codice === 1 ? 'Individuale' : 'Condiviso',
      }));
  }

  /**
   * Restituisce un oggetto indicante se è presente almeno un servizio di quella tipologia
   * @param {*} idServizioRiferimento the id of the service
   * @returns {object} the object to return
   */
  async getServicesCodes(idServizioRiferimento) {
    const cdStatoServizio = (await this.connection.any(
      query.selectCdTipoServizio,
      { idServizioRiferimento }
    ))
      .map(el => el.codice);

    const cdOffertaServizio = (await this.connection.any(
      query.selectCdTipoOfferta,
      { idServizioRiferimento }
    ))
      .map(el => el.codice);

    const gratuito = cdOffertaServizio.some(el => el === 1 || el === 2);

    return {
      individuale: cdStatoServizio.indexOf(1) > -1,
      condiviso: cdStatoServizio.indexOf(2) > -1,
      misto: cdStatoServizio.indexOf(3) > -1,
      gratuito: gratuito,
      pagamento: cdOffertaServizio.indexOf(3) > -1,
    };
  }
  /**
   * The function to get services
   * @param {object[]} services the list of services
   * @param {object} filters the list of filters
   * @param {number} idService the idService
   * @returns {object[]} returns the list of services
   */
  async getServices(services = [], filters = {}, idService) {
    if (!(services.length > 0) || !(Object.keys(filters).length > 0)) {
      return [];
    }
    const mappedServices = services.map(service => service.idServizioEnte);
    const orderState = this.composeOrderBy(filters.orderBy);
    const formattedQuery = this.formatter.format(`
      ${query.verifyServices}
      ${orderState}
    `);
    return await this.connection.any(formattedQuery, { services: mappedServices, quantita: filters.quantitaPersona, idServizioRiferimento: idService });
  }
}