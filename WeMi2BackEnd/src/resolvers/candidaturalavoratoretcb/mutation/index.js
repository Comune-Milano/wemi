import { deleteCandidacy } from "./deletecandidacy";
import { sendCandidacyRequest } from "./sendcandidacy";
import { aggiornaStepsLavoratoreTCB } from "./aggiornaStepsLavoratoreTCB";
import { deleteLingueEstere003 } from "./deleteLingueEstere003";
import { inserisciLingueEstere003 } from "./inserisciLingueEstere003";
import { inizializzaUtenteLav } from "./inizializzaUtenteLav";
import { inizializzaUtenteLavImpersonificazione } from "./inizializzaUtenteLavImpersonificazione";
import { inserisciDati003 } from "./inserisciDati003";
import { inserisciItalianoIstruzioneFormazione } from "./inserisciItalianoIstruzioneFormazione";
import { inserisciDati005 } from "./inserisciDati005";
import { inserisciDati0016 } from "./inserisciDati0016";
import { inserisciModificaDati002 } from "./inserisciModificaDati002";
import { inserisciModificaAttributoOffertaServizio } from "./inserisciModificaAttributoOffertaServizio";
import { inserisciModificaDisponibilitaCandidaturaLavoratore } from "./inserisciModificaDisponibilitaCandidaturaLavoratore"
import { inizializzaModificaEsperienzeLavoratore } from "./inizializzaModificaEsperienzeLavoratore";
import { rimuoviEsperienzeLavoratore } from "./rimuoviEsperienzeLavoratore";
import { updateFlagsCandidatura } from './updateFlagsCandidatura';
import { inserisciDatiOperatore } from './inserisciDatiOperatore';
import { inserisciModificaFototessera } from './inserisciModificaFototessera';

export default {
  Mutation: {
    aggiornaStepsLavoratoreTCB,
    inizializzaUtenteLav,
    inizializzaUtenteLavImpersonificazione,
    inserisciDati003,
    inserisciItalianoIstruzioneFormazione,
    inserisciDati005,
    deleteLingueEstere003,
    inserisciLingueEstere003,
    inserisciDati0016,
    inserisciModificaDati002,
    deleteCandidacy,
    sendCandidacyRequest,
    inserisciModificaAttributoOffertaServizio,
    inserisciModificaDisponibilitaCandidaturaLavoratore,
    inizializzaModificaEsperienzeLavoratore,
    rimuoviEsperienzeLavoratore,
    updateFlagsCandidatura,
    inserisciDatiOperatore,
    inserisciModificaFototessera,
  }
}