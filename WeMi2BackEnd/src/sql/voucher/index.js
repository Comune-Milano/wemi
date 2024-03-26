export const limitClauseContent = 'LIMIT $[elementsPerPage] OFFSET $[offset]';

export const whereClauseSearchBando = `v.cd_bando like '%$[bando:value]%'`
export const whereClauseSearchState = `v.cd_stato_voucher = '$[state]'`;
export const whereClauseSearchCFMinore = `v.js_dati_voucher ->> 'txCFMinore' like '%$[cfMinore:value]%'`;
export const whereClauseSearchCFTitolare = `v.ptx_cf_titolare like '%$[cfIntestatario:value]%'`;
export const whereClauseSearchCodiceVoucher = `v.cd_voucher like '%$[codiceVoucher:value]%'`;

export const whereClauseSearchidUtente = `v.ptx_cf_titolare = '$[idUtente:value]'`;

export const whereClauseSearchIdVoucher = `tv.id_voucher = $[idVoucher:value]`;

export const whereClauseSearchInizioValidita = `v.dt_inizio_val >= $[inizioValidita]::date`;
export const whereClauseSearchFineValidita = `v.dt_fine_val <= $[fineValidita]::date`;

export const whereClauseSearchDataTransazioneDa = `cast(tv.ts_utilizzo as date) >= $[dataTransazioneDa]::date`;
export const whereClauseSearchDataTransazioneA = `cast(tv.ts_utilizzo as date) <= $[dataTransazioneA]::date`;
export const whereClauseSearchDataContabilizzazioneDa = `cast(tv.ts_contab as date) >= $[dataContabilizzazioneDa]::date`;
export const whereClauseSearchDataContabilizzazioneA = `cast(tv.ts_contab as date) <= $[dataContabilizzazioneA]::date`;
export const whereClauseSearchTransazioneState = `tv.cd_stato_transazione = '$[state]'`;

export const whereClauseSearchImportoTransazioneMin = `tv.im_speso >= $[importoTransazioneMin]`;
export const whereClauseSearchImportoTransazioneMax = `tv.im_speso <= $[importoTransazioneMax]`;

export const havingClauseSearchRemainingImportMin = `(v.im_totale - sum(
                                                    CASE tv.cd_stato_transazione 
                                                      WHEN '1' then im_speso     
                                                      WHEN '2' then 0     
                                                      WHEN '3' then im_speso     
                                                    ELSE 0 END)) >= $[minImporto]`;

export const havingClauseSearchRemainingImportMax = `(v.im_totale - sum(
                                                      CASE tv.cd_stato_transazione 
                                                        WHEN '1' then im_speso     
                                                        WHEN '2' then 0     
                                                        WHEN '3' then im_speso     
                                                      ELSE 0 END)) <= $[maxImporto]`;

export const havingClauseNonUtilizzato = `(v.im_totale - sum(
                                                        CASE tv.cd_stato_transazione 
                                                          WHEN '1' then im_speso     
                                                          WHEN '2' then 0     
                                                          WHEN '3' then im_speso     
                                                        ELSE 0 END)) = v.im_totale`;
  
export const groupByClauseVouchers = ` group by 
                                                      v.id_voucher,
                                                      v.id_file_voucher,
                                                      v.id_sostegno_economico,
                                                      c.tl_testo_1 ->> 'it',
                                                      v.cd_voucher,
                                                      v.cd_bando,
                                                      v.cd_domanda,
                                                      v.dt_inizio_val,
                                                      v.dt_fine_val,
                                                      v.tx_nome_titolare,
                                                      v.tx_cognome_titolare,
                                                      v.ptx_cf_titolare,
                                                      v.js_dati_voucher ->> 'txCFMinore',
                                                      -- v.js_dati_voucher,
                                                      v.im_totale,
                                                      dsv.tl_valore_testuale ->> 'it',    -- Stato dei voucher
                                                      v.ts_caricamento,
                                                      v.id_utente_caricamento,
                                                      v.ts_attivazione,
                                                      v.id_utente_attivazione,
                                                      v.ts_annullo,
                                                      v.id_utente_annullo,
                                                      v.ts_controllo_utilizzo`
                                                                                                      
  
export const orderClauseIdentifierVoucher = 'v.dt_inizio_val DESC, v.cd_voucher';

export const orderClauseIdentifierVoucherTransaction = 'tv.ts_utilizzo DESC, v.cd_voucher, tv.id_transazione_voucher';
