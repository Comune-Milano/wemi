/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { Row } from 'components/ui/Grid';
import { List } from 'components/ui2/List';

const fileRegistroTerritoriale = {
  download: 'https://www.inps.it/nuovoportaleinps/default.aspx?itemdir=51098',
  downloadName: 'wemi_registri_terrioriali',
};

export const domandeFrequentiLavoratore = [
  {
    domanda: 'CHI PUÒ CANDIDARSI?',
    risposta: <>
      <Text
        tag="span"
        value="I requisiti necessari per candidarsi come assistente familiare di WeMi Tate Colf Badanti sono:"
      />
      <List>
        <Text
          value="Essere maggiorenni"
          tag="div"
        />
        <Text
          value="Per gli stranieri extracomunitari: essere titolari di permesso di soggiorno valido per il lavoro"
          tag="div"
        />
      </List>
    </>,
  },
  {
    domanda: 'POSSO PARTECIPARE A CORSI DI FORMAZIONE?',
    risposta: 'WeMi Tate Colf Badanti può orientare il lavoratore ai corsi di formazione più idonei a migliorare le sue competenze. I corsi in genere hanno una durata\nche varia dalle 40 alle 160 ore, al termine delle quali viene rilasciato un attestato; questi corsi sono offerti da enti accreditati per la formazione e il lavoro.\nI lavoratori assunti da un datore di lavoro per almeno sei mesi a tempo pieno e indeterminato possono godere di quaranta ore annue per partecipare a tali corsi.\nPer la frequenza di corsi riconosciuti da Ebincolf, il monte ore annuo dei permessi retribuiti ammonta a 64 ore.  Presso il servizio Wemi Tate Colf Badanti\nè inoltre possibile ricevere informazioni anche su corsi di lingua, di informatica e altri percorsi specifici.',
  },
  {
    domanda: 'COME FUNZIONA IL CONTRATTO DI LAVORO DOMESTICO?',
    risposta: <>
      <Row fluid>
        <Text
          value="Attraverso l'assunzione,"
        />
        &nbsp;
        <Text
          value="il datore di lavoro (la famiglia)"
        />
        &nbsp;
        <Text
          value="e il lavoratore"
        />
        &nbsp;
        <Text
          value="(l’assistente familiare)"
        />
        &nbsp;
        <Text
          value="sottoscrivono un regolare"
        />
        &nbsp;
        <Text
          value="contratto di lavoro,"
        />
        &nbsp;
        <Text
          value="che comporta diritti e"
        />
        &nbsp;
        <Text
          value="doveri per entrambi,"
        />
        &nbsp;
        <Text
          value="elencati nella"
        />
        &nbsp;
        <Text
          value="lettera di assunzione."
        />
        &nbsp;
        <Text
          value="Inoltre, il"
        />
        &nbsp;
        <Text
          value="rapporto di lavoro"
        />
        &nbsp;
        <Text
          value="per essere"
        />
        &nbsp;
        <Text
          value="effettivo deve essere"
        />
        &nbsp;
        <Text
          value="comunicato all'INPS."
        />
        &nbsp;
        <Text
          value="Il contratto"
        />
        &nbsp;
        <Text
          value="collettivo"
        />
        &nbsp;
        <Text
          value="nazionale"
        />
        &nbsp;
        <Text
          value="di riferimento"
        />
        &nbsp;
        <Text
          value="è il CCNL sulla"
        />
        &nbsp;
        <Text
          value="Disciplina del"
        />
        &nbsp;
        <AnchorLink
          value="Lavoro Domestico"
          downloadName="Disciplina_rapporto_lavoro_domestico"
          _blank
          width="auto"
        />
        <Text
          value="."
        />
      </Row>
      <Row fluid>
        <Text
          value="In caso di prestazioni di lavoro occasionale, è possibile essere pagati tramite il"
          padding="0.3em 0 0"
        />
        &nbsp;
        <AnchorLink
          value="Libretto Famiglia dell'INPS."
          download={fileRegistroTerritoriale.download}
          downloadName={fileRegistroTerritoriale.downloadName}
          _blank
          alignitems="flex-end"
        />
      </Row>
    </>,
  },
  {
    domanda: 'CHI SONO LE FAMIGLIE CHE SCELGONO WeMi?',
    risposta: 'Sono famiglie alla ricerca di un professionista di fiducia che li supporti nella cura di un proprio caro o nella gestione della casa. Gli operatori WeMi raccolgono\nle loro richieste e mettono in contatto le famiglie con i lavoratori iscritti al servizio.',
  },
  {
    domanda: 'DEVO PAGARE ANCH’IO I CONTRIBUTI INPS?',
    risposta: 'Il datore di lavoro è tenuto a versare trimestralmente a INPS i contributi per il lavoratore assunto. La normativa prevede che una quota dei contributi dovuti\nsia a carico del lavoratore. Il datore di lavoro può quindi trattenere dalla retribuzione mensile del lavoratore la quota spettante al lavoratore. ',
  },
  {
    domanda: 'DEVO PRESENTARE LA DICHIARAZIONE DEI REDDITI?',
    risposta: 'L’assistente familiare, così come qualunque altro lavoratore che presta servizio e vive in Italia, è tenuto a presentare la dichiarazione dei redditi se il suo reddito per l’anno precedente,\nsulla base della retribuzione pagata dal datore di lavoro e attestata per mezzo del modello CU, risulta essere superiore a 8.000 euro.\nI collaboratori domestici, essendo lavoratori senza sostituto di imposta, ossia senza il soggetto che li sostituisce nelle trattenute e versamento imposte,\ndevono presentare la dichiarazione dei redditi mediante Modello Unico.\nNel caso in cui il reddito sia inferiore agli 8000 euro, la dichiarazione dei redditi non è obbligatoria, ma può comunque essere presentata per ottenere\nle detrazioni di imposta per spese sanitarie, affitto, prima casa anche per altri componenti della famiglia fiscalmente a carico.',
  },
  {
    domanda: 'Cos’è la certificazione di qualità UNI 11766:2019?',
    risposta: <>
      <Text
        value="È una sorta di patentino di qualità, regolato secondo la norma UNI 11766:2019, in vigore dal 12 dicembre 2019. Per ottenerlo occorre possedere tre prerequisiti:"
      />
      <List>
        <Text
          value="Essere stati impiegati regolarmente presso un datore di lavoro domestico  per almeno dodici mesi, anche non continuativi, durante i tre anni precedenti;"
          tag="div"
        />
        <Text
          value="Possedere una conoscenza basilare della lingua italiana;"
          tag="div"
        />
        <Text
          value="Aver frequentato un corso di formazione (almeno 40 ore per le colf e 64 ore per baby-sitter e badanti). "
          tag="div"
        />
      </List>
      <div style={{ margin: '1em 0 0 0' }}>
        <Text
          value="È possibile richiedere la certificazione presso organismi accreditati, erogatori dei corsi di formazione. L’esame per l’attestazione delle competenze è costituito da una parte orale ed una scritta. Le competenze variano a seconda dei diversi profili professionali: alle badanti e alle babysitter viene richiesto, ad esempio, di saper praticare le manovre di primo soccorso. Le sole badanti, invece, devono essere in grado di provvedere all’igiene dell’assistito. Tutte e tre le figure, infine, sono tenute a sottoscrivere e rispettare il codice di comportamento. "
        />
      </div>
      <div style={{ margin: '1em 0 0 0' }}>
        <Text
          value="Ai lavoratori inquadrati nei livelli B, Bs, Cs e Ds in possesso di tale certificazione in corso di validità, verrà riconosciuta una indennità mensile, assorbibile da eventuali superminimi individuali di miglior favore percepiti dal lavoratore. Per i lavoratori conviventi con profilo D super) tale indennità sarà assorbita da quella di funzione."
        />
      </div>
      <div>
        <Text
          value="Tale indennità sarà dovuta decorsi 12 mesi dalla data di decorrenza del contratto sottoscritto a settembre 2020."
        />
      </div>
      <div style={{ padding: '1em 0 0 0', width: '100%' }}>
        <Text
          value="La certificazione non è obbligatoria per poter svolgere la professione."
        />
      </div>
    </>,
  },
];
