/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import Wrapper from 'components/navigation/NavigationWrapper';
import RichiestaServizioTCB from 'components/navigation/RichiestaServizioTCB';
import withAuthentication from 'hoc/withAuthentication';
import checkEnte from 'utils/functions/checkEnte';
import checkAdmin from 'utils/functions/checkAdmin';
import RedirectAdmin from 'components/router/RedirectAdmin';
import Stepper from 'components/ui2/Header/Stepper';
import Loader from 'components/ui2/Loader';
import { getIdServizio } from 'utils/functions/getIdServizio';
import { getRichiestaServizioData as getRichiestaServizioDataQ } from './RichiestaServizioTCBGraphql';

const RichiestaServizioTCBPage = ({ match, locale, userProfile }) => {
  const [selectedValue, setSelectedValue] = useState({
    orario: null,
    livello: null,
    livelliContrattuali: null,
  });
  const idServizio = getIdServizio(parseInt(match.params.tcb, 10));
  const [richiestaServizioData] = useGraphQLRequest(
    [],
    getRichiestaServizioDataQ,
    { idServizio },
    true,
  );

  useEffect(() => {
    if (!richiestaServizioData.isLoading && !richiestaServizioData.pristine && !richiestaServizioData.errored) {
      const orario = {
        id: richiestaServizioData.data.tipologiaOrario[0].cd_dominio_tcb,
        value: richiestaServizioData.data.tipologiaOrario[0].tl_valore_testuale.it,
      };
      handleOrario(orario);
    }
  }, [richiestaServizioData]);

  const handleOrario = (orario, livello) => {
    if (orario.id) {
      const livelliContrattuali = richiestaServizioData.data.livelliContrattuali.filter(livello => (
        livello.cd_tipo_orario_lavoro === orario.id
      ));
      const newLivello = {
        id: livelliContrattuali[0].LivelloContrattuale.cdLivelloContrattuale,
        value: livelliContrattuali[0].cd_categoria_contrattuale,
      };
      if (livello) {
        newLivello.id = livello.id;
        newLivello.label = livello.label;
      }
      setSelectedValue({
        orario,
        livelliContrattuali,
        livello: newLivello,
      });
    }
  };

  const handleLivello = livello => {
    setSelectedValue({
      ...selectedValue,
      livello,
    });
  };

  const servizioTCB = richiestaServizioData.data.serviziTCB ? richiestaServizioData.data.serviziTCB.find(el => parseInt(el.cd_dominio_tcb, 10) === parseInt(match.params.tcb, 10)) : null;
  const loaded = !richiestaServizioData.isLoading && !richiestaServizioData.pristine && selectedValue.orario;


  const BreadcrumbPath = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Baby-sitter, Colf e Badanti',
      url: 'menutcb',
    },
    {
      slash: 'Trova un assistente familiare',
      url: 'menutcb/cittadino',
    },
    {
      slash: servizioTCB && `Richiesta Servizio ${servizioTCB.tl_valore_testuale[locale]}`,
      url: null,
    },
  ];

  const steps = [
    {
      title: 'Scegli la tipologia di servizio',
      color: 'green',
      link: null,
      active: true,
    },
    {
      title: 'Completa la richiesta',
      color: 'primary',
      link: null,
      active: false,
    },
  ];

  const { datiLogin } = userProfile;
  const validitaEnte = checkEnte(datiLogin);
  const validitaAdmin = checkAdmin(datiLogin);
  return (
    <Wrapper>
      {
        validitaEnte || validitaAdmin ?
          <RedirectAdmin /> :
          (
            <>
              <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPath} />
              <Stepper steps={steps} />
              {loaded ? (
                <RichiestaServizioTCB
                  setSelectedValue={setSelectedValue}
                  servizioTCB={servizioTCB}
                  livelliContrattuali={richiestaServizioData.data.livelliContrattuali}
                  orariTCB={richiestaServizioData.data.tipologiaOrario}
                  selectedValue={selectedValue}
                  handleOrario={handleOrario}
                  handleLivello={handleLivello}
                  modalitaAssunzioneTCB={richiestaServizioData.data.modalitaAssunzione}
                  loaded={loaded}
                  locale={locale}
                  idServizio={idServizio}
                />
              ) : <Loader margin="6em auto" />}
            </>
          )
      }

    </Wrapper>
  );
};

const mapStoreToProps = store => ({
  locale: store.locale,
});

RichiestaServizioTCBPage.displayName = 'RichiestaServizioTCBPage';

const RichiestaServizioTCBPageWithAuth = withAuthentication(RichiestaServizioTCBPage);

export default connect(mapStoreToProps)(RichiestaServizioTCBPageWithAuth);
