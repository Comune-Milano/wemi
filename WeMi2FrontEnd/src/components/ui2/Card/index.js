/** @format */
import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import Navlink from 'components/router/NavLink';
import useWindowSize from 'hooks/useWindowSize';
import { SIZE_LG, SIZE_XS, SIZE_XL } from 'types/windowSize';
import { colors } from 'theme';
import { WrapperCard, WrapperButton, TextExpand, WrapperDescription } from './styled';

const Card = ({
  title,
  description,
  color,
  img,
  link,
}) => {
  const [withLineClamp, setWithLineClamp] = React.useState(false);
  const windowSize = useWindowSize();
  const isLgSize = [SIZE_LG].includes(windowSize);
  const isXsSize = [SIZE_XS].includes(windowSize);
  const isXlSize = [SIZE_XL].includes(windowSize);

  const widthButton = React.useMemo(() => isXsSize ? '100%' : 'auto', [isXsSize]);

  const imgHeight = React.useMemo(() => {
    if (isXlSize) return '95%';
    if (isLgSize) return '70%';
    if (isXsSize) return '25%';
    return '100%';
  }, [windowSize]);
  const imgWidth = React.useMemo(() => {
    if (isXsSize) return '50%';
    return '100%';
  }, [windowSize]);

  React.useEffect(() => {
    if (isXsSize) {
      setWithLineClamp(true);
    } else {
      setWithLineClamp(false);
    }
  }, [isXsSize]);

  const expandDescription = () => {
    setWithLineClamp(false);
  };

  const findColor = React.useMemo(() => {
    const bgColor = Object.keys(colors).find(el => colors[el] === color);
    return bgColor;
  }, [color]);

  return (
    <WrapperCard>
      <Row fluid>
        <BackgroundTitle
          label={title}
          bgColor={findColor || 'primary'}
          size={bgTitleSizes.smaller}
        />
      </Row>
      <Row fluid margin="1rem 0 0 0">
        <Column padding="0" margin="auto" sm="5" flex justifycontent="center" alignitems="center" sizepadding={{ xs: '0 0 1.5rem 0', sm: '0 1.5rem 0 0', md: '0 2.5rem 0 0', lg: '0 2rem 0 0' }}>
          <img
            src={img}
            width={imgWidth}
            height={imgHeight}
            alt={`immagine ${title}`}
          />
        </Column>
        <Column padding="0" sm="7" flex>
          <Row fluid flex>
            <WrapperDescription lineClamp={withLineClamp}>
              <Text
                size="f7"
                color="black"
                value={description}
              />
            </WrapperDescription>
            {
              withLineClamp ? (
                <TextExpand
                  size="f7"
                  color="black"
                  value="visualizza di più"
                  decoration="underline"
                  margin="0 0 2.3rem 0"
                  onClick={() => expandDescription()}
                />
              )
                : null
            }
            <WrapperButton padding="1rem 0 0 0">
              <Column padding="0">
                <Navlink
                  width="auto"
                  to={link}
                >
                  <Button
                    color={findColor || 'primary'}
                    label="Scopri i servizi"
                    width={widthButton}
                    ariaLabel={`Scopri i servizi di ${title}`}
                  />
                </Navlink>
              </Column>
            </WrapperButton>
          </Row>
        </Column>
      </Row>
    </WrapperCard>
  );
};

Card.displayName = 'Card';

export default React.memo(Card);
