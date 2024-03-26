import React, { useEffect, useState } from 'react';
import Header from 'components/ui2/Header';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Checkbox from 'components/ui2/Checkbox';
import Text from 'components/ui/Text';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { convertBinToObject, convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import ColumnContainer from 'components/ui2/ColumnsContainer';
import {
  getCheckboxesTipologiaOrario,
  getCheckboxTipologiaOrario,
  setCheckboxTipologiaOrario,
  getCalendarValues,
  formatItems,
  getNameDisponibilitaOraria
} from '../disponibilitaLavoratoreUtils';
import DisponibilitaOrariaLavoratoreAccordion from './disponibilitaOrariaLavoratoreAccordion';
import {
  DominioTcbByTipoTcb as DominioTcbByTipoTcbQ,
  EstraiTipologieOrarioLavoratore as EstraiTipologieOrarioLavoratoreQ,
  EstraiDatiDisponibilitaOraria as EstraiDatiDisponibilitaOrariaQ,
  ConfermaDisponibilitaOrariaLavoratore as ConfermaDisponibilitaOrariaLavoratoreMutation,
} from '../disponibilitaLavoratoreGraphQL';
import FormDisponibilitaOrariaLavoratore from './partialsDisponibilitaOrariaLavoratore/FormDisponibilitaOrariaLavoratore';
import { attributo } from 'types/attributo';

const ContentColumn = styled(Column)`
  padding-top: 1.5em;
  ${media.lg`
      padding-right: 3em;
      padding-top: 0em;
      border-right: 2px solid ${colors.grey};
  `}
`;
ContentColumn.displayName = 'ContentColumn';

const CheckboxColumn = styled(Column)`
  line-height: 1.6em;
  ${media.md`
    line-height: inherit;
  `}
`;
CheckboxColumn.displayName = 'CheckboxColumn';

const ButtonColumn = styled(Column)`
  padding-bottom: 1.5em;
  border-bottom: 2px solid ${colors.grey};
  ${media.lg`
      padding-left: 3em;
      padding-bottom: 0em;
      border-bottom: none;
  `}
`;
ButtonColumn.displayName = 'ButtonColumn';

const CheckboxRow = styled(Row)`
  height: 7em;
  width: 100%;
  ${media.xs`
    height: 11em;
  `}
  ${media.xsm`
    height: 11em;
  `}
  ${media.sm`
    height: 11em;
  `}
  ${media.md`
    height: 7em;
  `}
  ${media.lg`
    height: 7em;
  `}
`;
CheckboxRow.displayName = 'CheckboxRow';

export const DisponibilitaOrariaLavoratoreTcb = ({
  disponibilitaOrariaData,
  setDisponibilitaOrariaData,
  blackList = [],
}) => {
  const performRequestDominioTcb = useStatelessGraphQLRequest(DominioTcbByTipoTcbQ);
  const performRequestTipologieOrarioLavoratore = useStatelessGraphQLRequest(EstraiTipologieOrarioLavoratoreQ);
  const performRequestDatiDisponibilitaOraria = useStatelessGraphQLRequest(EstraiDatiDisponibilitaOrariaQ);
  const performRequestConfermaDisponibilitaOrariaLavoratore = useStatelessGraphQLRequest(ConfermaDisponibilitaOrariaLavoratoreMutation);

  const [
    dominioTcbMezzaGiornataDiRiposo,
    performRequestDominioTcbMezzaGiornataDiRiposo,
  ] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    null,
    false,
    data => data.map(row => ({ id: row.value, value: row.textValue }))
  );

  const [items, setItems] = useState({
    mezzaGiornata: [],
    nrOreSettimanaliData: [],
    stipendioConvivente: [],
  });
  const [tipologieOrario, setTipologieOrario] = useState(null)
  const [formData, setFormData] = useState({
    checkboxesTipologiaOrario: {
      convivenza: { checked: false, value: null },
      convivenzaRidotta: { checked: false, value: null },
      fullTimePartTimeAOre: { checked: false, value: null },
      presenzaNotturna: { checked: false, value: null },
      weekend: { checked: false, value: null },
      assistenzaNotturna: { checked: false, value: null },
    },
    convivenza: {
      mezzaGiornataDiRiposo: [],
      stipendioMinimo: {},
      tipoSistemazione: []
    },
    presenzaNotturna: {
      calendarValues: [],
      stipendioMinimo: {}
    },
    convivenzaRidotta: {
      calendarValues: [],
      stipendioMinimo: {}
    },
    assistenzaNotturna: {
      calendarValues: [],
      stipendioMinimo: {}
    },
    nonConviventi: {
      oreMassime: [],
      calendarValues: [],
      stipendioMinimo: {}
    },
    weekend: {
      calendarValues: [],
      stipendioMinimo: {}
    },
  });

  useEffect(() => {
    const inputLavoratore = {
      input: {
        idServizioRiferimento: disponibilitaOrariaData.idServizioRiferimento,
      },
    };

    Promise.all([
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_ORARIO_LAVORO.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_FASCE_ORE_SETTIMANALI.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_MEZZA_GIORNATA_CONVIVENTE.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_STIPENDIO_CONVIVENTE.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_STIPENDIO_NON_CONVIVENTE.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_STIPENDIO_WEEKEND.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_SPAZI_CONVIVENTE.ty_dominio_tcb }),
      performRequestDominioTcb({ ty_dominio_tcb: attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.ty_dominio_tcb }),
      performRequestTipologieOrarioLavoratore(inputLavoratore),
      performRequestDatiDisponibilitaOraria(inputLavoratore),
    ]).then(([
      tipologieOrarioData,
      nrOreSettimanaliData,
      mezzaGiornata,
      stipendioConvivente,
      stipendioConvivenzaRidotta,
      stipendioNonConvivente,
      stipendioPresenzaNotturna,
      stipendioAssistenzaNotturna,
      stipendioWeekend,
      spaziConvivente,
      spaziConvivenzaRidotta,
      tipologieOrarioLavoratoreData,
      disponibilitaOrariaLavData
    ]) => {

      const tipologieOrarioLav = [
        ...tipologieOrarioLavoratoreData.tipologieOrarioOffertaServizio,
        ...tipologieOrarioLavoratoreData.tipologieOrarioCalendarioOffertaServizio.map(x => ({
          checked: x.checked,
          value: x.value,
        })),
      ];
      const findBlackList = blackList.find(blackListItem => blackListItem.service === disponibilitaOrariaData.idServizioRiferimento);

      const tipologieOrarioWhiteList = tipologieOrarioData.filter(x => {
        if (findBlackList) {
          if (findBlackList.domainBlackList.length === 0) {
            return true;
          }
          if (!findBlackList.domainBlackList.includes(x.value)) {
            return true;
          }
        } else {
          return true;
        }
        return false;
      });

      tipologieOrarioWhiteList.forEach(x => {
        const checkboxTipoOrarioChecked = tipologieOrarioLav.some(y => x.value === y.value);
        if (!checkboxTipoOrarioChecked) tipologieOrarioLav.push({ checked: false, value: x.value });
      });

      setTipologieOrario(tipologieOrarioWhiteList);

      tipologieOrarioLav.forEach(checkbox => onCheckboxTipologiaOrarioChecked(checkbox));

      const calendarValues = getCalendarValues(tipologieOrarioLavoratoreData.tipologieOrarioCalendarioOffertaServizio);

      let testoAltro= null;

      const convivenza = {
        mezzaGiornataDiRiposo: disponibilitaOrariaLavData.mezzaGiornataDiRiposo,
        stipendioMinimo: disponibilitaOrariaLavData.stipendioConvivente,
        tipoSistemazione: disponibilitaOrariaLavData.spaziConvivente?.map(el =>{ if(el.text){testoAltro= el.text} return el.id}),
        testoAltro 
      };
      
      testoAltro= null;
      const convivenzaRidotta = {
        calendarValues: convertBinToObject(calendarValues.convivenzaRidotta),
        stipendioMinimo: disponibilitaOrariaLavData.stipendioConvivenzaRidotta,
        tipoSistemazione: disponibilitaOrariaLavData.spaziConvivenzaRidotta?.map(el =>{ if(el.text){testoAltro= el.text} return el.id}),
        testoAltro
      };

      const nonConviventi = {
        calendarValues: convertBinToObject(calendarValues.fullTimePartTimeAOre),
        stipendioMinimo: disponibilitaOrariaLavData.stipendioNonConvivente,
        oreMassime: disponibilitaOrariaLavData.nrOreSettimanaliDisponibilita.map(el => el.id),
      };

      const presenzaNotturna = {
        calendarValues: convertBinToObject(calendarValues.presenzaNotturna),
        stipendioMinimo: disponibilitaOrariaLavData.stipendioPresenzaNotturna,
      };

      const assistenzaNotturna = {
        calendarValues: convertBinToObject(calendarValues.assistenzaNotturna),
        stipendioMinimo: disponibilitaOrariaLavData.stipendioAssistenzaNotturna,
      };

      const weekend = {
        calendarValues: convertBinToObject(calendarValues.weekend),
        stipendioMinimo: disponibilitaOrariaLavData.stipendioWeekend,
      }
      const tipologieOrarioLavSort= tipologieOrarioLav.sort((a,b) => a.value - b.value);

      setFormData({
        checkboxesTipologiaOrario: getCheckboxesTipologiaOrario(tipologieOrarioLavSort),
        convivenza,
        presenzaNotturna,
        convivenzaRidotta,
        assistenzaNotturna,
        nonConviventi,
        weekend,
      });

      mezzaGiornata = formatItems(mezzaGiornata);
      stipendioConvivente = formatItems(stipendioConvivente);
      spaziConvivente = formatItems(spaziConvivente);
      nrOreSettimanaliData = formatItems(nrOreSettimanaliData);
      stipendioConvivenzaRidotta = formatItems(stipendioConvivenzaRidotta);
      stipendioNonConvivente = formatItems(stipendioNonConvivente);
      spaziConvivenzaRidotta = formatItems(spaziConvivenzaRidotta);
      stipendioPresenzaNotturna = formatItems(stipendioPresenzaNotturna);
      stipendioAssistenzaNotturna = formatItems(stipendioAssistenzaNotturna);
      stipendioWeekend = formatItems(stipendioWeekend);

      setItems({
        nrOreSettimanali: nrOreSettimanaliData,
        stipendioConvivente,
        stipendioConvivenzaRidotta,
        stipendioNonConvivente,
        stipendioPresenzaNotturna,
        stipendioAssistenzaNotturna,
        stipendioWeekend,
        mezzaGiornata,
        spaziConvivente,
        spaziConvivenzaRidotta
      });
    });
  }, []);

  const handleClickAnnullaModifiche = () => {
    setDisponibilitaOrariaData({
      show: false,
    });
  };

  const formatterCalendarToSave = () => {
    const formDataKeys = Object.keys(formData);
    const formDataCopy= formData;

    formDataKeys.map(el => {
      formDataCopy[el].calendarValues = convertObjectToBin(formDataCopy[el].calendarValues);
    });

    setFormData(formDataCopy);
  };

  const handleClickConfermaDisponibilita = () => {
    const checkboxesTipologiaOrarioChecked = Object.values(formData.checkboxesTipologiaOrario)
      .filter(x => x.checked === true)
      .map(x => x.value);

    const checkboxesTipologiaOrarioUnchecked = Object.values(formData.checkboxesTipologiaOrario)
      .filter(x => x.checked === false)
      .map(x => x.value);

    formatterCalendarToSave();

    performRequestConfermaDisponibilitaOrariaLavoratore({
      input: {
        idServizioRiferimento: disponibilitaOrariaData.idServizioRiferimento,
        checkboxesTipologiaOrarioChecked,
        checkboxesTipologiaOrarioUnchecked,
        ...formData
      },
    }).then(result => {
      if (result) {
        setDisponibilitaOrariaData({
          show: false,
        });
      }
    });
  };

  const handleChangeForm = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  const onCheckboxTipologiaOrarioChecked = (checkbox) => {
    if (checkbox.checked) {
      switch (checkbox.value) {
        case 1:
          performRequestDominioTcbMezzaGiornataDiRiposo({
            ty_dominio_tcb: 15,
          });
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          break;
        default:
          break;
      }
    }
  };

  const checkboxesTipologiaOrarioKey = Object.keys(formData.checkboxesTipologiaOrario);

  return (
    <Row fluid justifycontent="space-between" padding="0 0 5em 0">
      <Header
        fontSize="f4"
        title={`Modifica le tue disponibilità come ${disponibilitaOrariaData.servizio}`}
        color="blue"
      />
      <ButtonColumn
        xs="12"
        lg="4"
        padding="0"
        order={{ lg: 2 }}
        tagName="aside"
      >
        <Row fluid padding="0 1em 0 1em">
          <Row fluid lg="5" padding="0 0 1em 0">
            <Button
              type="button"
              color="blue"
              fontSize="f7"
              label="Salva le modifiche"
              onClick={handleClickConfermaDisponibilita}
            />
          </Row>
          <Row fluid lg="5">
            <Button
              type="button"
              color="red"
              fontSize="f7"
              label="Annulla"
              onClick={handleClickAnnullaModifiche}
            />
          </Row>
        </Row>
      </ButtonColumn>
      <ContentColumn
        xs="12"
        lg="8"
        padding="0"
        order={{ lg: 1 }}
        tagName="section"
      >
        <Row fluid>
          <Text
            value="PER QUALE TIPOLOGIA DI ORARIO VUOI DARE LA TUA DISPONIBILITÀ?"
            size="f7"
            color="primary"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
          />
          <Row fluid margin="1em 0 0 0">
            <ColumnContainer xsCount={1} smCount={2} width="100%">
              {tipologieOrario?.map((orario, index) => {
                const checkboxValueLavoratore = getCheckboxTipologiaOrario(
                  formData.checkboxesTipologiaOrario,
                  orario
                );

                return (
                  <CheckboxColumn xs="12" padding="0" key={index.toString()}>
                    <Checkbox
                      style={{ flex: '45%', width: 'fit-content' }}
                      fontSize="f7"
                      checkcolor="primary"
                      label={orario.textValue}
                      value={checkboxValueLavoratore && checkboxValueLavoratore.checked}
                      onChange={isChecked => {
                        const checkboxesData = setCheckboxTipologiaOrario(
                          { ...formData.checkboxesTipologiaOrario },
                          checkboxValueLavoratore,
                          isChecked
                        );

                        setFormData({
                          ...formData,
                          checkboxesTipologiaOrario: checkboxesData,
                        });

                        onCheckboxTipologiaOrarioChecked({
                          checked: isChecked,
                          value: checkboxValueLavoratore.value,
                        });
                      }}
                    />
                  </CheckboxColumn>
                );
              })}
            </ColumnContainer>
          </Row>
        </Row>
        {
          checkboxesTipologiaOrarioKey.map(el => (
            formData.checkboxesTipologiaOrario[el]?.checked ?
              <DisponibilitaOrariaLavoratoreAccordion
                textTipologiaOrario={getNameDisponibilitaOraria(formData.checkboxesTipologiaOrario[el].value)}
                paddingWrapper="1em 2em"
              >
                <FormDisponibilitaOrariaLavoratore
                  valueDisponibilita={formData.checkboxesTipologiaOrario[el].value}
                  handleChangeForm={handleChangeForm}
                  formData={formData}
                  items={items}
                />
              </DisponibilitaOrariaLavoratoreAccordion>
              : null
          ))
        }
      </ContentColumn>
    </Row>
  );
};

DisponibilitaOrariaLavoratoreTcb.displayName = 'DisponibilitaOrariaLavoratoreTcb';
export default DisponibilitaOrariaLavoratoreTcb;