import React from 'react';
import { ComponentIdWorker, ActionIcon } from '../partials/TableRowsActions';

/**
 * 
 * @param {Array} workerList 
 */
export const mapRows = (workerList) => {
  const workerRows = [];
  
  if(!workerList){
    return workerRows;
  }

  for(const worker of workerList){
  
    const row = {};
    /**
     * TODO Componente esterno per id e azioni
     */
    row.id = <ComponentIdWorker idWorker={worker.idLavoratore} />;
    row.tipoServizio = worker.tipoServizio;
    row.cognome = worker.cognome;
    row.nome = worker.nome;
    row.statoOccupazionale = worker.statoOccupazionale;
    row.statoCandidatura = worker.statoCandidatura;
    row.statoAssociazione = worker.descrizioneAssociazione;
    row.dataCambioStato = worker.dataCambioStato;
    row.ultimoOperatore = worker.ultimoOperatore;
    row.azioni = <ActionIcon worker={worker} />;

    workerRows.push(row);
    
  }

  return workerRows;
};
