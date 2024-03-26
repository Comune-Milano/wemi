import React from 'react';
import UsersTable from './partials/UsersTable';
import moment from 'moment';
import Pagination from 'components/ui2/Pagination';
import { Row } from 'components/ui/Grid';
import { Form } from 'libs/Form/components/Form';
import UsersFilteringSortingSection from './partials/UsersFilteringSortingSection';
import { sortingCriteria, initialDataset, validationSchema, NUMBER_ITEMS_TABLE } from './costants';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getUserList as getUserListQ, getProfiles as getProfilesQ } from './graphql/graphql';
import { dataMapperUserList, dataMapperProfileCodesItems } from './graphql/dataMappers';
import Loader from 'components/ui2/Loader';
import { AMMINISTRATORE} from 'types/userRole';


const UsersManagement = () => {

  //filter and order base 
  const inputUserList = React.useRef({
    surname: undefined,
    name: undefined,
    startValidDate: undefined,
    endValidDate: undefined,
    username: undefined,
    profile: AMMINISTRATORE,
    order: undefined,
    email: undefined,
    elementsNumber: NUMBER_ITEMS_TABLE,
    page: 1
  });

  const [userList, callUserList] = useGraphQLRequest(
    undefined,
    getUserListQ,
    { filters: inputUserList.current },
    true,
    //create JSON with totalRows and list
    dataMapperUserList
  );

  const [profileCodesItems] = useGraphQLRequest(
    undefined,
    getProfilesQ,
    undefined,
    true,
    //create items
    dataMapperProfileCodesItems
  );

  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const elementsToShow = NUMBER_ITEMS_TABLE;
  const listaUtenzeSize = userList.data?.totalRows;
  const paginationCallback = (numberPage) => {
    inputUserList.current.page = numberPage;
    callUserList(
      { filters: inputUserList.current }
    )
  };

  //Filter and Order
  const searchUsers = (data) => {
    //set search values
    inputUserList.current.name = data.nome;
    inputUserList.current.surname = data.cognome;
    inputUserList.current.email = data.email;
    inputUserList.current.profile = data.codiceProfilo?.id;
    inputUserList.current.startValidDate = data.inizioValidita ? moment(data.inizioValidita).format("YYYY-MM-DD") : null;
    inputUserList.current.endValidDate = data.fineValidita ? moment(data.fineValidita).format("YYYY-MM-DD") : null;
    inputUserList.current.order = data.ordinamento?.id;
    inputUserList.current.username = data.username;

    //return page 1
    inputUserList.current.page = 1;
    setCurrentPage(1);
    callUserList(
      { filters: inputUserList.current }
    )
  };

  const onSortingSubmit = (data) => {
    //set sorting values
    inputUserList.current.order = data?.id;

    //return page 1
    inputUserList.current.page = 1;
    setCurrentPage(1);
    callUserList(
      { filters: inputUserList.current }
    )
  };

  return (
    <>
      {
        //loading userList:
        userList.isLoading || userList.pristine ||
          //loading profileCodesItems: 
          profileCodesItems.isLoading || profileCodesItems.pristine ?
          <Loader size="4em" margin="auto" overlay />
          : null
      }
      <Form
        validateOnChange
        initialDataset={initialDataset}
        validationSchema={validationSchema}
      >
        {({ dataset, setFormField, isFormValid, isFormDirty, errors }) => (
          <Row fluid margin="0 0 4em 0">
            <UsersFilteringSortingSection
              dataset={dataset}
              setFormField={setFormField}
              profileCodesItems={profileCodesItems.data}
              onSearchSubmit={searchUsers}
              onSortingSubmit={onSortingSubmit}
              sortingCriteria={sortingCriteria}
              isFormValid={isFormValid}
              isFormDirty={isFormDirty}
              errors={errors}
            />
          </Row>
        )}
      </Form>
      <UsersTable
        listaUtenze={userList.data?.list}
      />
      <Row fluid justifycontent="center">
        <Pagination
          margin="2.5em 0 0 0"
          callback={paginationCallback}
          navNumber={10}
          json={[]}
          currentPage={currentPage}
          count={listaUtenzeSize}
          numberitem={elementsToShow}
          setCurrentPage={setCurrentPage}
        />
      </Row>
    </>
  );
};

UsersManagement.displayName = 'GestioneUtenzeNavigation';

export default UsersManagement;