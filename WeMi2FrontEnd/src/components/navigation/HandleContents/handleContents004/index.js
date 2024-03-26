import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import MultiSelect from 'components/ui/MultiSelect';
import Select from 'components/ui/Select';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';


const Cont004 = ({
  draft,
  Dati,
  getTags, getPrezzoUnit, prezzoUnit, locale, valorilabel,
  getCategoriaAccreditamento,
  categoriaAccreditamento, setCategoriaAccreditamento,
  getCategoriaLiv2,
  categoriaLiv2,
  getDestinatariLiv1,
  destinatariLiv1,
  getMansioni,
  mansioni,
}) => {
  let selectedUnitaPrezzo = {};
  let selectedCategoriaAccreditamento = {};
  let selectedDestinatari = [];
  let selectedMansioni = [];
  let selectedCategoriaLiv2 = [];
  if (draft && draft.id_contenuto !== -1 && draft.associati.length > 0) {
    for (let i = 0; i < draft.associati.length; i += 1) {
      if (draft.associati[i].ty_contenuto === 4) {
        if (categoriaLiv2) {
          selectedCategoriaLiv2 = categoriaLiv2;
        } else {
          selectedCategoriaLiv2.push({ id: draft.associati[i].id_contenuto_rif, value: draft.associati[i].tl_testo_1.it });
        }
      } else if (categoriaLiv2) {
        selectedCategoriaLiv2 = categoriaLiv2;
      }


      if (draft.associati[i].ty_contenuto === 5) {
        if (mansioni) {
          selectedMansioni = mansioni;
        } else {
          selectedMansioni.push({ id: draft.associati[i].id_contenuto_rif, value: draft.associati[i].tl_testo_1.it });
        }
      } else if (mansioni) {
        selectedMansioni = mansioni;
      }

      if (draft.associati[i].ty_contenuto === 15) {
        if (destinatariLiv1) {
          selectedDestinatari = destinatariLiv1;
        } else {
          selectedDestinatari.push({ id: draft.associati[i].id_contenuto_rif, value: draft.associati[i].tl_testo_1.it });
        }
      } else if (destinatariLiv1) {
        selectedDestinatari = destinatariLiv1;
      }
    }
  } else {
    selectedCategoriaLiv2 = categoriaLiv2;
    selectedDestinatari = destinatariLiv1;
    selectedMansioni = mansioni;
  }
  if (draft && draft.unitaPrezzo) {
    if (prezzoUnit.id !== 0) {
      selectedUnitaPrezzo = prezzoUnit;
    } else {
      const tmp = Dati.EstraiUnitaPrezzo.filter(el => el.cd_unita_prezzo == draft.unitaPrezzo)[0];
      selectedUnitaPrezzo = { id: tmp.cd_unita_prezzo, value: tmp.tl_testo_aggettivo.it };
      getPrezzoUnit(selectedUnitaPrezzo);
      getTags(draft.tagsRicerca);
    }
  } else if (prezzoUnit.id !== 0) {
    selectedUnitaPrezzo = prezzoUnit;
  }

  if (draft && draft.idCategoriaAccreditamento) {
    if (categoriaAccreditamento.id !== 0) {
      selectedCategoriaAccreditamento = categoriaAccreditamento;
    } else {
      const tmp = Dati.EstraiListaCategorieAccreditamentoPubblicate.find(el => el.id_contenuto == draft.idCategoriaAccreditamento);
      if (tmp) {
        selectedCategoriaAccreditamento = { id: tmp.id_contenuto, value: tmp.tl_testo_1.it };
        setCategoriaAccreditamento(selectedCategoriaAccreditamento);
      }
    }
  } else if (categoriaAccreditamento.id !== 0) {
    selectedCategoriaAccreditamento = categoriaAccreditamento;
  }

  return Dati ? (
    <Column md="6" padding="0" justifycontent="flex-start" flex direction="column" alignitems="flex-start">
      <Row fluid justifycontent="flex-end" padding="0.3em 0">
        <Column lg="7" xs="12" padding="1em 0">
          <Select
            material
            required
            color="blue"
            maxLength="25"
            name={valorilabel.cnt004.catagg}
            intlPlaceholder="Categoria accreditamento"
            selectedValue={selectedCategoriaAccreditamento}
            getValue={getCategoriaAccreditamento.bind(this)}
            items={Dati.EstraiListaCategorieAccreditamentoPubblicate.map((ele) => ({ value: ele.id_contenuto, textValue: ele.tl_testo_1.it }))}
          />
        </Column>
        <Column lg="4" lgShift="1" lg="4" xs="12" padding="1em 0">
          <Select
            material
            required
            maxLength="18"
            color="blue"
            name={valorilabel.cnt004.unitaprezzo}
            intlPlaceholder="Unità di prezzo"
            selectedValue={selectedUnitaPrezzo}
            getValue={getPrezzoUnit.bind(this)}
            items={Dati.EstraiUnitaPrezzo.map((ele) => ({ value: ele.cd_unita_prezzo, textValue: ele.tl_testo_aggettivo.it }))}
          />
        </Column>
      </Row>
      <Row fluid justifycontent="flex-end" padding="0.3em 0">
        {Dati.contenutoPubblicatoByTy ? (
          <Column lg="6" xs="12" padding="1em 0">
            <MultiSelect
              material
              maxLength="15"
              color="blue"
              name={valorilabel.cnt004.catLiv2}
              intlPlaceholder="Categoria di livello 2"
              selectedArrDefault={selectedCategoriaLiv2}
              getValue={getCategoriaLiv2.bind(this)}
              items={Dati.contenutoPubblicatoByTy.map((ele) => ({ value: ele.id_contenuto, textValue: ele.tl_testo_1[locale] }))}
            />
          </Column>
        )
          : null}
        {Dati.mansioniPubblicateAll ? (
          <Column xs="12" padding="1em 0">
            <MultiSelect
              material
              maxLength="18"
              color="blue"
              name={valorilabel.cnt004.mansioni}
              intlPlaceholder="Mansioni"
              selectedArrDefault={selectedMansioni}
              getValue={getMansioni.bind(this)}
              items={Dati.mansioniPubblicateAll.map((ele) => ({ value: ele.idMansione, textValue: ele.txTitoloMansione.it }))}
            />
          </Column>
        )
          : null}
      </Row>
      <Row fluid justifycontent="flex-end" padding="0.3em 0">
        {Dati.destinatariPubblicati ? (
          <Column lg="12" xs="12" padding="1em 0">
            <MultiSelect
              material
              maxLength="18"
              color="blue"
              name={valorilabel.cnt004.targetLiv1}
              intlPlaceholder="Target di livello 1"
              selectedArrDefault={selectedDestinatari}
              getValue={getDestinatariLiv1.bind(this)}
              items={Dati.destinatariPubblicati.map((ele) => ({ value: ele.idDestinatario, textValue: ele.txDestinatario.it }))}
            />
          </Column>
        )
          : null}
      </Row>
      <Row fluid justifycontent="flex-end">
        <Column md="12" xs="12" padding="1em 0" flex direction="column">
          <TextArea
            initialValue={draft ? draft.tagsRicerca : ''}
            getValue={getTags.bind(this)}
            material
            name={valorilabel.cnt004.tags}
            color="blue"
            maxLength={STRING_MAX_VALIDATION.value}
          />
          {draft && draft.tl_testo_5 && (
            <Row fluid padding="0" flex direction="column">
              <Text tag="p" value="Valore attuale: " size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />
              <Text tag="p" value={draft.tl_testo_5[locale]} size="f8" color="darkGrey" padding="0.5em 0.5em 0 0" />
            </Row>
          )}
        </Column>
      </Row>
    </Column>
  ) : null;
};

Cont004.displayName = 'Cont004';

export default Cont004;
