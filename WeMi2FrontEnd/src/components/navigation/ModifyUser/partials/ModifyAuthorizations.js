import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';
import TextTitle from './TextTitle';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import UserAuthorizationEntry from './UserAuthorizationEntry';
import { EMPTY_SELECT_ITEM } from '../costants';

const ModifyAuthorizations = React.memo(({
  userAuthorizations = [],
  availableAuthorizationsItems = [],
  setFormField,
  dataset
}) => {

  const addAuthorization = () => {
    //copy array
    const newUserAuthorizations = userAuthorizations.slice();
    //add
    newUserAuthorizations.push(dataset.authorizationSelect);
    setFormField("autorizzazioni", newUserAuthorizations);
    //reset select
    setFormField("authorizationSelect", EMPTY_SELECT_ITEM);
  };

  const deleteAuthorization = (idAuthorization) => {
    // copy array and delete
    const newUserAuthorizations = userAuthorizations.filter(el => el.id !== idAuthorization);
    setFormField("autorizzazioni", newUserAuthorizations);
  };

  const idAuthorizations = React.useMemo(() => {
    return userAuthorizations.map(el => el.id);
  }, [userAuthorizations]
  );

  const searchUnselectedItems = React.useMemo(() => {
    return availableAuthorizationsItems.filter(el => !idAuthorizations.includes(el.id));
  }, [userAuthorizations]
  );

  return (
    <Row fluid margin="0 0 3em 0">
      <Column padding="0 0 0 1em" >
        <TextTitle
          value="Lista autorizzazioni"
          color="primary"
        />
      </Column>
      <Column lg="4" md="6" sm="7" xs="8" padding="1em">
        <Select
          name='autorizzazioni'
          label='Autorizzazioni'
          items={searchUnselectedItems}
          clickedSelectedItem={() => { setFormField('authorizationSelect', EMPTY_SELECT_ITEM) }}
          clickedItem={(data) => { setFormField('authorizationSelect', data) }}
          removedItem={() => { setFormField('authorizationSelect', EMPTY_SELECT_ITEM) }}
          selectedValue={dataset.authorizationSelect}
        />
      </Column>
      <Column lg="2" md="2" sm="2" xs="2" sizepadding={{ xs: "2em 0 0 0.5em", sm: "2em 0 0 0.5em", md: "2em 0 0 10em", lg: "2em 0 0 7em", }}>
        <ButtonIcon
          color="blue"
          icon="plus"
          onClick={addAuthorization}
          disabled={!dataset.authorizationSelect?.id}
        />
      </Column>
      {
        userAuthorizations?.map((el) => (
          <UserAuthorizationEntry
            id={el.id}
            textValue={el.value}
            deleteAuthorization={deleteAuthorization}
            key={"Authorization-" + el.id}
          />
        ))
      }
    </Row>
  );
});

ModifyAuthorizations.displayName = 'ModificaUtenzaNavigation - ModifyAuthorizations';

export default ModifyAuthorizations;