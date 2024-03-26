import React from "react";
import { Row, Column } from "components/ui/Grid";
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import Text from 'components/ui/Text';
import { useFormContext } from "libs/Form/hooks/useFormContext";

const DisponibilitaGeneriche = ({ tata, colf, badante }) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <Row fluid margin="0">
      <Text
        value={colf ? 'Seleziona le voci che indicano cosa sei disponibile a fare' : 'Indica cosa sei disponibile a fare'}
        weight="bold"
        padding="0 0 1em 0"
      />
      {!colf ?
        <>
          <Row fluid>
            <Checkbox
              fontSize="f7"
              width="auto"
              checkcolor="primary"
              label={"Svegliarti di notte"}
              value={dataset.svegliarsiDiNotte.checked}
              onChange={isChecked => {
                const dataCopy = { ...dataset.svegliarsiDiNotte };
                dataCopy.checked = isChecked;
                setFormField("svegliarsiDiNotte", dataCopy);
              }}
            />
          </Row>
          <Row fluid>
            <Checkbox
              width="auto"
              fontSize="f7"
              checkcolor="primary"
              label={"Lavorare presso famiglie numerose"}
              value={dataset.lavorareInCasaDiFamiglieNumerose.checked}
              onChange={isChecked => {
                const dataCopy = { ...dataset.lavorareInCasaDiFamiglieNumerose };
                dataCopy.checked = isChecked;
                setFormField("lavorareInCasaDiFamiglieNumerose", dataCopy);
              }}
            />
          </Row>
        </>
        : null}
      {badante ?
        <>
          <Row fluid>
            <Checkbox
              width="auto"
              fontSize="f7"
              checkcolor="primary"
              label={"Occuparti di persone anziane che vivono in famiglia"}
              value={dataset.occuparsiDiAnziani.checked}
              onChange={isChecked => {
                const dataCopy = { ...dataset.occuparsiDiAnziani };
                dataCopy.checked = isChecked;
                setFormField("occuparsiDiAnziani", dataCopy);
              }}
            />
          </Row>
          <Row fluid>
            <Checkbox
              width="auto"
              fontSize="f7"
              checkcolor="primary"
              label={"Occuparti di coppie di anziani"}
              value={dataset.occuparsiDiCoppieDiAnziani.checked}
              onChange={isChecked => {
                const dataCopy = { ...dataset.occuparsiDiCoppieDiAnziani };
                dataCopy.checked = isChecked;
                setFormField("occuparsiDiCoppieDiAnziani", dataCopy);
              }}
            />
          </Row>
        </>
        : null}
      <Row fluid>
        <Checkbox
          fontSize="f7"
          width="auto"
          checkcolor="primary"
          label={"Lavorare in ambienti con animali domestici"}
          value={dataset.lavorareACasaConAnimali.checked}
          onChange={isChecked => {
            const dataCopy = { ...dataset.lavorareACasaConAnimali };
            dataCopy.checked = isChecked;
            setFormField("lavorareACasaConAnimali", dataCopy);
          }}
        />
      </Row>
      <Row fluid>
        <Checkbox
          width="auto"
          fontSize="f7"
          checkcolor="primary"
          label={"Prendersi cura degli animali domestici"}
          value={dataset.prendereCuraAnimali.checked}
          onChange={isChecked => {
            const dataCopy = { ...dataset.prendereCuraAnimali };
            dataCopy.checked = isChecked;
            setFormField("prendereCuraAnimali", dataCopy);
          }}
        />
      </Row>
      <Row fluid >
        <Checkbox
          width="auto"
          fontSize="f7"
          checkcolor="primary"
          label={"Fare straordinari"}
          value={dataset.straordinari.checked}
          onChange={isChecked => {
            const dataCopy = { ...dataset.straordinari };
            dataCopy.checked = isChecked;
            setFormField("straordinari", dataCopy);
          }}
        />
      </Row>
      <Row fluid>
        <Checkbox
          width="auto"
          fontSize="f7"
          checkcolor="primary"
          label={"Effettuare sostituzioni brevi"}
          value={dataset.sostituzioniBrevi && dataset.sostituzioniBrevi.checked}
          onChange={isChecked => {
            const dataCopy = { ...dataset.sostituzioniBrevi };
            dataCopy.checked = isChecked;
            setFormField("sostituzioniBrevi", dataCopy);
          }}
        />
      </Row>
      <Row fluid>
        <Checkbox
          width="auto"
          fontSize="f7"
          checkcolor="primary"
          label={"Effettuare sostituzioni lunghe"}
          value={dataset.sostituzioniLunghe && dataset.sostituzioniLunghe.checked}
          onChange={isChecked => {
            const dataCopy = { ...dataset.sostituzioniLunghe };
            dataCopy.checked = isChecked;
            setFormField("sostituzioniLunghe", dataCopy);
          }}
        />
      </Row>
    </Row>
  )
};

DisponibilitaGeneriche.displayName = 'DisponibilitaGeneriche';
export default DisponibilitaGeneriche;
