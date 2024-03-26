import React from "react";
import { Row } from "components/ui/Grid";
import Text from "components/ui/Text";
import RadioGroup from "components/ui2/RadioGroup";
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from "types/tcbConstants";
import { useFormContext } from "libs/Form/hooks/useFormContext";

const PreferenzeGenere = ({tata}) => {

  const { dataset, setFormField, errors, isFormValid, touched, handleFieldBlur, isFormDirty } = useFormContext();

  return (
    <>
      <Row fluid>
        <Text
          padding={"0 0 1em 0"}
          value={`Preferisci ${tata ?
            'prenderti cura di bambini o bambine' :
            'assistere uomini o donne'}?`}
          weight="bold"
        />
        <Row fluid>
          <RadioGroup
            radioItems={dataset.preferenzeGenereAssistito}
            onBlur={() => handleFieldBlur("preferenzeGenereAssistito")}
            selectedItem={dataset.preferenzeGenereAssistito.find(el => el.checked)}
            onChange={value => {
              if (Object.keys(value).length !== 0) {
                const dataCopy = dataset.preferenzeGenereAssistito.map(el => ({ ...el }));
                const elNotSelected = dataCopy.filter(el => el.id !== value.id);
                elNotSelected.forEach(el => (el.checked = false));
                const elSelected = dataCopy.find(el => el.id === value.id);
                elSelected.checked = !value.checked;
                setFormField("preferenzeGenereAssistito", dataCopy);
              }
            }}
            fontSize="f7"
            checkcolor="primary"
            display="inline-grid"
            style={{ width: 'fit-content' }}
          />
        </Row>
      </Row>
    </>)
};

PreferenzeGenere.displayName = 'PreferenzeGenere';
export default PreferenzeGenere;
