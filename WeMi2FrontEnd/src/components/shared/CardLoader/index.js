import { Row } from 'components/ui/Grid';
import React from 'react';
import { ColumnBorder } from '../ColumnBorder';
import { WrapperLoading, WrapperShimmerDescription, WrapperShimmerImg, Wrapper } from './components.styled';

const CardLoader = ({ margin = '', description, width, padding, height }) => (
  <>
    <Wrapper width={width}>
      <div>
        <WrapperLoading>
          <WrapperShimmerImg>
          </WrapperShimmerImg>
        </WrapperLoading>
      </div>
      <div>
        <WrapperLoading margin={margin} padding={padding}>
          <WrapperShimmerDescription>
          </WrapperShimmerDescription>
        </WrapperLoading>
      </div>
      {description ? (
        <>
          <Row fluid flex alignitems="center" justifycontent="center">
            <ColumnBorder
              width="100%"
              color="greyFooter"
              top
            />
          </Row>
          <div>
            <WrapperLoading margin={margin} padding={padding}>
              <WrapperShimmerDescription height={height}>
              </WrapperShimmerDescription>
            </WrapperLoading>
          </div>
        </>
      )
      : null }
    </Wrapper>
  </>
  );

CardLoader.displayName = 'CardLoader';
export default CardLoader;
