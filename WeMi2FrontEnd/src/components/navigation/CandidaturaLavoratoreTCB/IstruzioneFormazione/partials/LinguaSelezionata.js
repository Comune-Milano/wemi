import React, { useState, useEffect } from 'react'
import { Row, Column } from 'components/ui/Grid';
import Rating from 'components/ui2/Rating';
import styled from "styled-components";
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import media from "utils/media-queries";
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useLogger } from 'services/Logger';
import FaIcon from 'components/ui2/FaIcon';
import { codiciAttributo } from '../../constants/CodiciAttributo';
import RadioGroup from 'components/ui2/RadioGroup';
import {
  inserisciLingueEstereIstruzioneFormazione as inserisciLingueEstereIstruzioneFormazioneQ,
  deleteLingueEstereIstruzioneFormazione as deleteLingueEstereIstruzioneFormazioneQ,
  inserisciItalianoIstruzioneFormazione as inserisciItalianoIstruzioneFormazioneQ
} from '../IstruzioneFormazioneGraphQL';
import Checkbox from 'components/ui2/Checkbox';

const Contenitore = styled(Column)`
  background-color : #ECECEC;
`;

const ButtonsRow = styled(Row)`
    justify-content: flex-end;
    ${media.xs`
    justify-content: center;
    `}
    ${media.sm`
     justify-content: flex-end;
    `}
    ${media.md`
     justify-content: flex-end;
     `}
    ${media.lg`
     justify-content: flex-end;
     `}
`;
const CursorColumn = styled(Column)`
cursor: pointer;
`;

const LinguaSelezionata = ({
  elemento,
  dataset,
  setFormField,
  idLavoratore,
  italiano,
}) => {
  const logger = useLogger();
  const [check, setCheck] = useState(false);
  const [input, setInput] = useState();
  const [response, setResponse] = useState(false);
  const [vediIcon, setVediIcon] = useState(false);
  const [vediDati, setVediDati] = useState(true);
  const [corsiItaliano, setCorsiItaliano] = useState(false);
  const [disableToRequest, setDisableToRequest] = useState(false);
  const inserisciDati = useStatelessGraphQLRequest(inserisciLingueEstereIstruzioneFormazioneQ);
  const inserisciDatiItaliano = useStatelessGraphQLRequest(inserisciItalianoIstruzioneFormazioneQ);

  const eliminaDati = useStatelessGraphQLRequest(deleteLingueEstereIstruzioneFormazioneQ);

  useEffect(() => {
    if (elemento.inizializzazione) {
      setResponse(true);
      if (italiano) {
        setFormField('checkItaliano', true);
      };
      if (parseInt(elemento.inizializzazione, 10) === 6) {
        setCheck({
          id: 1,
          label: 'Madrelingua',
        });
      } else {
        setInput(elemento.inizializzazione);
        setCheck({
          id: 2,
          label: 'Non madrelingua',
        });
        if (elemento.valoreCorsi) {
          setCorsiItaliano(elemento.valoreCorsi);
        }
      }
    }
  }, []);
  const disableSalva = () => {
    if (italiano) {
      return check && check.id === 1 ? false : input && input !== 0 ? false : !corsiItaliano;
    }
    return check && check.id === 1 ? false : input && input !== 0 ? false : true;
  };
  const Salva = async () => {
    setDisableToRequest(true);
    const cdAttributo = codiciAttributo.LIV_LINGUE_CONOSCIUTE;
    const cdValAttributo = elemento.cdDominio;
    const livelloConoscenzaLingua = check && check.id === 1 ? 6 : input;
    try {
      const res = await inserisciDati(
        {
          input: {
            idUtente: idLavoratore,
            cdAttributo,
            cdValAttributo,
            livelloConoscenzaLingua,
            altro: elemento.cdDominio === 0 ? elemento.nome : null,
          },
        }
      );
      setVediIcon(true);
      setResponse(res);
      setTimeout(() => setVediIcon(false), 2000);
    } catch (error) {
      logger.log("Errore nell' inserimento della richiesta");
      setResponse(false);
    }
    setDisableToRequest(false);
  };

  const SalvaItaliano = async () => {

    setDisableToRequest(true);
    const cdAttributoConoscenzaItaliano = codiciAttributo.LIV_CONOSCENZA_ITALIANO;
    const livelloConoscenzaItaliano = check && check.id === 1 ? 6 : input;
    const cdAttributoCorsiItaliano = codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_DI_ITALIANO;
    const corsiItalianoSave = check && check.id === 1 ? false : corsiItaliano;
    
    try {
      const res = await inserisciDatiItaliano(
        {
          input: {
            idUtente: idLavoratore,
            cdAttributoConoscenzaItaliano,
            livelloConoscenzaItaliano,
            cdAttributoCorsiItaliano,
            corsiItaliano: corsiItalianoSave,
          },
        }
      );
      setResponse(res);

      setVediIcon(true);

      if (italiano && (livelloConoscenzaItaliano !== 0 && check && check.id === 2)) {
        setFormField('checkItaliano', true);
      } else {
        if (italiano && check && check.id === 1) {
          setFormField('checkItaliano', true);
        } else {
          setFormField('checkItaliano', false);
        }
      };

      setTimeout(() => setVediIcon(false), 2000);

    } catch (error) {
      logger.log("Errore nell' inserimento della richiesta");
      setResponse(false);
    }
    setDisableToRequest(false);
  };

  const elimina = async () => {
    if (response) {
      const cdAttributo = codiciAttributo.LIV_LINGUE_CONOSCIUTE;
      const cdValAttributo = elemento.cdDominio;

      await eliminaDati(
        {
          input: {
            idUtente: idLavoratore,
            cdAttributo,
            cdValAttributo,
          },
        }
      );
    }

    const arr= dataset.arrayLingue.filter((ele) => ele.cdDominio !== elemento.cdDominio);
    setFormField('arrayLingue', arr);
  };

  const RadioItems = [
    {
      id: 1,
      label: 'Madrelingua',
    },
    {
      id: 2,
      label: 'Non madrelingua',
    },
  ];

  return (
    <Row fluid margin="1em 0 1em 0">
      <CursorColumn fluid margin="0 0 1em 0" md="4" lg="4" sx="5" sm="5">
        <FaIcon
          fontSize="f7"
          icon={!vediDati ? "fas fa-angle-right" : "fas fa-angle-down"}
          padding="0.3em 1em 0 0"
          color="primary"
          onClick={() => setVediDati(!vediDati)}
        />
        <Text
          size="f7"
          weight="bold"
          color="primary"
          value={elemento.nome}
          onClick={() => setVediDati(!vediDati)}
        />
      </CursorColumn>
      {vediDati &&
        <Contenitore lg="10" md="9" padding="0">
          <Row fluid padding="1.5em">
            <Row fluid>
              <RadioGroup
                radioItems={RadioItems}
                selectedItem={check}
                onChange={(value) => {
                  setCheck(value);
                  setInput(0);
                }}
                fontSize="f7"
                checkcolor="primary"
                display="inline-grid"
              />
            </Row>
            {!check || (check && check.id !== 1) &&
              <>
                <Row fluid margin="2em 0 0.3em 0">
                  <Text
                    size="f7"
                    value="Valuta il tuo livello di conoscenza della lingua"
                  />
                </Row>
                <Row fluid>
                  <Rating
                    fontSize="f6"
                    color="primary"
                    onClick={(value) => { setInput(value) }}
                    stars={input}
                    border={true}
                    spacingRight="0.2em"
                  />
                </Row>
                {italiano &&
                  <Row fluid margin="2em 0 0 0">
                    <Checkbox
                      value={corsiItaliano}
                      onChange={(value) => { setCorsiItaliano(value) }}
                      label="Interesse a frequentare corsi in italiano"
                      checkcolor="primary"
                    />
                  </Row>}
              </>
            }
            <ButtonsRow fluid margin="1.3em 0 0 0">
              {vediIcon &&
                (
                  <FaIcon
                    fontSize="f6"
                    padding="0.5em 1em 0 0"
                    role="checkbox"
                    icon="check"
                    color="primary"
                  />
                )
              }
              <Button
                type="submit"
                disabled={disableSalva() || disableToRequest}
                autowidth
                label="Salva modifiche"
                color="primary"
                size="f7"
                weight="bold"
                margin="0 1em 0 0"
                onClick={() => {
                  if (italiano) {
                    SalvaItaliano();
                  } else {
                    Salva();
                  }
                }}
              />
              {!italiano &&
                <Button
                  autowidth
                  disabled={false}
                  label="Rimuovi"
                  color="red"
                  weight="bold"
                  size="f7"
                  onClick={() => {
                    elimina();
                  }}
                />
              }
            </ButtonsRow>
          </Row>
        </Contenitore>}
    </Row>
  );
};

LinguaSelezionata.displayName = 'LinguaSelezionata';

export default (LinguaSelezionata);
