import React from 'react';
import Loader from 'components/ui2/Loader';
import PersonalData from './partials/PersonalData';
import ModifyUserPermissionsForm from './partials/ModifyUserPermissionsForm';
import { Form } from 'libs/Form/components/Form';
import { validationSchema } from './costants';
import { getUserAuthorizations as getUserAuthorizationsQ, getUserDetail as getUserDetailQ, saveUserAuthorization as saveUserAuthorizationM } from './graphql/graphql';
import { dataMapperProfileCodesItems, mapUserData } from './graphql/dataMappers';
import { withRouter } from 'react-router';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { EMPTY_SELECT_ITEM } from './costants';
import { PAGE_GESTIONE_UTENZE } from 'types/url';
import moment from 'moment';

const ModifyUser = ({
  match,
  history
}) => {

  const userId = Number.parseInt(match?.params?.idUtente);

  const [userData] = useGraphQLRequest(
    undefined,
    getUserDetailQ,
    { userId },
    true,
    //format data user
    mapUserData
  );

  const [userAuthorizations] = useGraphQLRequest(
    undefined,
    getUserAuthorizationsQ,
    { userId },
    true,
    //create items
    dataMapperProfileCodesItems
  );

  const saveUser = useStatelessGraphQLRequest(saveUserAuthorizationM);

  const goBack = () => {
    //return back
    history.push(PAGE_GESTIONE_UTENZE);
  };

  const onCancel = () => {
    //return back
    goBack();
  };

  const onSave = async (data) => {
    //save data and return back

    //create input
    const authorizations = data?.autorizzazioni?.map(el => {
      return {
        code: el.id
      }
    })

    const userAuthorizations = {
      userId,
      profileCode: data?.profileCode,
      startValidityDate: data?.inizioValidita ? moment(data.inizioValidita).format('YYYY-MM-DD') : null,
      endValidityDate: data?.fineValidita ? moment(data.fineValidita).format('YYYY-MM-DD') : null,
      authorizations
    };
    //call query
    await saveUser({ userAuthorizations });
    goBack();
  };

  //Form
  const initialDataset = React.useMemo(
    () => {
      if (!userData.data) {
        return null;
      }
      return {
        autorizzazioni: userData.data?.autorizzazioni,
        inizioValidita: userData.data?.inizioValidita,
        fineValidita: userData.data?.fineValidita,
        authorizationSelect: EMPTY_SELECT_ITEM,
        profileCode: userData.data?.codiceProfilo
      }
    }, [userData.data]
  );

  //loading query
  const shouldShowLoader = userData.isLoading || userData.pristine || userAuthorizations.isLoading || userAuthorizations.pristine;
  if (shouldShowLoader) {
    return <Loader size="4em" margin="auto" overlay />;
  }


  return (
    <>
      <PersonalData
        data={userData.data}
      />
      {initialDataset ?
        <Form
          validateOnChange
          initialDataset={initialDataset}
          validationSchema={validationSchema}
        >
          {({ dataset, setFormField, isFormValid, isFormDirty, errors }) => (
            <ModifyUserPermissionsForm
              dataset={dataset}
              setFormField={setFormField}
              availableAuthorizationsItems={userAuthorizations.data}
              isFormDirty={isFormDirty}
              isFormValid={isFormValid}
              errors={errors}
              onCancel={onCancel}
              onSave={onSave}
            />
          )}
        </Form>
        : null
      }
    </>
  );
};

ModifyUser.displayName = 'ModificaUtenza - Navigation';

export default withRouter(ModifyUser);