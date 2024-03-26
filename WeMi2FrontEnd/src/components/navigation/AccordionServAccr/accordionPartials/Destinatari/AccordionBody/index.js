import React from 'react'

import { Row, Column } from 'components/ui/Grid'
import { DestinatariPrimoLivello, DestinatariSecondoLivello, Note, Servizio018 } from './partial'
import { connect } from 'react-redux'
import { localeSelector } from 'redux-modules/selectors/localeSelectors'
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';

const DestinatariBody = ({ Form, SetForm, Modifica, locale, userProfile }) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);

  function updateValue(nomeCampo) {
    return (value) => {
      SetForm({
        ...Form,
        [nomeCampo]: value
      });
    }
  }

  const manageArrayPrimoLivello = (array) => {
    let listaCompletaDestinatariSecondoLivello = createPrimoLivello(array)
    let listaSelezionataDestinatariSecondoLivello =
      filterSecondoLivello(listaCompletaDestinatariSecondoLivello);

    SetForm({
      ...Form,
      listaSelezionataDestinatariPrimoLivello: array,
      listaCompletaDestinatariSecondoLivello: listaCompletaDestinatariSecondoLivello,
      listaSelezionataDestinatariSecondoLivello: listaSelezionataDestinatariSecondoLivello
    })
  }

  function createPrimoLivello(array) {
    const tmp = Form.listaCompletaDestinatariPrimoLivello.filter(destPrimoLivello => {
      array.forEach( el => {
        if (el.id === destPrimoLivello.value) {
          return true;
        }
      });
      return false;
    })
    let toReturn = [];
    tmp.map((destSecondoLivello) => {
      toReturn = toReturn.concat(destSecondoLivello.destinatariSecondoLivello)
    })
    return toReturn.map(elemento => ({
      value: elemento.idDestinatario,
      textValue: elemento.txDestinatario[locale]
    }));
  }

  function filterSecondoLivello(listaCompleta) {
    return Form.listaSelezionataDestinatariSecondoLivello.filter(destSecondoLivello => {
      listaCompleta.forEach( elLista => {
        if (destSecondoLivello.id === elLista.value) {
          return true;
        }
      })
      return false;
    })
  }

  const menageServizio018 = React.useCallback((value) => {
    SetForm({
      ...Form,
      fg018Anni: value,
    });
  });

  return (
    <Row padding="0" fluid>
      <Column>
        <DestinatariPrimoLivello
          Value={{
            listaCompleta: Form?.listaCompletaDestinatariPrimoLivello,
            listaSelezionata: Form?.listaSelezionataDestinatariPrimoLivello,
          }}
          UpdateValue={manageArrayPrimoLivello}
          Modifica={Modifica}
        />
      </Column>
      {
        Form.is018 ? (
          <Column>
            <Servizio018
              Value={Form?.fg018Anni}
              UpdateValue={menageServizio018}
              Modifica={Modifica}
            />
          </Column>
        )
          : null
      }
      <Column xs="12">
        {
          Form.note || isAmministratore ? (
            <Note
              Value={Form.note}
              UpdateValue={updateValue('note')}
              Modifica={Modifica}
            />
          )
            : null
        }
      </Column>
    </Row>
  );
};

DestinatariBody.displayName = 'Body destinatari';

const mapStoreToProps = store => ({
  locale: localeSelector(store),
});

export default withAuthentication(connect(mapStoreToProps)(DestinatariBody));
