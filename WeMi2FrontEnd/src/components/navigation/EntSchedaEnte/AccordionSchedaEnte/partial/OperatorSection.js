import React, { useState } from 'react';
import Accordion from 'components/ui/Accordion';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import Button from 'components/ui2/Button';
import Chip from 'components/ui/Chip';
import styled from 'styled-components';
import Tooltip from 'components/ui/Tooltip';
import FaIcon from 'components/ui/FaIcon';
import { AddParameters } from 'redux-modules/actions/goi003Actions';
import { connect } from 'react-redux';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import AccordionBodyWrapper from './AccordionBodyWrapper';

const MyRow = styled(Row)`
cursor: pointer;
`;

const MyDiv = styled.div`
display: flex;
`;

const MyTooltip = styled(Tooltip)`
padding-left: 5px;
`;

const OperatorSection = ({
    Data,
    FlagEnte,
    CatchNotes,
    Key,
    id,
    stato,
    ruolo,
    disabilitaModificaCampi,
    AddParameters,
    goi003,
    usersCollegatiEnte,
    userProfile,
    disableNotes,
  }) => {
  const [email, setEmail] = useState();
  const [errore, setErrore] = useState('');
  const [refresh, setRefresh] = useState(false);
  const isAmministratore = checkAdmin(userProfile.datiLogin);
  const elimina = (operatore) => {
    const arr = [];
    let eliminare = [];
    if (!isNullOrUndefined(goi003.eliminaUsers)) {
      eliminare = goi003.eliminaUsers;
    }
    goi003.operatori.map((el) => {
      if (el.email !== operatore.email && el.email !== operatore) {
        arr.push(el);
      } else {
        eliminare.push(el);
      }
    });
    AddParameters({ ...goi003, operatori: arr, eliminaUsers: eliminare });
  };
  const controlloInput = (inputValue) => {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ig;
    return regex.test(inputValue);
  };
  return (
    <Accordion
      headerBgColorOpen="blue"
      headerBgColor="grey"
      maxHeight="none"
      headerColorOpen="white"
      headerColor="blue"
      arrowOpenColor="white"
      arrowClosedColor="blue"
      arrowSize="f1"
      headerPadding="0.75rem 1.25rem"
      aperto={false}
      AccordionHeader={() => (
        <Text weight="bold" value={Data.titolo} intlFormatter size="f4" />
          )}
      children={(
        <>
          <AccordionBodyWrapper>
            {!disabilitaModificaCampi ? (
              <Row division={12}>
                <Column lg="6">
                  <Input
                    material
                    intlLabel={(
                        <MyDiv>
                        Email operatore
                          </MyDiv>
                    )}
                    color={errore ? 'red' : 'blue'}
                    inputValue={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        if (!controlloInput(event.target.value)) {
                            setErrore('Devi inserire un formato email valido');
                          } else {
                            setErrore('');
                          }
                      }}
                  />
                  {errore && <Text value={errore} size="f9" color="red"></Text>}
                </Column>
                <Column lg="2">
                  <Button
                    label="Aggiungi"
                    name="aggiungi-operatore"
                    color="blue"
                    disabled={(!controlloInput(email) || errore || errore.length)}
                    onClick={() => {
                        if (!email) {
                            setErrore('Impossibile inserire un email vuota');
                          } else {
                            let presente = false;
                            Data.listaOperatori.map((operatore) => {
                              if (operatore.toLowerCase() == email.toLowerCase()) {
                              presente = true;
                            }
                            });
                            if (!presente) {
                              Data.listaOperatori.push(email);
                              let arr = [];
                              if (goi003.operatori.length > 0) {
                              arr = goi003.operatori;
                            }
                               // Key.operatori.push({'userName':username ,'idEnte':id })
                              arr.push({ email: email, idEnte: id });
                              AddParameters({ ...goi003, operatori: arr });
                              setEmail('');
                              setErrore(null);
                            } else {
                              setErrore(true);
                            }
                          }
                      }
                    }
                  />
                </Column>
              </Row>
              )
              : null
              }
            <Row fluid padding="0 20px">
              {goi003 &&
                   goi003.operatori ?
                    goi003.operatori.map((operatore, index) => (
                      <MyRow key={index} padding="1.5rem">
                        <Chip
                          width="auto"
                          size="f7"
                          margin="0 2em 1em 0"
                          value={operatore.email}
                          removeChip={
                              !disabilitaModificaCampi ?
                              () => {
                                Data.listaOperatori = Data.listaOperatori.filter(o => o !== operatore.email);
                                elimina(operatore);
                                setRefresh(!refresh);
                              }
                              : null
                          }
                        >
                        </Chip>
                      </MyRow>
                          ))
                        : null}
            </Row>

            <Row division={12}>
              <Column lg="12">
                {
                    isAmministratore || Data.note ? (
                      <TextArea
                        material
                        id="note2"
                        name="Indicazioni della redazione WeMi"
                        preserveLineBreaks
                        backgroundColor="yellow"
                        disabledBackgroundColor="yellow"
                        initialValue={Data.note}
                        readOnly={disableNotes ? 'true' : 'false'}
                        getValue={(value) =>
                        // Data.note = value.value
                        CatchNotes(value)}
                      >
                      </TextArea>
                  )
                    : null
                  }
              </Column>
            </Row>
          </AccordionBodyWrapper>
        </>
          )}
    />
  );
};

const mapStoreToProps = (store) => ({
  goi003: store.goi003,
  usersCollegatiEnte: store.graphql.usersCollegatiEnte,
});
const mapDispatchToProps = ({
  AddParameters,
});
export default withAuthentication(connect(mapStoreToProps, mapDispatchToProps)(OperatorSection));
