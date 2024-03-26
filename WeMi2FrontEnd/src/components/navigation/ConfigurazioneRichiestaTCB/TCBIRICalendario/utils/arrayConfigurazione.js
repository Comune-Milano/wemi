
import { calcolaCalendario, attributi } from '.';

const arrayConfigurazione = (configDisponibilita, FasciaOrariaSettimanale, locale) =>{
    const arrayConfig = [
        {
          //CD_ORARIO_LAVORO 
          cd_attributo: attributi.CD_ORARIO_LAVORO.cd_attributo,
          valori:[{
            cd_val_attributo:configDisponibilita.tipologiaOrario? 
            configDisponibilita.tipologiaOrario.id: undefined,
            tx_val: configDisponibilita.tipologiaOrario ? configDisponibilita.tipologiaOrario.value : undefined}]
          
        },

       {
        //FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO
        cd_attributo: attributi.FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO.cd_attributo,
        valori: typeof configDisponibilita.disponibilitaVacanzaBambino === 'boolean' ?
          [{
            cd_val_attributo: 1,
            fg_val: configDisponibilita.disponibilitaVacanzaBambino ? '1' : '0',
            tx_nota: configDisponibilita.notaDisponibilitaVacanzaBambino ? configDisponibilita.notaDisponibilitaVacanzaBambino : undefined
          }] :
          undefined
      },

        {
          //LS_SPAZI_CONVIVENTE DOMINIO
          cd_attributo: attributi.LS_SPAZI_CONVIVENTE.cd_attributo,
          valori:configDisponibilita.spaziPrevisti? configDisponibilita.spaziPrevisti.length>0?configDisponibilita.spaziPrevisti.map(elemento =>({
            cd_val_attributo: elemento.id,
            tx_val: elemento.value
          })):[] : undefined
        },
         {
            //LS_MEZZA_GIORNATA_CONVIVENTE DOMINIO
            cd_attributo: attributi.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo,
            valori:configDisponibilita.giorniSettimana? configDisponibilita.giorniSettimana.length>0?configDisponibilita.giorniSettimana.map(elemento =>({
              cd_val_attributo: elemento.id,
              tx_val: elemento.value
            })):[] : undefined
          },
          {
            //DT_DATA_CONTRATTO_DA (CODICE....)
            cd_attributo: attributi.DT_DATA_CONTRATTO_DA.cd_attributo,
            valori:configDisponibilita.from?
            configDisponibilita.from!==-1?
            [{cd_val_attributo:1,
            dt_val: configDisponibilita.from.toJSON().split('T')[0] 
            }] :[{cd_val_attributo:-1}]: undefined
          },
          {
            //DT_DATA_CONTRATTO_A
            cd_attributo: attributi.DT_DATA_CONTRATTO_A.cd_attributo,
            valori:configDisponibilita.to?
            configDisponibilita.to!==-1?
            [{cd_val_attributo:2,
            dt_val: configDisponibilita.to.toJSON().split('T')[0] 
            }] :[{cd_val_attributo:-1}]: undefined
          },
        {
          //NR_ORE_RICHIESTE 
          cd_attributo: attributi.NR_ORE_RICHIESTE.cd_attributo,
          valori:configDisponibilita.nrOreRichieste?[{cd_val_attributo: 1,
          nr_val: configDisponibilita.nrOreRichieste
          }] :undefined
        },
          {
            //CD_STIPENDIO_CONVIVENTE DOMINIO
            cd_attributo: attributi.CD_STIPENDIO_CONVIVENTE.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===1&&configDisponibilita.stipendio?
                configDisponibilita.stipendio.id!==-1?[{
                  cd_val_attributo: configDisponibilita.stipendio.id,
                  tx_val: configDisponibilita.stipendio.value
                }] : [{cd_val_attributo:-1}] : undefined
        },
          {
            //CD_STIPENDIO_A_CONVIVENZA_RIDOTTA DOMINIO
            cd_attributo: attributi.CD_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===2&&configDisponibilita.stipendio?
            configDisponibilita.stipendio.id!==-1?[{
              cd_val_attributo: configDisponibilita.stipendio.id,
              tx_val: configDisponibilita.stipendio.value
            }] : [{cd_val_attributo:-1}] : undefined
          },
           {
            //CD_STIPENDIO_NON_CONVIVENTE DOMINIO
            cd_attributo: attributi.CD_STIPENDIO_NON_CONVIVENTE.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&& (configDisponibilita.tipologiaOrario.id===3||configDisponibilita.tipologiaOrario.id===4)&&configDisponibilita.stipendio?
            configDisponibilita.stipendio.id!==-1?[{
              cd_val_attributo: configDisponibilita.stipendio.id,
              tx_val: configDisponibilita.stipendio.value
            }] : [{cd_val_attributo:-1}] : undefined
          },
          {
            //CD_STIPENDIO_WEEKEND DOMINIO 
            cd_attributo: attributi.CD_STIPENDIO_WEEKEND.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===5&&configDisponibilita.stipendio?
            configDisponibilita.stipendio.id!==-1?[{
              cd_val_attributo: configDisponibilita.stipendio.id,
              tx_val: configDisponibilita.stipendio.value
            }] : [{cd_val_attributo:-1}]  : undefined
          },
          {
            //CD_STIPENDIO_ASSISTENZA_NOTTURNA DOMINIO 
            cd_attributo: attributi.CD_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===6&&configDisponibilita.stipendio?
            configDisponibilita.stipendio.id!==-1?[{
              cd_val_attributo: configDisponibilita.stipendio.id,
              tx_val: configDisponibilita.stipendio.value
            }] : [{cd_val_attributo:-1}] : undefined
          },
               {
            //CD_STIPENDIO_PRESENZA_NOTTURNA DOMINIO
            cd_attributo: attributi.CD_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===4&&configDisponibilita.stipendio?
            configDisponibilita.stipendio.id!==-1?[{
              cd_val_attributo: configDisponibilita.stipendio.id,
              tx_val: configDisponibilita.stipendio.value
            }] : [{cd_val_attributo:-1}] : undefined
          },
          {
            // CD_TIPOLOGIA_CONTRATTO DOMINIO 
            cd_attributo: attributi.CD_TIPOLOGIA_CONTRATTO.cd_attributo,
            valori:configDisponibilita.tipoContratto?
            configDisponibilita.tipoContratto.id!==-1?[{
              cd_val_attributo: configDisponibilita.tipoContratto.id,
              tx_val: configDisponibilita.tipoContratto.value
            }] : [{cd_val_attributo:-1}] : undefined
            
          },
          {
            //FG_DISP_TRASFERTE_BREVI
            cd_attributo: attributi.FG_DISP_TRASFERTE_BREVI.cd_attributo,
            valori: typeof configDisponibilita.trasferteBrevi === 'boolean' ?
              [{
                cd_val_attributo: 1,
                fg_val: configDisponibilita.trasferteBrevi ? '1' : '0',
                tx_nota: configDisponibilita.notaTrasferteBrevi ? configDisponibilita.notaTrasferteBrevi: undefined
              }] :
              undefined
          },
          {
            //FG_DISP_TRASFERTE_LUNGHE
            cd_attributo: attributi.FG_DISP_TRASFERTE_LUNGHE.cd_attributo,
            valori: typeof configDisponibilita.trasferteLunghe === 'boolean' ?
              [{
                cd_val_attributo: 1,
                fg_val: configDisponibilita.trasferteLunghe ? '1' : '0',
                tx_nota: configDisponibilita.notaTrasferteLunghe ? configDisponibilita.notaTrasferteLunghe : undefined
              }] :
              undefined
          },

          {
            //FG_DISPONIBILITA_STRAORDINARI
            cd_attributo: attributi.FG_DISPONIBILITA_STRAORDINARI.cd_attributo,
            valori: typeof configDisponibilita.straordinari === 'boolean' ?
              [{
                cd_val_attributo: 1,
                fg_val: configDisponibilita.straordinari ? '1' : '0',
                tx_nota: configDisponibilita.notaStraordinari ? configDisponibilita.notaStraordinari : undefined
              }] :
              undefined
          },
          {
            //FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA
            cd_attributo: attributi.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA.cd_attributo,
            valori: typeof configDisponibilita.disponibilitaVacanzaFamiglia === 'boolean' ?
              [{
                cd_val_attributo: 1,
                fg_val: configDisponibilita.disponibilitaVacanzaFamiglia ? '1' : '0',
                tx_nota: configDisponibilita.notaDisponibilitaVacanzaFamiglia ? configDisponibilita.notaDisponibilitaVacanzaFamiglia : undefined
              }] :
              undefined
          },
          {
            //CD_FASCIA_ORE_SETTIMANALI DOMINIO
            cd_attributo: attributi.CD_FASCIA_ORE_SETTIMANALI.cd_attributo,
            valori:FasciaOrariaSettimanale?[{
              cd_val_attributo:FasciaOrariaSettimanale.idOrario,
              tx_val: FasciaOrariaSettimanale.txOrario[locale]
            
            }]: undefined
          },
          {
            //CALENDARIO_CONVIVENZA_RIDOTTA 
            cd_attributo: attributi.CALENDARIO_CONVIVENZA_RIDOTTA.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===2&& configDisponibilita.calendario?[{
              cd_val_attributo:1,
              calendario: calcolaCalendario(configDisponibilita.calendario)
             
            }]: undefined
            
          },
       
          {
            //CALENDARIO_NON_CONVIVENTE
            cd_attributo: attributi.CALENDARIO_NON_CONVIVENTE.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===3&& configDisponibilita.calendario?[{
                cd_val_attributo:1,
                calendario: calcolaCalendario(configDisponibilita.calendario)
               
              }]: undefined
          },
       
          {
            //CALENDARIO_PRESENZA_NOTTURNA 
            cd_attributo: attributi.CALENDARIO_PRESENZA_NOTTURNA.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===4&& configDisponibilita.calendario?[{
                cd_val_attributo:1,
                calendario: calcolaCalendario(configDisponibilita.calendario)
               
              }]: undefined
          },
     
          {
            //CALENDARIO_ASSISTENZA_NOTTURNA 
            cd_attributo: attributi.CALENDARIO_ASSISTENZA_NOTTURNA.cd_attributo,
            valori:configDisponibilita.tipologiaOrario&&configDisponibilita.tipologiaOrario.id===6&& configDisponibilita.calendario?[{
                cd_val_attributo:1,
                calendario: calcolaCalendario(configDisponibilita.calendario)
               
              }]: undefined
          },
       
          {
            //TX_NOTE_SU_CONTRATTO 
            cd_attributo: attributi.TX_NOTE_SU_CONTRATTO.cd_attributo,
            valori:configDisponibilita.notaContrattuale?[{
                cd_val_attributo:1,
                tx_nota: configDisponibilita.notaContrattuale
               
            }]: undefined
          },
    
      
        
    ];
    return arrayConfig;
 
}

export default arrayConfigurazione;