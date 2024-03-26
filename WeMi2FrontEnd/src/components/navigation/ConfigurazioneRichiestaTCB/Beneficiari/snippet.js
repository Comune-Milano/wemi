
  const arrayConfig = (pgBen) => {
    return ([
      {
        cd_attributo: 89,
        cd_val_attributo: secondoStepper === 1 && config002[pgBen] && config002[pgBen].nome ? 1 : undefined,
        tx_val: config002[pgBen] && config002[pgBen].nome ? config002[pgBen].nome : undefined
      },
      {
        cd_attributo: 80,
        cd_val_attributo: secondoStepper === 1 && config002[pgBen] && config002[pgBen].cognome ? 1 : undefined,
        tx_val: config002[pgBen] && config002[pgBen].cognome ? config002[pgBen] && config002[pgBen].cognome : undefined
      },
      {
        cd_attributo: 15,
        cd_val_attributo: secondoStepper === 1 && config002[pgBen] && config002[pgBen].parentelaBen ? config002[pgBen].parentelaBen.id : undefined,
        tx_val: secondoStepper === 1 && config002[pgBen] && config002[pgBen].altroRelazione && config002[pgBen].parentelaBen
          && config002[pgBen].parentelaBen.id === 0 ?
          config002[pgBen].altroRelazione : undefined,
      },
      {
        cd_attributo: 19,
        cd_val_attributo: secondoStepper === 1 && config002[pgBen] && config002[pgBen].sesso ? config002[pgBen].sesso.id : undefined,
      },
      {
        cd_attributo: 78,
        cd_val_attributo: secondoStepper === 2 && config002[config002.pgBen] && config002[pgBen].infoPatologie ? 1 : undefined,
        tx_val: config002[pgBen] && config002[pgBen].infoPatologie ? config002[pgBen].infoPatologie : undefined
      },
      {
        cd_attributo: 34,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 1 &&
          secondoStepper === 3 && config002[pgBen] && config002[pgBen].parlaItaliano ? 1 : undefined,
        fg_val: config002[pgBen] && config002[pgBen].parlaItaliano ? `${config002[pgBen].parlaItaliano}` : undefined
      },
      {
        cd_attributo: 47,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 3 &&
          secondoStepper === 3 && config002[pgBen] && config002[pgBen].altriParentiFlag ? 1 : undefined,
        fg_val: config002[pgBen] && config002[pgBen].altriParentiFlag ? `${config002[pgBen].altriParentiFlag.id}` : undefined
      },
      {
        cd_attributo: 46,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 1 &&
          secondoStepper === 3 && config002[pgBen] && config002[pgBen].presenzaFratelli ? 1 : undefined,
        fg_val: config002[pgBen] && config002[pgBen].presenzaFratelli ? `${config002[pgBen].presenzaFratelli}` : undefined
      },
      {
        cd_attributo: 51,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 1 &&
          secondoStepper === 3 && config002[pgBen] && config002[pgBen].presenzaNonni ? 1 : undefined,
        fg_val: config002[pgBen] && config002[pgBen].presenzaNonni ? `${config002[pgBen].presenzaNonni}` : undefined
      },
      {
        cd_attributo: 77,
        cd_val_attributo: secondoStepper === 3 && config002[pgBen] && config002[pgBen].altreInfo ? 1 : undefined,
        tx_val: config002[pgBen] && config002[pgBen].altreInfo ? config002[pgBen].altreInfo : undefined
      },
      {
        cd_attributo: 8,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 1 &&
          secondoStepper === 1 && config002[pgBen] && config002[pgBen].fasciaEta ? config002[pgBen].fasciaEta.id : undefined,
      },
      {
        cd_attributo: 7,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 3 &&
          secondoStepper === 2 && config002[pgBen] && config002[pgBen].deambulazione ? config002[pgBen].deambulazione.id : undefined,
        tx_val: config002[pgBen] && config002[pgBen].altroDeambulazione ? config002[pgBen].altroDeambulazione : undefined
      },
      {
        cd_attributo: 5,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 3 &&
          secondoStepper === 3 && config002[pgBen] && config002[pgBen].altezza ? config002[pgBen].altezza.id : undefined,
      },
      {
        cd_attributo: 6,
        cd_val_attributo: servizioTCB.cd_dominio_tcb === 3 &&
          secondoStepper === 3 && config002[pgBen] && config002[pgBen].corporatura ? config002[pgBen].corporatura.id : undefined,
      },
      {
        cd_attributo: 85,
        cd_val_attributo: secondoStepper === 3 && config002[pgBen] && config002[pgBen].giornataTipo ? 1 : undefined,
        tx_val: config002[pgBen] && config002[pgBen].giornataTipo ? config002[pgBen].giornataTipo : undefined
      },

    ]
    )
  };

  const InserimentoDati = async (stepToNavigate) => {
    let array = [];
    if (config002.softChanges && config002.softChanges.length > 0 && !secondoStepper.active) {
      config002.softChanges.forEach(el => {
        return array.push(arrayConfig(el))
      });
      if (idRichiestaTcb !== 0) {
        array.forEach(async (arrConf, index) => {
          await graphqlRequest(inserisciBeneficiarioTCBM({ idRichiestaTcb: idRichiestaTcb, pgBen: config002.softChanges[index] }))
          await graphqlRequest(inserisciModificaDatiRichiesta002M({
            idRichiestaTcb: idRichiestaTcb,
            arrayConfig: arrConf.filter(el => {
              return !isNullOrUndefined(el.cd_val_attributo)
            }),
            pgBen: config002.softChanges[index],
          }))
          graphqlRequest(estraiDatiConfigurazioneRichiesta002Q({ idRichiestaTcb: idRichiestaTcb, idServizio: servizioTCB.cd_dominio_tcb }));
        })
      }
    }
    else {
      array = arrayConfig(config002.pgBen);
      if (secondoStepper === 2 && servizioTCB.cd_dominio_tcb === 1 &&
        config002[(config002.pgBen)] && config002[(config002.pgBen)].patologieBambino &&
        config002[(config002.pgBen)].patologieBambino.length > 0) {
        let patologieBambinoArray = [...config002[(config002.pgBen)].patologieBambino]
        patologieBambinoArray.map(el => {
          array.push({
            cd_attributo: 66,
            cd_val_attributo: el.id,
            tx_val: el.id === 0 ? config002[(config002.pgBen)].altroPatologie : undefined
          })
        })
      }

      if (secondoStepper === 3 && servizioTCB.cd_dominio_tcb === 1 &&
        config002[(config002.pgBen)] && config002[(config002.pgBen)].lingue && config002[(config002.pgBen)].lingue.length > 0) {
        let altreLingueBambinoArray = [...config002[(config002.pgBen)].lingue]
        altreLingueBambinoArray.map(el => {
          array.push({
            cd_attributo: 58,
            cd_val_attributo: el.id,
          })
        })
      }

      if (secondoStepper === 2 && servizioTCB.cd_dominio_tcb === 3 &&
        config002[(config002.pgBen)] && config002[(config002.pgBen)].patologieAnziano &&
        config002[(config002.pgBen)].patologieAnziano.length > 0) {
        let patologieAnzianoArray = [...config002[(config002.pgBen)].patologieAnziano]
        patologieAnzianoArray.map(el => {
          array.push({
            cd_attributo: 64,
            cd_val_attributo: el.id,
            tx_val: el.id === 0 ? config002[(config002.pgBen)].altroPatologie : undefined
          })
        })
      }
      if (idRichiestaTcb !== 0) {
        await graphqlRequest(inserisciBeneficiarioTCBM({ idRichiestaTcb: idRichiestaTcb, pgBen: config002.pgBen }));
        await graphqlRequest(inserisciModificaDatiRichiesta002M({
          idRichiestaTcb: idRichiestaTcb,
          arrayConfig: array.filter(el => {
            return !isNullOrUndefined(el.cd_val_attributo)
          }),
          pgBen: config002.pgBen && config002.pgBen,
        }))
        graphqlRequest(estraiDatiConfigurazioneRichiesta002Q({ idRichiestaTcb: idRichiestaTcb, idServizio: servizioTCB.cd_dominio_tcb }));
      }
    }
    if (stepToNavigate) {
      setStep.bind(this);
      setStep(stepToNavigate);
    }
  };