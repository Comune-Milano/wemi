import React from 'react';
import Navlink from 'components/router/NavLink';
import { colors } from 'theme';
import styled from 'styled-components';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { generatePath } from 'react-router';
import { PAGE_MODIFICA_UTENZA } from 'types/url';

const NavlinkTableRowWrapper = styled(Navlink)`
  &:focus{
    background-color: ${hexToRgba(colors.primary, 0.2)};
  }
  justify-content: center;
`;

const DivTableRowWrapper = styled.div`
  &:focus{
    background-color: ${hexToRgba(colors.primary, 0.2)};
  }
  display: flex;
  justify-content: center;
`;

const ButtonModifyWrapper = React.memo(({
  children,
  redirect,
  idUser
}) => {
  
  const generateModifyUserPath = (idUtente) => {
    return (
      generatePath(PAGE_MODIFICA_UTENZA, {
        idUtente,
      })
    )
  };

  if (redirect) {
    return (
      <NavlinkTableRowWrapper
        to={generateModifyUserPath(idUser)}
        width="100%"
        tabIndex={0}
      >
        {children}
      </NavlinkTableRowWrapper>
    );
  }
  return (
    <DivTableRowWrapper>
      {children}
    </DivTableRowWrapper>
  )
});

ButtonModifyWrapper.displayName = 'ButtonModifyWrapper';

export default ButtonModifyWrapper;