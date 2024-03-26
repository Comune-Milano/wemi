/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import Loader from 'components/ui2/Loader';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
`;

const Wrapper = ({
  loading,
  errored,
  children
}) => (
  <StyledWrapper>
    {!loading && !errored ?
      <>
        {children}
      </>
      : errored ? <Text tag="div" color="red" padding="0.5em 0" value="Si è verificato un errore" />
        : <Loader size="1.5rem" margin="0 auto" />}
  </StyledWrapper>
);

Wrapper.displayName = 'Wrapper';

export default Wrapper;
