import React from 'react';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import ButtonModifyWrapper from './ButtonModifyWrapper';

const ButtonToModify = React.memo(({
  redirect,
  idUser
}) => {

  return (
    <React.Fragment>
      <ButtonModifyWrapper
        redirect={redirect}
        idUser={idUser}
      >
        <ButtonIcon
          icon="angle-right"
          fontSize="f6"
          color={redirect ? "blue" : "grey"}
          disabled={!redirect}
        />
      </ButtonModifyWrapper>
    </React.Fragment>
  );
});

ButtonToModify.displayName = 'ButtonToModify';

export default ButtonToModify;
