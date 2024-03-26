*******************************
* INSTALLAZIONE SOFTWARE WeMi *
*******************************

===> 1) Cosa serve <===

> GIT BASH 		(https://git-scm.com/)
> NodeJS 		(https://nodejs.org/en/)
> Redis 		(https://redis.io/)
> postgreSQL 	(https://www.postgresql.org/)
> pgadmin 		(https://www.pgadmin.org/)

Installare tutti i pacchetti indicati. 


===> 2) download del software dal GIT <===

2.a) definire una cartella dove si vuole installare WeMi (es WorkspaceWeMi)
2.b) eseguire la shell GitBash e posizionarsi sotto alla cartella di installazione di WeMi

2.c) installazione da GIT con i seguenti comandi:

2.c.a) git clone git@us-south.git.cloud.ibm.com:francesco.murador/wemi.git (****** da definire *******)
2.c.b) dalla shell GitBash aprire la cartella WeMi2BackEnd 
2.c.c) eseguire il comando: npm ci
2.c.d) dalla shell GitBash aprire la cartella WeMi2FrontEnd 
2.c.e) eseguire il comando: npm ci

NB. 
Le porte abilitate sono la 8000 e al 3000. Se si volesse modificare le porte aprire i file .env di backend e frontend.


===> 2) installazione del DB <===

3.b) eseguire pgadmin
3.d) creare un DB con il nome “WE_ITA” 
3.c) <aprire queryTool> e cliccare sul bottone <Open File> ed aprire il file …\*cartellainstallazionewemi*\WeMi2BackEnd\*nome file db*
3.d) cliccare sul bottone <Execute>


===> 4) Modifica del file .env <===

4.a) posizionarsi sotto alla cartella …\*cartellainstallazionewemi*\WeMi2BackEnd\ 

4.b) aprire con un editor di testo il file .env

4.c) inserire il valore della variabile <WEMI2_DB_PWD> con la password del db postgres definito al punto 3 e salvare


===> 5) Esecuzione WeMi <===

5.a) Eseguire l'applicazione <redis-server>

5.b) tramite la shell git bash dalla cartella C:/***********/WeMi2BackEnd eseguire il comando npm start
5.c) aspettare che venga visualizzato questo messaggio "Apollo Server on http://localhost:8000/graphql" senza errori
5.d) apriere una nuova shell git bash e posizionarsi sotto alla cartella C:/***********/WeMi2FrontEnd 
5.e) eseguire il comando npm start

L'istruazione apre sul browser predefinito la Home Page di WeMi <http://localhost:3000/>



*****************************
* Utenze precaricate sul DB *
*****************************

=> Amministratore WeMi: adminWeMi
=> Amministratore Ente di prova: sistinf@entesistinf.it
=> Cittadino di prova: Cittadino
=> Lavoratore di prova: Lavoratore1
=> Lavoratore di prova in fase di candidatura: Lavoratore2 


Per accedere con una utenza cliccare sull'icona "omino" in alto a destra ed inserire il nome utenza come riportato con lettere maiuscole e minuscole, 
digitare un carattere sul campo password e cliccare sul bottone <ACCEDI>. Il controllo sulla password è stato disabilitato.

Per entrare nell'area personale da utente autenticato cliccare sull'icona "omino" e successivamente cliccare sul bottone <ENTRA>

