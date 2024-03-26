/** @format */

import React from 'react';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import userPlaceholder from 'images2/user_image_placeholder.png';
import { codiciAttributo } from '../../../constants/CodiciAttributo';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 4rem;
  ${media.xs`
    height: 10rem;
  `};
  ${media.sm`
    height: 10rem;
  `};
  ${media.md`
    height: 10rem;
  `};
  ${media.lg`
    height: 10rem;
  `};
`;

const Left = ({
  Dati,
  print
}) => {

  let oj;
  Dati.map((ele) => {
    if (ele.cd_attributo === codiciAttributo.IMG_FOTO)
      if (ele.oj_allegato_off) {
        oj = ele.oj_allegato_off
      }
  });
 
  return (
    <>
      <Row fluid justifycontent="center">
        {(() => {
          if (oj) {
            return <Image src={oj} />;
          }
          return <Image src={userPlaceholder} />;
        })()}
      </Row>
      <div className="noPrint" style={{ width: "100%", margin: "4em 0 0 0" }}>
        <Button label="Stampa" color="primary" onClick={print} />
      </div>
    </>
  );
};

Left.displayName = 'Left';

export default Left;
