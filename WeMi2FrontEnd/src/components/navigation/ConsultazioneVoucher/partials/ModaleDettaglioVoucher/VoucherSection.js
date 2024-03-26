import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { colors } from 'theme';
import { WINDOW_SIZE } from 'types/windowSize';
import useWindowSize from 'hooks/useWindowSize';
import VoucherSectionDesktop from './VoucherSectionPartials/VoucherSectionDesktop';
import VoucherSectionMobile from './VoucherSectionPartials/VoucherSectionMobile';

export const StyledRow = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
  padding: 0;
  `;

// eslint-disable-next-line react/display-name
const VoucherSection = React.memo(({
  voucherDetails,
}) => {
  const windowSize = useWindowSize();

  const isDesktop = [...WINDOW_SIZE.windowSizesMedium, ...WINDOW_SIZE.windowSizesSmall].indexOf(windowSize) === -1;

  return (
    <React.Fragment>
      { isDesktop ? (
        <VoucherSectionDesktop voucherDetails={voucherDetails} />
      ) : (
        <VoucherSectionMobile voucherDetails={voucherDetails} />
      )}
    </React.Fragment>
  );
});

VoucherSection.displayName = 'VoucherSection';

export default VoucherSection;
