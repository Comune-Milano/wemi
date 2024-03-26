import React from 'react';
import Modal from 'components/ui2/Modal';
import { Column, Row } from 'components/ui/Grid';
import Chip, { StyledGroupChip } from 'components/pages/MatchingDomandaLavoratore/utils/Chip';
import {
  labelCalendario, labelMadrelingua,
  labelAnniEsperienza,
  labelTipologiaOrario,
} from 'components/pages/MatchingDomandaLavoratore/labels';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import connectContext from 'hoc/connectContext';
import { MatchingLavoratoreContext } from '../../utils/MatchingLavoratoreContext';
import BorderTitle from '../../utils/BorderTitle';
import { CheckboxWithBorder } from '../../utils/checkboxwithborder';
import { Body } from './Body';
import { Header } from './Header';
import { visibleFilter } from '../../utils/visibleFilter';

export const PopupFiltersComponent = ({
  openPopup,
  handleFilterPopup,
  popupFilters,
  calendario,
  dataDomandaTCB,
  handleContextState,
}) => {
  const notVisibleFilter = [labelCalendario, labelAnniEsperienza.workerType, labelTipologiaOrario, labelMadrelingua];
  return (

    <Row fluid margin="20px 0" justifycontent="space-between" alignitems="center" display="flex">

      {/** Componente di riepilogo per i filtri selezionati */}
      <Column md="12" padding="5px 5px 5px 0">
        <BorderTitle color="primary" textValue="Filtri di ricerca per abbinamento domanda">
          <Row fluid display="inline-flex" alignitems="center">
            <CheckboxWithBorder
              value={calendario}
              onChange={() => {
                if (calendario) {
                  handleFilterPopup(labelCalendario, undefined);
                } else {
                  handleFilterPopup(labelCalendario, convertBinToObject(dataDomandaTCB.calendario));
                }

                handleContextState('calendario', !calendario);
              }
              }
              label={labelCalendario}
              checkcolor="primary"
              spacing="0"
            />
            <StyledGroupChip>
              {Object.keys(popupFilters).map(key => {
                if (!notVisibleFilter.includes(key) && visibleFilter(popupFilters[key])) {
                  return (
                    <Chip
                      key={key}
                      color="grey"
                      spacing="0.1em"
                      value={key}
                      onClick={() => {
                        handleFilterPopup(key, undefined);
                      }}
                    />
                  );
                }
                return null;
              })
                }

            </StyledGroupChip>
          </Row>
        </BorderTitle>
        {dataDomandaTCB ? (
          <Modal
            open={openPopup}
            setOpenModal={() =>
              handleContextState('openPopup', false)
            }
            title={Header}
            superModal
            color="primary"
            fontSize="f6"
            width="90%"
            marginTop="3rem"
            mobileFullScreen
          >
            <Body />
          </Modal>
        )
          : null}
      </Column>
    </Row>

  );
};

const mapContextToProps = (context) => ({
  openPopup: context.contextState.openPopup,
  handleFilterPopup: context.handleFilterPopup,
  popupFilters: context.contextState.popupFilters,
  calendario: context.contextState.calendario,
  dataDomandaTCB: context.contextState.dataDomandaTCB,
  ricercaLavoratori: context.ricercaLavoratori,
  filtersTable: context.contextState.filtersTable,
  handleContextState: context.handleContextState,
});

PopupFiltersComponent.displayName = 'Chips dei filtri';

export const PopupFilters = connectContext(MatchingLavoratoreContext, mapContextToProps)(PopupFiltersComponent);
