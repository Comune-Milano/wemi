# WeMi

## Requisiti 

- NodeJS 		(https://nodejs.org/en/) versione 12.22.12
- Redis 		(https://redis.io/)
- postgreSQL 	(https://www.postgresql.org/) 

## Installazione
- Eseguire `npm ci` nella cartella `WeMi2BackEnd`
- Eseguire `npm ci` nella cartella `WeMi2FrontEnd`
- Installazione del DB
  - eseguire pgadmin
  - creare un DB con il nome “WE_ITA”
  - <aprire queryTool> e cliccare sul bottone <Open File> ed aprire il file …\*cartellainstallazionewemi*\WeMi2BackEnd\*nome file db*
  - cliccare sul bottone <Execute>

## Modifica del file .env Backend

- Inserire il valore della variabile <WEMI2_DB_PWD> con la password del db postgres definito in fase di installazione 


## Esecuzione Development Server 

- Eseguire l'applicazione <redis-server>
- Eseguire `npm start` per il dev server di Backend (nella cartella WeMi2BackEnd)
- Eseguire `npm start` per il dev server di Frontend (nella cartella WeMi2FrontEnd)

Frontend in ascolto sulla porta 3000 e Backend in ascolto su porta 8000

## Utenze precaricate sul DB

- Amministratore WeMi: adminWeMi
- Amministratore Ente di prova: sistinf@entesistinf.it
- Cittadino di prova: Cittadino
- Lavoratore di prova: Lavoratore1
- Lavoratore di prova in fase di candidatura: Lavoratore2 


Per accedere con una utenza cliccare sull'icona "omino" in alto a destra ed inserire il nome utenza come riportato con lettere maiuscole e minuscole, 
digitare un carattere sul campo password e cliccare sul bottone <ACCEDI>. Il controllo sulla password è stato disabilitato.

Per entrare nell'area personale da utente autenticato cliccare sull'icona "omino" e successivamente cliccare sul bottone <ENTRA>

