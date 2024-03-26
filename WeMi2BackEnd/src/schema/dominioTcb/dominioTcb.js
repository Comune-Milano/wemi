/** @format */

import { gql } from 'apollo-server-express';

export default gql`

type DominioTcb {
ty_dominio_tcb: Float
cd_dominio_tcb: Float
cd_naturale_dominio: String
tl_valore_testuale: JSON
nr_valore_min_rif: Int
nr_valore_max_rif: Int
pg_visualizzazione: Int
}


type DominioTCB{
    tyDominioTcb: Float
    cdDominioTcb: Float
    pgVisualizzazione: Int
    tlValoreTestuale: JSON
    maxRif: Int
    minRif: Int
}

type tipoOrarioLavoro {
      cd_dominio_tcb: Float!
      tl_valore_testuale: String
      pg_visualizzazione: Int
}

type tipoServizioTcb {
    cd_dominio_tcb: Float!
    tl_valore_testuale: String
    pg_visualizzazione: Int
}

type OrarioSettimanale{
    idOrario: Int!
    txOrario: JSON
}

type TipologiaOrarioTCB {
    cd_dominio_tcb: Int
    tl_valore_testuale: JSON
}

type ModalitaAssunzioneTCB {
    cd_dominio_tcb: Int
    tl_valore_testuale: JSON
}


extend type Query {
dominioTcbAll: [DominioTcb] #Libera
dominioTcbByTipoTcb(ty_dominio_tcb: Float!): [SelectUI] #Libera
EstraiNumeroBagni: [DominioTCB] #Libera
EstraiStatoNascita: [DominioTCB] #Libera
EstraiRelazioniConBeneficiario: [DominioTCB] #Libera
EstraiSessoBeneficiario: [DominioTCB] #Libera
EstraiFasciaEta: [DominioTCB] #Libera
EstraiSuperficieCasa: [DominioTCB] #Libera
EstraiNumeroStanze: [DominioTCB] #Libera
EstraiLingueParlate: [DominioTCB] #Libera
EstraiAltezza: [DominioTCB] #Libera
EstraiCorporatura: [DominioTCB] #Libera
EstraiPatologie: [DominioTCB] #Libera
EstraiEtaLavoratore: [DominioTCB] #Libera
EstraiPatologieBambino: [DominioTCB] #Libera
EstraiLivelloDeambulazione: [DominioTCB] #Libera
EstraiCarattereLavoratore:[DominioTCB] #Libera
EstraiTitoloStudioLavoratore: [DominioTCB] #Libera
EstraiCorsiTata: [DominioTCB] #Libera
EstraiCorsiBadante: [DominioTCB] #Libera
EstraiInteressi: [DominioTCB] #Libera 
EstraiCaratteristicheAbitazione: [DominioTCB] #Libera
EstraiEsperienzePregresse: [DominioTCB] #Libera
EstraiFasciaEtaCandidatura: [DominioTCB] #Libera
EstraiLinguaItaliana: [DominioTCB] #Libera
tipoOrarioLavoroAll: [DominioTcb] #Libera
tipoServizioTcbAll: [DominioTcb] #Libera
EstraiPatologieGeneriche: [DominioTCB] #Libera
EstraiFasceStipendioConvivente: [DominioTcb] #Libera
EstraiFasceStipendioNonConvivente: [DominioTcb] #Libera
EstraiFasceStipendioConvivenzaRidotta: [DominioTcb] #Libera
EstraiFasceStipendioPresenzaNotturna: [DominioTcb] #Libera
EstraiFasceStipendioAssistenzaNotturna: [DominioTcb] #Libera
EstraiFasceStipendioWeekend: [DominioTcb] #Libera
EstraiGiorniSettimana: [DominioTcb] #Libera
EstraiSistemazione:[DominioTcb] #Libera
EstraiTipologiaContratto:[DominioTcb] #Libera
EstraiSpaziPrevisti: [DominioTcb] #Libera
EstraiMaxOre:[DominioTcb] #Libera
EstraiFasciaOrariaSettimanale(nrOreRichieste: Int!):OrarioSettimanale #Libera
EstraiStatoOccupazionale: [DominioTCB] #Libera
TipologiaOrarioByServizioTCB(idServizio: Int!):[TipologiaOrarioTCB] #Libera
ModalitaAssunzioneByServizioTCB(idServizio: Int!):[ModalitaAssunzioneTCB] #Libera
}
`;
