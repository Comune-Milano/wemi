
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import useWindowSize from 'hooks/useWindowSize';
import { HashLink } from 'react-router-hash-link';
import { useEventBus } from 'hooks/eventBus/useEventBus';
import { PAGE_HOME_URL } from 'types/url';
import { HOME_ANCHORS } from '../../constants/anchors';

const StyledCaptionWrapper = styled.div`
  min-height: 20rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 27vw 0 2rem 0;
  margin: 0 2.8rem;

  ${media.xs`
    flex: 1 0 auto;
  `}

  ${media.md`
    padding: 5rem 0;
    justify-content: ${({ justifyContent }) => justifyContent};
    height: 100%;
    flex: 0 1 auto;
    margin: 0 7.03rem;
    min-height: auto;
  `};
`;

const StyledTitle = styled.div`
 
  ${media.xs`
    flex: 1 0 auto;
    line-height: 1.5;
    min-height: ${props => props.titleWrapperMinHeight};

    span {
      padding: 0 0.5em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      letter-spacing: 0.05em;
         }
   `}

   ${media.md`
     flex: 0 1 auto;
   `}
`;

const StyledDescription = styled.div`
  
  ${media.xs`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    flex: 1 0 auto;
    display: flex;
    min-height: 12em; `
    }
  ${media.md`
    max-width: 66%;
    display: block;
    flex: 0 1 auto;
    margin-bottom: 0;
    min-height: 10em;
  `};

  ${media.lg`
    max-width: 50%;
    min-height: 10.2em;
  `};

  ${media.xl`
    max-width: 40%;
  `};

  ${media.xxl`
    max-width: 33%;
  `};
`;

const StyledCaptionAnchor = styled.div`
  ${media.xs`
  margin-top: 2rem;
  min-height: 2em;
  position: absolute;
  bottom: 0;
  flex: 1 0 auto;

  a {
    outline: none;
    display: inline-block;
  }
  `}

  ${media.md`
  position: static;
  flex: 0 1 auto;
  `}
`;

/**
 * The caption associated to the main carousel.
 */
export const MainCarouselCaption = ({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  titleSize,
  justifyContent,
  titleWrapperMinHeight = '', // min height title wrapper
}) => {
  // The current window size.
  const windowSize = useWindowSize();

  const isDesktop = ['xs', 'sm'].indexOf(windowSize) === -1;

  const eventBus = useEventBus();

  const matchServicesAreaIdentifier = (value = '') => {
    if (/AREA_SERVIZI_[0-9]+/gm.test(value)) {
      return true;
    }
    const hash = value.toLowerCase().split('#');
    if (!hash[1]) {
      return false;
    }
    const isHashAnchor = Object.values(HOME_ANCHORS).find(anchor => anchor.toLowerCase() === hash[1]);
    return !!isHashAnchor;
  };

  const renderButtonAnchor = (children, link = '') => {
    if (!matchServicesAreaIdentifier(link)) {
      return (
        <a href={link}>
          {children}
        </a>
      );
    }
    return (
      <HashLink
        to={{
          pathname: PAGE_HOME_URL,
          hash: link.includes('#') ? link : `#${link}`,
        }}
        scroll={() => {
          const servicesAreaCode = link.replace('AREA_SERVIZI_', '');
          eventBus.publish('CHANGE_SERVICES_AREA', parseInt(servicesAreaCode, 10));
        }}
      >
        {children}
      </HashLink>
    );
  };
  renderButtonAnchor.displayName = 'Home Main Carousel Caption - Render button anchor';

  return (
    <StyledCaptionWrapper justifyContent={justifyContent} isDesktop={isDesktop}>
      {/* Title rows */}
      {
        <StyledTitle titleWrapperMinHeight={titleWrapperMinHeight} isDesktop={isDesktop}>
          <Text
            tag="span"
            weight="bold"
            size={titleSize || 'f4'}
            color="white"
            bgcolor="primary"
            value={title}
            padding="0 0.5em"
            whitespace={isDesktop ? 'pre-line' : ''}
          />
        </StyledTitle>
      }
      {/* Subtitle */}
      {
        subtitle && (
          <StyledDescription isDesktop={isDesktop}>
            <Text
              size="f7"
              color="black"
              value={subtitle}
              whitespace="pre-line"
            />
          </StyledDescription>
        )
      }
      {/* Button */}
      {
        buttonLabel && buttonLink && (
          <StyledCaptionAnchor isDesktop={isDesktop}>
            {
              renderButtonAnchor(
                <Button
                  label={buttonLabel}
                  color="primary"
                  fontSize="f7"
                  transform="none"
                />,
                buttonLink
              )
            }
          </StyledCaptionAnchor>
        )
      }
    </StyledCaptionWrapper>
  );
};

MainCarouselCaption.displayName = 'MainCarouselCaption';
