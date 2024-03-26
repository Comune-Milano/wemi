import React, { useState, useEffect } from 'react'
import Accordion from 'components/ui/Accordion'
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea'
import TextArea2 from 'components/ui2/TextArea'
import FaIcon from 'components/ui/FaIcon'
import Tooltip from 'components/ui/Tooltip'
import AccordionBodyWrapper from './AccordionBodyWrapper'
import { AddParameters } from 'redux-modules/actions/goi003Actions';
import { connect } from 'react-redux';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { convertObjectToIntervals } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import Calendar from 'components/ui2/WeekCalendarTimePicker';

const ReperibilitaSection = ({
  Data,
  redux_sede,
  AddParameters,
  setControllo,
  controllo,
  FlagEnte,
  CatchNotes,
  Key,
  stato,
  ruolo,
  disabilitaPerSalvare,
  userProfile,
  disabilitaModificaCampi,
  disableNotes,
}) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);
  const [erroreEmail, setErroreEmail] = useState(false)
  const [erroreTelefono, setErroreTelefono] = useState(false)
  const [notaCittadino, setNotaCittadino] = useState(Key.notePerCittadino);
  const [effectUsed, setEffectUsed] = useState(false)
  const [reperibilitaValues, setReperibilitaValues] = useState(Data.disponibilitaDiContatto);

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
        <div>
          <div>
            <Text weight="bold" value={Data.titolo} intlFormatter size="f4" />
          </div>
          <div>
            <Text value={Data.sottotitolo1} intlFormatter size="f8" />
          </div>
          <div>
            <Text value={Data.sottotitolo2} intlFormatter size="f8" />
          </div>
        </div>
      )}

      children={
        <AccordionBodyWrapper>
          <Row>
            <Column lg="6">
              <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[0].label}
                right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
              <Input material
                initialValue={Data && Data.telefono ? Data.telefono : ''}
                required
                disabled={disabilitaModificaCampi}
                intlLabel='Telefono '
                color={erroreTelefono ? "red" : "primary"}
                onBlur={(event) => {
                  setControllo(!controllo)
                  setErroreTelefono(event.target.value == "")
                  Data.telefono = event.target.value;
                  Key.js_primo_contatto.txTelefono = event.target.value
                }}
              />
              {erroreTelefono && <Text value={"Telefono richiesto"} size="f9" color="red"></Text>}
            </Column>

            <Column lg="6">
              <Tooltip component={FaIcon} restComp={{ icon: '\f059', fontSize: 'f7' }} textTT={Data.tooltip[1].label}
                right color="white" bgcolor="primary" style={{ padding: '0', margin: '0' }} />
              <Input material
                initialValue={Data && Data.email ? Data.email : ''}
                required

                intlLabel='Mail '
                color={erroreEmail ? "red" : "primary"}
                disabled={disabilitaModificaCampi}
                onBlur={(event) => {
                  setControllo(!controllo)
                  setErroreEmail(event.target.value == "")
                  Data.email = event.target.value;
                  Key.js_primo_contatto.txEmail = event.target.value

                }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Calendar
                disabled={disabilitaModificaCampi}
                onChange={(day) => {
                  setReperibilitaValues(oldState => {
                    const newState = {
                      ...oldState,
                      ...day,
                    };
                    AddParameters({
                      ...redux_sede,
                      disponibilitaDiContatto: newState,
                    });
                    return newState;
                  })
                }}
                calendar={reperibilitaValues}
                maxIntervals={2}
                hideRadio
              />
            </Column>
          </Row>
          <Column lg="12">
            <TextArea2
              id='note9'
              name="Note"
              label="Note"
              color="primary"
              readOnly={disabilitaModificaCampi ? true : false}
              inputValue={notaCittadino}
              onChange={(value) => { setNotaCittadino(value) ; Key.notePerCittadino = value }}
            />
          </Column>

          <Column lg="12">
            {
              isAmministratore || Data.note ?
                <TextArea material
                  preserveLineBreaks
                  backgroundColor="yellow"
                  disabledBackgroundColor="yellow"
                  id='note8'
                  name="Indicazioni della redazione WeMi"
                  initialValue={Data.note}
                  readOnly={disableNotes ? 'true' : 'false'}
                  getValue={(value) => { CatchNotes(value) }}
                />
                : null
            }
          </Column>

        </AccordionBodyWrapper>
      }
    />
  )
}
const mapStoreToProps = (store) => ({
  redux_sede: store.goi003
})
const mapDispatchToProps = ({
  AddParameters
})
export default withAuthentication(connect(mapStoreToProps, mapDispatchToProps)(ReperibilitaSection))