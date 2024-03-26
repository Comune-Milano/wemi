import Inserimento from './sql/Inserimento';
import SelezionaUtente from './sql/Seleziona';
import { isNullOrUndefined } from 'util';
import UpdateUtente from './sql/Update';

class UtenteDAO{
    
    constructor(context){
        this.connection = context.db;
        this.tabella = context.tabelle.utente;
        this.logger = context.logger;
    }

    async InserisciUtente(args){
        const risultato = await this.trovaUtenteDaEmail(args.email);
        if(isNullOrUndefined(risultato)){
            this.logger.info(args, Inserimento);
            try {
               const utente =  await this.connection.oneOrNone(Inserimento, {
                    ptxEmail: args.email,
                    cdProfiloUtente: 'A', 
                    ptxCodiceFiscale: args.description.replace('CF ',''),
                    ptxUsername: args.username, 
                    tyOperatoreEnte: 0,  
                    txNomeUtente: args.fullname.split(' ')[0],
                    txCognomeUtente: args.fullname.split(' ')[1]
                });
                return utente;
            }
            catch(error) {
                this.logger.error(error, 'Errore: inserimento utente fallito');
                throw new Error(error);
            }
          
        }
        else {
            const risultatoUpdate = await this.updateUltimoAccesso(risultato.id_utente);
            if (risultatoUpdate) {
                return risultatoUpdate;
            }
            return null;
        }
        
    }

    async updateUltimoAccesso(idUtente){
        let risultato;
        try{ 
            risultato = await this.connection.oneOrNone(UpdateUtente,{idUtente, tabella: this.tabella});
        }
        catch(error){
            this.logger.error(error, 'Error while updating last user access');
            throw new Error(error);
        }
        return risultato;
    }

    async trovaUtenteDaEmail(emailUtente){
        let risultato;
        try { 
            risultato = await this.connection.oneOrNone(SelezionaUtente,{email: emailUtente, tabella: this.tabella});
        }
        catch(error){
            this.logger.error(error, 'Error in selecting user by email');
            throw new Error(error);
        }
        return risultato;
    }
}

export default UtenteDAO;