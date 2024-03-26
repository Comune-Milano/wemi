/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { Row } from 'components/ui/Grid';
import { List } from 'components/ui2/List';

export const domandeFrequentiCittadino = [
  {
    domanda: 'CHI SONO I NOSTRI ASSISTENTI FAMILIARI?',
    risposta: 'Sono persone che possiedono le competenze necessarie per supportare la famiglia che si trova a vivere una situazione di bisogno. Le si affiancano nella gestione della\ncasa o nella cura di una persona cara, stabilendo una relazione lavorativa di fiducia. Gli operatori WeMi selezionano attentamente l’assistente familiare più adatto alle\ntue esigenze, incontrandolo/a a colloquio e valutando le sue esperienze pregresse, le competenze professionali e gli aspetti caratteriali. ',
  },
  {
    domanda: 'COME VENGONO SELEZIONATI I PROFILI?',
    risposta: 'Dopo l’invio online della candidatura, con la quale i lavoratori auto-certificano le proprie competenze ed esperienze, sono chiamati a sostenere\nun colloquio presso WeMi Tate Colf Badanti. Tutti i lavoratori che vengono presentati alle famiglie sono stati valutati dagli operatori del servizio,\nche ne hanno verificato documenti, referenze, livello di competenze, disponibilità, capacità ed esperienze.',
  },
  {
    domanda: 'POSSO USUFRUIRE DI SOSTEGNI ECONOMICI?',
    risposta: <>
      <Text
        value="Regione Lombardia eroga per il 2022 un Buono Assistenza Familiare (BAF), destinato alle famiglie che, per la cura di un anziano non autosufficiente, si avvalgono di un assistente familiare iscritto ai registri territoriali. Il buono non può superare il cinquanta per cento delle spese previdenziali e ha un tetto massimo di 2.400,00€ per ISEE uguali o inferiori ai 25.000,00€ e di 2.000,00€ per ISEE compresi tra i 25.000,00€ e i 35.000,00€. Per usufruirne è necessario compilare la domanda online sul portale di Regione Lombardia."
      />
      <Row fluid>
        <Text
          value="Per maggiori informazioni,"
        />
        &nbsp;
        <AnchorLink
          _blank
          value="scarica l'informativa"
        />
        <Text
          value="."
        />
      </Row>
      <Row fluid margin="1em 0 0">
        <Text
          value={`Incompatibile con il BAF è la Misura B2. La Misura B2, istituita da Regione Lombardia e finanziata dal Fondo nazionale per la non autosufficienza (FNA) e da fondi regionali) ha l'obiettivo di mantenere le persone con disabilità e le persone anziane non autosufficienti nel loro contesto di vita, offrendo un supporto al caregiver familiare o a personale di assistenza regolarmente assunto. I destinatari sono adulti, anziani e minori, al domicilio, in situazione di gravità così come accertata dall'art. 3 comma 3. della L. 104/1992 o beneficiarie dell'indennità di accompagnamento. 
                  I residenti nel Comune di Milano devono inoltre avere un ISEE ordinario in corso di validità inferiore a 40.000 euro. 
                  Questa misura prevede l’erogazione di voucher e buoni sociali appartenenti a tre tipologie, ciascuna per un importo massimo di 800 euro:
                  Buono sociale mensile finalizzato a remunerare le prestazioni di un assistente familiare regolarmente assunto o di un caregiver;
                  Buono sociale mensile per supportare progetti di vita indipendente di persone con disabilità tra i 18 e i 64 anni (in questo caso l'ISEE in corso di validità deve essere inferiore a 20.000 euro;
                  Voucher sociale mensile per sostenere la vita di relazione di minori con disabilità con appositi progetti di natura educativa/socializzante. 
                  I cittadini interessati possono inoltrare la richiesta presso i Servizi Sociali Territoriali del proprio municipio di residenza. Una equipe integrata con personale del Comune e della ASST effettua una valutazione multidimensionale sui bisogni del cittadino e predispone per il singolo utente il "Progetto Individuale di Assistenza”, che contiene la descrizione degli interventi da sostenere con i buoni previsti. La raccolta delle domande è prevista da febbraio a maggio di ogni anno. In seguito, verrà stilata una graduatoria in base alle risorse disponibili. 
                `}
        />
      </Row>
      <Row fluid margin="1em 0 0" direction="column">
        <Text
          tag="p"
          value="Per saperne di più:"
        />
        <AnchorLink
          _blank
          width="fit-content"
          value="Visita il sito del Comune di Milano"
          to=" "
        />
        <AnchorLink
          _blank
          width="fit-content"
          value="Visita il sito della Regione Lombardia"
          to="https://www.regione.lombardia.it/wps/portal/istituzionale/HP/DettaglioServizio/servizi-e-informazioni/cittadini/persone-casa-famiglia/disabilita/ser-interventi-disabili-gravi-anziani-non-autosufficienti"
        />
      </Row>
              </>,
  },
  {
    domanda: 'POSSO USUFRUIRE DI DETRAZIONI FISCALI?',
    risposta: <>
      <Text
        tag="p"
        value={`Possono usufruirne le persone assistite o i familiari che sostengono la spesa, se il reddito familiare complessivo è inferiore a 40.000 euro. Le agevolazioni fiscali sono le seguenti:
                Detrazione dei contributi versati, per un importo massimo di 1.549,37 euro l'anno (con l’esclusione della quota a carico del lavoratore); 
                Detrazione dall’imposta lorda del 19% delle spese sostenute, per un importo massimo di 2.100 euro all’anno (solo in caso di assunzione di badante).  
             `}
      />
      <Text
        value="Per maggiori informazioni, si consiglia di"
      />
      &nbsp;
      <AnchorLink
        _blank
        value="visitare il sito dell'INPS."
        to="https://www.inps.it/nuovoportaleinps/default.aspx?itemdir=45740"
      />
              </>,
  },
  {
    domanda: 'QUANTO COSTA?',
    risposta: `Il servizio di selezione è gratuito.\nIl costo della prestazione varia a seconda delle ore settimanali lavorate e delle mansioni del lavoratore. Le tariffe partono dai minimi sindacali stabiliti\ndal Contratto Collettivo Nazionale sulla Disciplina del Lavoro Domestico per i contratti diretti tra famiglia e assistente familiare. Nel caso di prestazioni\ndi lavoro occasionale è possibile regolarizzare la posizione del lavoratore attraverso l’apertura di un Libretto Famiglia o chiedendo il servizio alle cooperative\nche gestiscono gli Spazi WeMi. Per avere informazioni, consulenza, accompagnamento e supporto nell’ individuare le migliori soluzioni per sostenere i costi\ndell’assistenza e della cura a partire dalle risorse a tua disposizione e da eventuali forme di sostegno a cui puoi accedere, è possibile prenotare un colloquio\ngratuito con i nostri consulenti di educazione finanziaria di qualità.    
    `,
  },
  {
    domanda: 'COME ASSUMERE?',
    risposta: <>
      <Text
        value="L’assunzione può avvenire secondo tre diverse modalità:"
      />
      <div style={{ margin: '1em 0 0' }}>
        <Text
          weight="bold"
          value="Assunzione diretta"
        />
        <Text
          value=": il datore di lavoro e il lavoratore sottoscrivono un contratto di lavoro, che comporta diritti e doveri per entrambi, elencati nella lettera di assunzione. Il rapporto di lavoro per essere effettivo deve essere comunicato all’INPS tramite contact center o procedura telematica disponibile sul sito dell’INPS."
        />
      </div>
      <div>
        <Text
          weight="bold"
          value="Assunzione tramite libretto di famiglia"
        />
        <Text
          value=": questa modalità è utilizzata per regolarizzare un assistente familiare che svolge prestazioni di lavoro occasionale, per un massimo di 280 ore annue. Esso è composto da titoli di pagamento del valore di 10 euro all'ora per un importo che non deve superare i 5.000 euro all'anno. Per accedervi è necessario che sia il datore di lavoro sia il lavoratore siano registrati sul portale dell'INPS."
        />
      </div>
              </>,
  },
  {
    domanda: 'Cos’è la certificazione di qualità UNI 11766:2019 per l’assistente familiare?',
    risposta: <>
      <Text
        value="È una sorta di patentino di qualità, regolato secondo la norma UNI 11766:2019, in vigore dal 12 dicembre 2019. Per ottenerlo occorre che l’assistente familiare possieda tre prerequisiti:"
      />
      <List>
        <Text
          value="Essere stata impiegata regolarmente presso un datore di lavoro domestico per almeno dodici mesi, anche non continuativi, durante i tre anni precedenti;"
          tag="div"
        />
        <Text
          value="Possedere una conoscenza basilare della lingua italiana;"
          tag="div"
        />
        <Text
          value="Aver frequentato un corso di formazione (almeno 40 ore per le colf e 64 ore per baby-sitter e badanti)."
          tag="div"
        />
      </List>
      <div style={{ margin: '1em 0 0 0' }}>
        <Text
          value="Per conseguire la certificazione, occorre inoltre che le assistenti familiari posseggano una serie di competenze, che variano a seconda dei profili. Alle badanti e alle babysitter viene richiesto, ad esempio, di saper praticare le manovre di primo soccorso. Le sole badanti, invece, devono essere in grado di provvedere all’igiene della persona che assistono. Tutte e tre le figure, infine, sono tenute a sottoscrivere e rispettare il codice di comportamento. "
        />
      </div>
      <div style={{ margin: '1em 0 0 0' }}>
        <Text

          value="La certificazione non è obbligatoria per poter svolgere la professione, ma rappresenta sicuramente una fonte di garanzia per permettere alle famiglie di affidare a terzi i propri cari in maggiore sicurezza. "
        />
      </div>
      <div style={{ margin: '1em 0 0 0' }}>
        <Text

          value="Decorsi 12 mesi dalla data di decorrenza del CCNL sottoscritto a settembre 2020, ai lavoratori inquadrati nei livelli B, Bs, Cs e Ds in possesso di tale certificazione in corso di validità, verrà riconosciuta una indennità mensile, assorbibile da eventuali superminimi individuali di miglior favore percepiti dal lavoratore. Per i lavoratori conviventi con profilo D super) tale indennità sarà assorbita da quella di funzione."
        />
      </div>
              </>,
  },
];
