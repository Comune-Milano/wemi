import React from 'react';
import { withRouter } from 'react-router-dom';
import { useUserProfile } from 'hooks/useUserProfile';
import { Form } from 'libs/Form/components/Form';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Loader from 'components/ui2/Loader';
import { SPAZI_SINGOLI_WEMI, CATEGORIE_ACCREDITAMENTO } from 'types/contenuti/typeContenuto';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { PAGE_GESTIONEENTE_URL } from 'types/url';
import FormDatiIdentificaviEnte from './fields';
import validationSchema from './validationschema';
import { contenutoByTyS, dominioByTipoS, EstraiDatiPropriEnte, InserisciDatiIdentificativiEnte, ModificaDatiIdentificativiEnte } from './graphql';
import { getInitialDataset, mapper, transformForSave } from './utils';


const DatiIdentificativiEnte = ({ match, history }) => {
  const [userProfile] = useUserProfile();
  const { datiLogin } = userProfile;
  const idEnte = Number.parseInt(match.params.idEnte, 10);
  const isModify = React.useMemo(() => idEnte >= 0, [idEnte]);

  const [datiPropriEnte, getDatiPropriEnte] = useGraphQLRequest(
    undefined,
    EstraiDatiPropriEnte,
    {},
    false
  );

  React.useEffect(() => {
    if (isModify) {
      getDatiPropriEnte({
        id_ente: idEnte,
      });
    }
  }, []);

  const hasEndedLoadingDatiPropriEnte = !datiPropriEnte.isLoading && !datiPropriEnte.errored;

  const [listaStati] = useGraphQLRequest(
    [],
    dominioByTipoS,
    {
      type: 'STATO_ENTE',
    },
    true,
    mapper
  );

  const hasEndedLoadingStati = !listaStati.isLoading && !listaStati.pristine && !listaStati.errored;

  const [listaSpaziWeMi] = useGraphQLRequest(
    [],
    contenutoByTyS,
    {
      type: SPAZI_SINGOLI_WEMI,
    },
    true,
    mapper
  );
  const hasEndedLoadingSpaziWeMi = !listaSpaziWeMi.isLoading && !listaSpaziWeMi.pristine && !listaSpaziWeMi.errored;
  const [listaCategorieAccreditamento] = useGraphQLRequest(
    [],
    contenutoByTyS,
    {
      type: CATEGORIE_ACCREDITAMENTO,
    },
    true,
    mapper
  );
  const hasEndedLoadingCategorieAccreditamento = !listaCategorieAccreditamento.isLoading && !listaCategorieAccreditamento.pristine && !listaCategorieAccreditamento.errored;

  const hasEndedLoading = hasEndedLoadingSpaziWeMi && hasEndedLoadingCategorieAccreditamento && hasEndedLoadingStati && hasEndedLoadingDatiPropriEnte;

  const inserisciDati = useStatelessGraphQLRequest(InserisciDatiIdentificativiEnte);
  const modificaDati = useStatelessGraphQLRequest(ModificaDatiIdentificativiEnte);

  const saveEnte = React.useCallback((values = {}) => {
    const inputObjectForBackend = transformForSave({
      ...values,
      idEnte,
      idCittadino: datiLogin.idCittadino,
    }, isModify);

    if (isModify) {
      return modificaDati(inputObjectForBackend);
    }
    return inserisciDati(inputObjectForBackend);
  }, [transformForSave, modificaDati, inserisciDati, idEnte, datiLogin]);

  if (!hasEndedLoading) {
    return <Loader />;
  }

  return (
    <Form
      initialDataset={getInitialDataset({
        data: datiPropriEnte.data,
        listaCategorieAccreditamento: listaCategorieAccreditamento.data,
        listaSpaziWeMi: listaSpaziWeMi.data,
      })}
      validateOnBlur
      validateOnChange
      validateOnMount
      validationSchema={validationSchema}
    >
      <FormDatiIdentificaviEnte
        listaSpaziWeMi={listaSpaziWeMi.data}
        listaCategorieAccreditamento={listaCategorieAccreditamento.data}
        listaStati={listaStati.data}
        onConfirm={(dataset) => {
          saveEnte(dataset).then(() => {
            history.push(PAGE_GESTIONEENTE_URL);
          });
        }}
        onDeny={() => {
          history.push(PAGE_GESTIONEENTE_URL);
        }}
      />
    </Form>
  );
};


DatiIdentificativiEnte.displayName = 'DatiIdentificativiEnte';

export default withRouter(DatiIdentificativiEnte);
