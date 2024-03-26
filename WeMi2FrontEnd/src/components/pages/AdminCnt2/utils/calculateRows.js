import React from 'react';
import { Draft, Published, Deactivated } from '../partials';
import Text from 'components/ui/Text';
import { NavLink } from 'components/router';
import AnchorLink from 'components/ui/AnchorLink';
import { generatePath } from 'react-router';
import { PAGE_PAGINA_INFORMATIVA_URL } from 'types/url';
import { SPAZI_SINGOLI_WEMI, VOCI_MENU_LIVELLO_2, FOOTER_COLONNA_1, FOOTER_COLONNA_2 } from 'types/contenuti/typeContenuto';
import { AnchorModal } from '../partials/links/AnchorModal';

export const DRAFT = 1;
export const PUBLISHED = 2;
export const DEACTIVATED = 3;
/**
 * 
 * @param {Array(Object)} contents 
 * @param {Int} typeContenuto 
 * @param {Function} getContenutoTyData to update the table on the action of the buttons
 */
export const calculateRows = (contents, typeContenuto, getContenutoTyData) => {
  const rows = [];

  if (!contents) {
    return rows;
  }

  /**
   * Create the rows considering the state of the content
   */
  for (const content of contents) {
    const row = {};
    const contentState = content.cd_stato_contenuto;

    const index = contents.indexOf(content);

    row.id = content.id_contenuto;

    if (typeContenuto === SPAZI_SINGOLI_WEMI) {
      row.testo_1 = <AnchorModal content={content} contents={contents} index={index} />
    }

    else if ((typeContenuto === VOCI_MENU_LIVELLO_2 ||
      typeContenuto === FOOTER_COLONNA_1 || typeContenuto === FOOTER_COLONNA_2)
      && content.ty_sottotipo_contenuto === 2) {

      row.testo_1 = (<NavLink key={content.id_contenuto} to={generatePath(PAGE_PAGINA_INFORMATIVA_URL, { idCnt: content.id_contenuto })} width="100%" align="center">
          <Text value={content.tl_testo_1 ? content.tl_testo_1.it : ''} size="f8" decoration="underline" color="darkGrey" />
        </NavLink>)
    }


    else {
      row.testo_1 = <Text key={content.id_contenuto} value={content.tl_testo_1 ? content.tl_testo_1.it : ''} size="f8" />
    }

    row.progressivo = content.nr_ordine_visualizzazione;
    row.versione = content.pg_versione;
    row.stato = content.cd_stato_contenuto_desc;

    if (contentState === DRAFT) {
      row.azioni = <Draft contents={contents} content={content} typeContenuto={typeContenuto} getContenutoTyData={getContenutoTyData} />;
    }

    if (contentState === PUBLISHED) {
      row.azioni = <Published contents={contents} content={content} typeContenuto={typeContenuto} getContenutoTyData={getContenutoTyData} />;
    }

    if (contentState === DEACTIVATED) {
      row.azioni = <Deactivated contents={contents} content={content} typeContenuto={typeContenuto} getContenutoTyData={getContenutoTyData} />;
    }

    rows.push(row);

  }

  /**
   * Sort the rows
   */
  const resultRows = rows.sort((a, b) => {
    if ((a.id + a.versione) > (b.id + b.versione)) {
      return -1;
    }
    else {
      return null;
    }
  });

  return resultRows;
};


