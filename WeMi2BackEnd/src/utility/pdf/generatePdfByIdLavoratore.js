import psqlAdapter from 'helpers/psqlAdapter';
import { pdfDocDefinition } from 'pdf-definitions/curriculum-lavoratore/doc-definition';
import { getPdfBase64 } from 'utility/pdf/getPdfBase64';
import {
  estraiAttributiCurriculumLavoratore,
	estraiAttributiOffertaCurriculumLavoratore,
	estraiDominiTCBCurriculumLavoratore,
	estraiFotoProfiloLavoratore,
	estraiDatiCompetenze,
	estraiServiziTcbCandidaturaUtente,
	estraiRecensioniLavoratore,
	estraiEsprienzeLavoratore,
	estraiLivelloConoscenzaLingueAttr,
	estraiAttributiOffertaServizio,
	estraiAttributiDisponibilita,
} from 'resolvers/candidaturalavoratoretcb/queries/queries';
import { tyDominioTCB } from "constants/db/ty_dominio_tcb";
import { attributo as costantiAttributo } from "constants/db/attributo";
import { ID_SERVIZIO_TATA, ID_SERVIZIO_BADANTE } from 'constants/db/servizio_riferimento_tcb';

/**
 * 
 * @param {Number} idUtenteLav 
 * @param {String} brandColor hexadecimal like #77BC1F 
 * @param {Boolean} anonymous 
 */

export const generatePdfByIdLavoratore = async (idUtenteLav, idServizio, brandColor = '#77BC1F', anonymous = false, logoWemi = false) => {

  const { db } = psqlAdapter;

  const args = {
    idUtenteLav,
    idServizio,
    brandColor,
    anonymous
  };
  
	let pdfData = {
    brandColor,
    anonymous,
    logoWemi,
    retribuzioneRichiesta: {
      convivenza: [],
      convivenzaRidotta: [],
      assistenzaNotturna: [],
      presenzaNotturna: [],
      weekend: [],
      oraria: []
    }
  };

  const elencoServiziTcbPromise = db.any(estraiServiziTcbCandidaturaUtente, args);
	const elencoAttributiPromise = db.one(estraiAttributiCurriculumLavoratore, args);
  const elencoAttributiOffertaPromise = db.any(estraiAttributiOffertaCurriculumLavoratore, args);
  const elencoAttributiCompetenzeCuraBambiniBabySitterPromise = idServizio === ID_SERVIZIO_TATA ? 
                                                                db.any(estraiDatiCompetenze(costantiAttributo.FASCE_ETA_MANSIONI_TATA, idServizio), args) : 
                                                                Promise.resolve([]);
  const elencoAttributiCompetenzeCuraDellaCasaColfPromise = db.any(estraiDatiCompetenze(costantiAttributo.LS_MANSIONI_COLF, idServizio), args);
  const elencoAttributiCompetenzeBadantePromise = idServizio === ID_SERVIZIO_BADANTE ? 
                                                  db.any(estraiDatiCompetenze(costantiAttributo.LS_MANSIONI_BADANTE, idServizio), args) :
                                                  Promise.resolve([]);
	const elencoRecensioniLavoratorePromise = db.any(estraiRecensioniLavoratore, { idUtenteLav });
	const elencoEsprienzeLavoratorePromise = db.any(estraiEsprienzeLavoratore, { idUtenteLav });
	const elencoLivelloConoscenzaLinguePromise = db.any(estraiLivelloConoscenzaLingueAttr, { idUtenteLav });
  const elencoAttributiOffertaServizioPromise = db.any(estraiAttributiOffertaServizio, { idUtenteLav, idServizio });
  const elencoAttributiDisponibilitaPromise = db.any(estraiAttributiDisponibilita, { idUtenteLav, idServizio });

	const [
    elencoServiziTcb,
    elencoAttributoLav, 
		elencoAttributoOffertaLav,
		elencoAttributiCompetenzeCuraBambiniBabySitter,
    elencoAttributiCompetenzeCuraDellaCasaColf,
    elencoAttributiCompetenzeBadante,
		elencoRecensioniLavoratore,
		elencoEsprienzeLavoratore,
		elencoLivelloConoscenzaLingue,
    elencoAttributiOffertaServizio,
    elencoAttributiDisponibilita,
  ] = await Promise.all([
    elencoServiziTcbPromise,
		elencoAttributiPromise,
    elencoAttributiOffertaPromise,
    elencoAttributiCompetenzeCuraBambiniBabySitterPromise,
    elencoAttributiCompetenzeCuraDellaCasaColfPromise,
    elencoAttributiCompetenzeBadantePromise,
		elencoRecensioniLavoratorePromise,
		elencoEsprienzeLavoratorePromise,
		elencoLivelloConoscenzaLinguePromise,
    elencoAttributiOffertaServizioPromise,
    elencoAttributiDisponibilitaPromise,
  ]);
  
	pdfData.serviziTcb = elencoServiziTcb;
	pdfData.recensioniLavoratore = elencoRecensioniLavoratore;
	pdfData.esperienzeLavoratore = elencoEsprienzeLavoratore;

	const flattenElencoAttributiLav = Object.keys(elencoAttributoLav.attributiCvLavoratore)
		.reduce(
			(accumulator, objKey) => 
				({ ...accumulator, [objKey]: elencoAttributoLav.attributiCvLavoratore[objKey].value }),
			{}
		);

	const flattenElencoAttributoOffertaLav = elencoAttributoOffertaLav
		.map(element => element.attributoOffLav)
		.reduce(
			(accumulator, element) => ({ ...accumulator, ...element }),
			{}
		);

	const flattenAttributiOffertaServizio = elencoAttributiOffertaServizio
		.map(element => element.attributoOffServ)
		.reduce(
			(accumulator, element) => ({ ...accumulator, ...element }),
			{}
		);

	// Tutti i valori di attributi che fanno riferimento ad un dominio "stato".
	const cdValAttributiStato = [
		flattenElencoAttributiLav.cdStatoNascitaUtente,
		flattenElencoAttributiLav.cdCittadinanzaUtente,
		flattenElencoAttributiLav.sessoUtente,
	].filter(
		(value, index, selfArr) => Number.isFinite(value) && selfArr.indexOf(value) === index
  );

	const attributiDominioArgs = [
		...(cdValAttributiStato.length ? [tyDominioTCB.STATO] : []),
		...(elencoLivelloConoscenzaLingue?.length ? [tyDominioTCB.LINGUE_PARLATE] : []),
		...(flattenElencoAttributoOffertaLav.elencoInteressi ? [tyDominioTCB.INTERESSI] : []),
		...(flattenElencoAttributoOffertaLav.corsiTata ? [tyDominioTCB.CORSI_TATA] : []),
		...(flattenElencoAttributoOffertaLav.corsiBadante ? [tyDominioTCB.CORSI_BADANTE] : []),
		...(flattenElencoAttributoOffertaLav.elencoCarattere ? [tyDominioTCB.CARATTERE] : []),
    ...(flattenAttributiOffertaServizio.retribuzioneConvivenza ? [
      costantiAttributo.LS_STIPENDIO_CONVIVENTE.ty_dominio_tcb
    ] : []),
    ...(flattenAttributiOffertaServizio.retribuzioneConvivenzaRidotta ? [
      costantiAttributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.ty_dominio_tcb
    ] : []),
    ...(flattenAttributiOffertaServizio.retribuzioneOraria ? [
      costantiAttributo.LS_STIPENDIO_NON_CONVIVENTE.ty_dominio_tcb
    ] : []),
    ...(flattenAttributiOffertaServizio.retribuzionePresenzaNotturna ? [
      costantiAttributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb
    ] : []),
    ...(flattenAttributiOffertaServizio.retribuzioneWeekend ? [
      costantiAttributo.LS_STIPENDIO_WEEKEND.ty_dominio_tcb
    ] : []),
    ...(flattenAttributiOffertaServizio.retribuzioneAssistenzaNotturna ? [
      costantiAttributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.ty_dominio_tcb
    ] : []),
	];

	// Controlla se è necessario recuperare valori di dominio.
	let elencoDominiLavPromise = Promise.resolve([]);
	if (attributiDominioArgs.length > 0) {
		elencoDominiLavPromise = db.any(estraiDominiTCBCurriculumLavoratore, { attributiDominioArgs }); 
	}

	// Foto profilo (opzionale).
	let fotoProfiloLavPromise = Promise.resolve('');
	if (flattenElencoAttributoOffertaLav.fotoProfilo && 
			flattenElencoAttributoOffertaLav.fotoProfilo.length > 0
	) {
		const idAllegato = flattenElencoAttributoOffertaLav.fotoProfilo[0].cdValAttributo;
		fotoProfiloLavPromise = await db.one(estraiFotoProfiloLavoratore, {
			idUtenteLav,
			idAllegato,
		});
	}

	// Data approdo in italia.
	if (flattenElencoAttributoOffertaLav.inItaliaDal && 
		flattenElencoAttributoOffertaLav.inItaliaDal.length > 0
	) {
		const [ { dtVal: inItaliaDal } ] = flattenElencoAttributoOffertaLav.inItaliaDal;
		pdfData.inItaliaDal = inItaliaDal;
	}

	const [elencoDominiLav, { fotoProfiloLav }] = await Promise.all([
		elencoDominiLavPromise,
		fotoProfiloLavPromise
	]);

	// Aggiunta immagine del profilo ai dati del pdf.
	pdfData.base64ImmagineProfilo = fotoProfiloLav;

	// Elenco domini flat.
	const flattenElencoDominiLav = elencoDominiLav
		.map(element => element.dominiTcbCvLavoratore)
		.reduce(
			(accumulator, element) => ({ ...accumulator, ...element }),
			{}
		);

	const {
		cdStatoNascitaUtente,
		cdCittadinanzaUtente,
		sessoUtente,
		...restElencoAttributi
	} = flattenElencoAttributiLav;
	pdfData = { ...pdfData, ...restElencoAttributi };

	pdfData.sessoUtente = flattenElencoAttributiLav.sessoUtente;
	// Stato e cittadinanza utente.
	if (cdValAttributiStato.length > 0) {
		flattenElencoDominiLav.stato.forEach(
			element => {
				if (flattenElencoAttributiLav.cdStatoNascitaUtente === element.cdDominioTcb) {
					pdfData.statoNascitaUtente = element.tlValoreTestuale;
				}

				if (flattenElencoAttributiLav.cdCittadinanzaUtente === element.cdDominioTcb) {
					pdfData.cittadinanzaUtente = element.tlValoreTestuale;
				}
			}
		);
	}

	// Livello conoscenza lingue.
	pdfData.livConoscenzaLingue = elencoLivelloConoscenzaLingue?.map(
		linguaConosciuta => {
			const lingua = flattenElencoDominiLav.lingueParlate.find(
				element => element.cdDominioTcb === (+linguaConosciuta.cdValAttributo)
			);
			return {
				labelLingua: lingua.tlValoreTestuale,
				livello: linguaConosciuta.livello
			};
		}
  ) || [];
  
  // Fasce retribuzione convivenza.
  if (flattenAttributiOffertaServizio.retribuzioneConvivenza?.length) {
    pdfData.retribuzioneRichiesta.convivenza = flattenAttributiOffertaServizio.retribuzioneConvivenza.map(
      attrConvivenza => {
        const fasciaConvivenza = flattenElencoDominiLav.retribuzioniConvivente.find(
          element => element.cdDominioTcb === (+attrConvivenza.cdValAttributo)
        );

        return fasciaConvivenza?.tlValoreTestuale;
      }
    );
  }

  // Fasce retribuzione convivenza ridotta.
  if (flattenAttributiOffertaServizio.retribuzioneConvivenzaRidotta?.length) {
    pdfData.retribuzioneRichiesta.convivenzaRidotta = flattenAttributiOffertaServizio.retribuzioneConvivenzaRidotta.map(
      attrConvivenza => {
        const fasciaConvivenza = flattenElencoDominiLav.retribuzioniConvivenzaRidotta.find(
          element => element.cdDominioTcb === (+attrConvivenza.cdValAttributo)
        );

        return fasciaConvivenza?.tlValoreTestuale;
      }
    );
  }

  // Fasce retribuzione oraria.
  if (flattenAttributiOffertaServizio.retribuzioneOraria?.length) {
    pdfData.retribuzioneRichiesta.oraria = flattenAttributiOffertaServizio.retribuzioneOraria.map(
      attrConvivenza => {
        const fasciaConvivenza = flattenElencoDominiLav.retribuzioniNonConvivente.find(
          element => element.cdDominioTcb === (+attrConvivenza.cdValAttributo)
        );

        return fasciaConvivenza?.tlValoreTestuale;
      }
    );
  }

  // Fasce retribuzione presenza notturna.
  if (flattenAttributiOffertaServizio.retribuzionePresenzaNotturna?.length) {
    pdfData.retribuzioneRichiesta.presenzaNotturna = flattenAttributiOffertaServizio.retribuzionePresenzaNotturna.map(
      attrConvivenza => {
        const fasciaConvivenza = flattenElencoDominiLav.retribuzioniPresenzaNotturna.find(
          element => element.cdDominioTcb === (+attrConvivenza.cdValAttributo)
        );

        return fasciaConvivenza?.tlValoreTestuale;
      }
    );
  }

  // Fasce retribuzione weekend.
  if (flattenAttributiOffertaServizio.retribuzioneWeekend?.length) {
    pdfData.retribuzioneRichiesta.weekend = flattenAttributiOffertaServizio.retribuzioneWeekend.map(
      attrConvivenza => {
        const fasciaConvivenza = flattenElencoDominiLav.retribuzioniWeekend.find(
          element => element.cdDominioTcb === (+attrConvivenza.cdValAttributo)
        );

        return fasciaConvivenza?.tlValoreTestuale;
      }
    );
  }

  // Fasce retribuzione assistenza notturna.
  if (flattenAttributiOffertaServizio.retribuzioneAssistenzaNotturna?.length) {
    pdfData.retribuzioneRichiesta.assistenzaNotturna = flattenAttributiOffertaServizio.retribuzioneAssistenzaNotturna.map(
      attrConvivenza => {
        const fasciaConvivenza = flattenElencoDominiLav.retribuzioniAssistenzaNotturna.find(
          element => element.cdDominioTcb === (+attrConvivenza.cdValAttributo)
        );

        return fasciaConvivenza?.tlValoreTestuale;
      }
    );
  }

	// Livello capacita comunicative. 
	if (Array.isArray(flattenElencoAttributoOffertaLav.elencoCapacitaComunicative)
		&& flattenElencoAttributoOffertaLav.elencoCapacitaComunicative.length === 1
	) {
		pdfData.livCapacitaComunicative = flattenElencoAttributoOffertaLav.elencoCapacitaComunicative[0].nrVal;
	}

	// Flag patente auto. 
	if (Array.isArray(flattenElencoAttributoOffertaLav.patenteAuto) &&
		flattenElencoAttributoOffertaLav.patenteAuto.length === 1
	) {
		pdfData.flagPatente = flattenElencoAttributoOffertaLav.patenteAuto[0].fgVal === 'S';
	}

	// Livello gestione del tempo. 
	if (Array.isArray(flattenElencoAttributoOffertaLav.elencoCapacitaGestioneTempo) &&
		flattenElencoAttributoOffertaLav.elencoCapacitaGestioneTempo.length === 1
	) {
		pdfData.livCapacitaGestioneTempo = flattenElencoAttributoOffertaLav.elencoCapacitaGestioneTempo[0].nrVal;
	}

	// Flag automunito. 
	if (Array.isArray(flattenElencoAttributoOffertaLav.flagAutomunito) &&
		flattenElencoAttributoOffertaLav.flagAutomunito.length === 1
	) {
		pdfData.utenteAutomunito = flattenElencoAttributoOffertaLav.flagAutomunito[0].fgVal === 'S';
	}

	// Media competenze relazionali. 
	if (Array.isArray(flattenElencoAttributoOffertaLav.mediaCompetenzeRelazionali) &&
		flattenElencoAttributoOffertaLav.mediaCompetenzeRelazionali.length === 1
	) {
		pdfData.livCompetenzeRelazionali = flattenElencoAttributoOffertaLav.mediaCompetenzeRelazionali[0].nrVal;
	}

	// Caratteristiche carattere.
  pdfData.caratteristicheCarattere = flattenElencoAttributoOffertaLav.elencoCarattere ?
  flattenElencoAttributoOffertaLav.elencoCarattere
		.map(attrOffLav => {
			if (attrOffLav.cdValAttributo === 0) {
				return attrOffLav.txVal;
			}

			const matchedAttributoOffLav = flattenElencoDominiLav.carattere.find(
				element => element.cdDominioTcb === attrOffLav.cdValAttributo
			);
			return matchedAttributoOffLav ? matchedAttributoOffLav.tlValoreTestuale : '';
    }) : null;

	// Elenco hobby. 
  pdfData.elencoHobby = flattenElencoAttributoOffertaLav.elencoInteressi ? 
  flattenElencoAttributoOffertaLav.elencoInteressi
		.map(attrOffLav => {
			if (attrOffLav.cdValAttributo === 0) {
				return attrOffLav.txVal;
			}

			const matchedAttributoOffLav = flattenElencoDominiLav.interessi.find(
				element => element.cdDominioTcb === attrOffLav.cdValAttributo
			);
			return matchedAttributoOffLav ? matchedAttributoOffLav.tlValoreTestuale : '';
		}) : null;

	// Titoli di studio.
	pdfData.titoliDiStudio = flattenElencoAttributoOffertaLav.corsiTata ? flattenElencoAttributoOffertaLav.corsiTata
		.map(attrOffLav => {
			if (attrOffLav.cdValAttributo === 0) {
				return attrOffLav.txVal;
			}

			const matchedAttributoOffLav = flattenElencoDominiLav.corsiTata.find(
				element => element.cdDominioTcb === attrOffLav.cdValAttributo
			);
			return matchedAttributoOffLav ? matchedAttributoOffLav.tlValoreTestuale : '';
		}) : [];

	// Corsi.
	pdfData.corsi = flattenElencoAttributoOffertaLav.corsiBadante ? flattenElencoAttributoOffertaLav.corsiBadante
    .map(attrOffLav => {
      if (attrOffLav.cdValAttributo === 0) {
        return attrOffLav.txVal;
      }

      const matchedAttributoOffLav = flattenElencoDominiLav.corsiBadante.find(
        element => element.cdDominioTcb === attrOffLav.cdValAttributo
      );
      return matchedAttributoOffLav ? matchedAttributoOffLav.tlValoreTestuale : '';
    }) : [];
  
  //Competenze Baby-Sitter
  pdfData.attributiCompetenzeCuraBambiniBabySitter = elencoAttributiCompetenzeCuraBambiniBabySitter;

  //Competenze Colf
  pdfData.attributiCompetenzeCuraDellaCasaColf = elencoAttributiCompetenzeCuraDellaCasaColf;

  //Competenze badante
  pdfData.attributiCompetenzeBadante = elencoAttributiCompetenzeBadante;

  //Disponibilità
  pdfData.attributiDisponibilita = elencoAttributiDisponibilita;

	const computedDocDefinition = await pdfDocDefinition(pdfData);
	return getPdfBase64(computedDocDefinition, {});
};