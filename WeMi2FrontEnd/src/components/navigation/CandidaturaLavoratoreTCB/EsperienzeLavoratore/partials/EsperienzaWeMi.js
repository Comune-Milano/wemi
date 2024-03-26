/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import TextArea from 'components/ui2/TextArea';
import media from 'utils/media-queries';
import Button from 'components/ui2/Button';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import DatePicker from 'components/ui2/DatePicker';
import Input from 'components/ui2/Input';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import FaIcon from 'components/ui2/FaIcon';
import moment from 'moment';
import Checkbox from 'components/ui2/Checkbox';
import { useLogger } from 'services/Logger';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { createArrayConfig } from '../createArrayConfig';
import {
  inizializzaEsperienza as inizializzaEsperienzaM,
} from './graphQLEsperienzeLavoratore';


const Wrapper = styled(Row)`
    padding: 1.5em;
    background-color: ${colors.greyInput};
`;

const RightColumn = styled(Column)`
    ${media.md`
        border-left: 2px solid ${colors.darkGrey};
    `} 
`;

const StyledColumn = styled(Column)`
  padding: 0 0 1em;
    ${media.md`
        &:first-child {
          padding-right: 1em;
        }
        &:nth-child(2) {
          padding-left: 1em;
        }
    `} 
`;

const EsperienzaWeMi = ({
  idLavoratore,
  serviziTCBCheckbox,
  idOperatore,
}) => {
  const logger = useLogger();
  const checkBoxAltro = { id: 4, label: 'Altro' };
  const serviziCheckbox = [...serviziTCBCheckbox, checkBoxAltro];

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur } = useFormContext();
  const [datiSalvati, setDatiSalvati] = useState(false);

  const handleCheckServizi = (id) => {
    if (dataset.serviziPrestati.includes(id)) {
      return dataset.serviziPrestati.filter(el => el !== id);
    }
    if (id === checkBoxAltro.id) {
      const arrayNuovo = [];
      arrayNuovo.push(id);
      return arrayNuovo;
    }
    return dataset.serviziPrestati.concat(id);
  };


  const inserisciModificaFamigliaMutation = useStatelessGraphQLRequest(
    inizializzaEsperienzaM
  );


  const inserisciModificaFamiglia = async () => {
    try {
      const arrConf = createArrayConfig(dataset, dataset.nome);
      const response = await inserisciModificaFamigliaMutation({
        input: {
          idRichiesta: !dataset.new ? dataset.id : undefined,
          idUtenteLav: idLavoratore,
          serviziPrestati: dataset.serviziPrestati,
          inizioPeriodo: moment(dataset.inizioPeriodo, 'DD/MM/YYYY').isValid() ?
            moment(dataset.inizioPeriodo, 'DD/MM/YYYY').format('YYYY-MM-DD') :
            null,
          finePeriodo: dataset.inCorsoFlag ? '9999-12-31' :
            moment(dataset.finePeriodo, 'DD/MM/YYYY').isValid() ?
              moment(dataset.finePeriodo, 'DD/MM/YYYY').format('YYYY-MM-DD') :
              null,
          descrizioneEsp: !dataset.serviziPrestati.includes(-1) ? dataset.descrizioneEsp : undefined,
          arrayAttrFamiglia: arrConf,
        },
      });
      if (response) {
        setDatiSalvati(true);
        setTimeout(() => setDatiSalvati(false), 2000);
      }
      if (dataset.new) {
        setFormField('id', response.inizializzaModificaEsperienzeLavoratore);
        setFormField('new', false);
      }
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Wrapper justifycontent="space-between">
      <Column xs="12" md="3" padding="0" sizepadding={{ md: '0 1em 0 0' }}>
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label="Posizioni lavorative:"
            required
          />
          <Row fluid margin="0" direction="column">
            {serviziCheckbox.map(el => (
              <Row fluid key={`Servizi_${el.id}`}>
                <Checkbox
                  disabled
                  value={dataset.serviziPrestati.length && dataset.serviziPrestati.includes(el.id)}
                  onChange={() => {
                    setFormField('serviziPrestati', handleCheckServizi(el.id));
                  }}
                  label={el.label}
                  checkcolor="primary"
                  width="auto"
                />
              </Row>
            ))}
          </Row>
          {dataset.serviziPrestati.includes(checkBoxAltro.id) ? (
            <Input
              name="tipologia-servizio"
              placeholder="“Posizione / qualifica”"
              onChange={(value) => setFormField('tipologiaServizio', value)}
              inputValue={dataset.tipologiaServizio}
            />
          )
            : null}
        </Row>
      </Column>
      <RightColumn xs="12" md="9" padding="2rem 0 0 0" sizepadding={{ md: '0 0 0 1.5rem' }}>
        <Row fluid margin="0 0 1em" justifycontent="flex-start">
          <Checkbox
            value={dataset.inCorsoFlag}
            onChange={(value) => {
              setFormField('inCorsoFlag', value);
              setFormField('finePeriodo', null);
            }}
            label="in corso"
            checkcolor="primary"
            width="auto"
          />
        </Row>
        <Row fluid margin="0 0 1em" justifycontent="space-between">
          <StyledColumn md="6">
            <FieldTitle
              label="Inizio periodo"
              marginBottom="0"
              required
            />
            <DatePicker
              required
              onBlur={() => handleFieldBlur('inizioPeriodo')}
              onChange={(day) => {
                setFormField('inizioPeriodo', day);
              }}
              disabledDays={(date) => dataset.finePeriodo ? date > dataset.finePeriodo
                : false}
              selectedDate={dataset.inizioPeriodo}
              error={touched.inizioPeriodo && errors.inizioPeriodo}
            />
          </StyledColumn>
          <StyledColumn md="6">
            <FieldTitle
              label="Fine periodo"
              marginBottom="0"
              required={!dataset.inCorsoFlag}
            />
            <DatePicker
              required={!dataset.inCorsoFlag}
              disabled={dataset && dataset.inCorsoFlag}
              onBlur={() => handleFieldBlur('finePeriodo')}
              onChange={(day) => {
                setFormField('finePeriodo', day);
              }}
              disabledDays={(date) => dataset.inizioPeriodo ? date < dataset.inizioPeriodo
                : false}
              selectedDate={dataset.finePeriodo}
              error={dataset.inCorsoFlag !== true && touched.finePeriodo ? errors.finePeriodo : null}
            />
          </StyledColumn>
        </Row>

        <Row fluid margin="0 0 1em">
          <StyledColumn md="6">
            <FieldTitle
              label="Comune sede di lavoro"
              marginBottom="0"
              required
            />
            <Input
              onChange={(value) => setFormField('sedeLavoroComune', value)}
              onBlur={() => handleFieldBlur('sedeLavoroComune')}
              placeholder="Es. Milano"
              inputValue={dataset.sedeLavoroComune}
              error={touched.sedeLavoroComune && errors.sedeLavoroComune}
            />
          </StyledColumn>
          <StyledColumn md="6">
            <FieldTitle
              label="Provincia sede di lavoro"
              marginBottom="0"
            />
            <Input
              onChange={(value) => setFormField('sedeLavoroProvincia', value)}
              onBlur={() => handleFieldBlur('sedeLavoroProvincia')}
              placeholder="Es. MI"
              inputValue={dataset.sedeLavoroProvincia}
              error={touched.sedeLavoroProvincia && errors.sedeLavoroProvincia}
            />
          </StyledColumn>
        </Row>
        <Row fluid>
          <StyledColumn md="6">
            <FieldTitle
              label="E-mail per referenze"
              marginBottom="0"
            />
            <Input
              onChange={(value) => setFormField('emailFamiglia', value)}
              onBlur={() => handleFieldBlur('emailFamiglia')}
              placeholder="Inserisci un indirizzo e-mail..."
              inputValue={dataset.emailFamiglia}
              error={touched.emailFamiglia && errors.emailFamiglia}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </StyledColumn>
          <StyledColumn md="6">
            <FieldTitle
              label="Telefono per referenze"
              marginBottom="0"
            />
            <Input
              onChange={(value) => setFormField('telefonoFamiglia', value)}
              onBlur={() => handleFieldBlur('telefonoFamiglia')}
              placeholder="Inserisci un numero di telefono..."
              inputValue={dataset.telefonoFamiglia}
              error={touched.telefonoFamiglia && errors.telefonoFamiglia}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </StyledColumn>
        </Row>
      </RightColumn>

      <Column xs="12" padding="0">
        <Row fluid margin="2em 0 0 0">
          <FieldTitle
            label="Descrizione esperienza"
            marginBottom="0"
            required
          />
          <TextArea
            onChange={(value) => setFormField('descrizioneEsp', value)}
            onBlur={() => handleFieldBlur('descrizioneEsp')}
            placeholder="Descrivere la famiglia e/o l'azienda in cui si è lavorato e le mansioni svolte"
            inputValue={dataset.descrizioneEsp}
            maxLength={STRING_MAX_VALIDATION.value}
            name="descrizioneEsp"
            rows={3}
          />
        </Row>
        <Row fluid justifycontent="flex-end" alignitems="center" margin="2em 0 0 0">
          {datiSalvati ? (
            <div style={{ padding: '0 1em 0 0' }}>
              <FaIcon
                icon="check"
                color="primary"
                fontSize="f5"
              />
            </div>
          )
            : null}
          <Button
            type="submit"
            disabled={!isFormValid}
            autowidth
            label="Salva modifiche"
            color="primary"
            size="f7"
            weight="bold"
            margin="0 1em 0 0"
            onClick={() => inserisciModificaFamiglia()}
          />
        </Row>
      </Column>
    </Wrapper>
  );
};

EsperienzaWeMi.displayName = 'EsperienzaWeMi';

export default EsperienzaWeMi;
