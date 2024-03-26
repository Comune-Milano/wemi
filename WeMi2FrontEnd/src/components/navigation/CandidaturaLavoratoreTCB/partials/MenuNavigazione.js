import React, { useEffect, useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import VerticalStepper from 'components/ui2/VerticalStepper';
import media from 'utils/media-queries';
import styled from 'styled-components';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import { colors } from 'theme';
import { useNavHeight } from 'hooks/useNavHeight';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import ButtonsNavigationMenu from './ButtonsMenuNavigation';
import { checkValidity } from '../services/checkValidity';
import ModaleRiepilogo from './ModaleRiepilogo';

const StickyRow = styled(Row)`
  ${({ isSticky, navHeight }) => isSticky && `
    position: sticky;
    top: ${navHeight ? (navHeight + 10) : 0}px;
  `}

  #scrollTopButton {
    position: fixed;
    bottom: 5rem;
    right: 2rem;
    z-index: 10;
    transition: opacity 1s linear;
  }

  #scrollTopButton.show {
    opacity: 1;
    visibility: visible;
  }

  #scrollTopButton.hide {
    opacity: 0;
    visibility: hidden;
  }

  ${media.md`
    #scrollTopButton {
        display: none !important;
    }
  `}`
;

const StyledButtonContainer = styled.div`
    background-color: ${colors.white};
    border-radius: 50%;
    padding: 0.2rem;
`;


const MenuNavigazione = ({
  isLavoratoreAssociato,
  navigationTabs,
  onStepChange,
  idOperatore,
  idLavoratore,
  locale,
  isSticky,
  openModalSummary, 
  setOpenModalSummary,
}) => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const navHeight = useNavHeight();

  const showRequiredMessage = !navigationTabs.reduce((tot, step) => tot && !(step.visited && !step.valid), true);

  const handleSummaryModalStepChange = stepIndex => {
    onStepChange(stepIndex);
    setOpenModalSummary(!openModalSummary);
  };

  const handleScrollTopButton = () => {
    const startOfTCBPageRef = document.getElementById('startOfTCBCandidacy');
    const endOfTCBPageRef = document.getElementById('startOfTCBCandidacy');
    if (startOfTCBPageRef && endOfTCBPageRef) {
      const startPoint = startOfTCBPageRef.getBoundingClientRect().bottom;
      const endPoint = endOfTCBPageRef.getBoundingClientRect().bottom;
      const scrollTopButton = startPoint < 120 && endPoint < 120;
      setShowScrollTopButton(scrollTopButton);
    }
  };

  useEffect(() => {
    window.removeEventListener('scroll', handleScrollTopButton);
    window.addEventListener('scroll', handleScrollTopButton);
    return () => { window.removeEventListener('scroll', handleScrollTopButton); };
  }, [handleScrollTopButton]);

  return (
    <>
      <StickyRow fluid isSticky={isSticky} navHeight={navHeight}>
        <ButtonsNavigationMenu
          isLavoratoreAssociato={isLavoratoreAssociato}
          checkCandidacyValidity={checkValidity(navigationTabs)}
          idLavoratore={idLavoratore}
          idOperatore={idOperatore}
          onStepChange={onStepChange}
        />
        <Column xs="12" padding="1em 0">
          <VerticalStepper
            progressive
            steps={navigationTabs}
            onChange={onStepChange}
          />
        </Column>
        <Button
          color="primary"
          label="riepilogo"
          onClick={() => setOpenModalSummary(!openModalSummary)}
          margin="1em 0"
        />
        {showRequiredMessage && (
          <Column xs="12" padding="1em 0 0 0" flex alignItems="flex-start">
            <span style={{ paddingRight: '1em' }}>*</span>
            <Text
              size="f7"
              color="black"
              tag="p"
              value="La compilazione della sezione deve essere completata per poter inviare la richiesta"
            />
          </Column>
        )}
        <StyledButtonContainer id="scrollTopButton" className={showScrollTopButton ? 'show' : 'hide'}>
          <ButtonIcon fontSize="f5" color="primary" icon="arrow-up" label="Scroll-top" onClick={() => { window.scrollTo(0, 0); }} />
        </StyledButtonContainer>
      </StickyRow>
      <ModaleRiepilogo
        locale={locale}
        open={openModalSummary}
        setOpen={setOpenModalSummary}
        idLavoratore={idLavoratore}
        onPatchStep={stepIndex => handleSummaryModalStepChange(stepIndex)}
        isModifica
      />
    </>

  );
};

MenuNavigazione.displayName = 'MenuNavigazione';

export default MenuNavigazione;
