import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import InputNumber from 'components/ui2/InputNumber';
import ColumnContainer from 'components/ui2/ColumnsContainer';
import { useFormContext } from 'libs/Form/hooks/useFormContext';

const PreferenzeFasceEta = () => {
  const { dataset, setFormField } = useFormContext();

  return (
    <>
      <Row fluid margin="2em 0 0">
        <Text
          value="Indica il numero massimo di bambini che sei disponibile ad accudire"
          weight="bold"
          padding="0 0 1em 0"
        />
        <Row fluid>
          <Row fluid>
            <Row fluid margin="0 0 0.5em 0">
              <InputNumber
                value={Number.parseInt(dataset.nrMaxBambiniDaAccudire, 10) || 0}
                onChange={(value) => setFormField('nrMaxBambiniDaAccudire', value)}
                onInputChange={(value) => setFormField('nrMaxBambiniDaAccudire', value)}
                minValue={0}
                maxValue={5}
                size="f7"
                iconColor="primary"
                textColor="black"
              />
              <Text
                tag="span"
                size="f7"
                value="bambini"
                padding="0 0 0 1.5em"
              />
            </Row>
            <Row fluid padding="2em 2em 0 0">
              <Text
                value="Se preferisci lavorare con bambini di una particolare fascia d'età, indica quali"
                weight="bold"
                padding="0 0 1em 0"
              />
              <Row fluid>
                <ColumnContainer xsCount={1} smCount={2} width="60%">
                  {dataset.fasceEtaBambini.map((tipoFasciaEta) => (
                    <Column
                      xs="12"
                      padding="0"
                      key={tipoFasciaEta.id}
                    >
                      <Checkbox
                    // style={{ flexBasis: "60%" }}
                        fontSize="f7"
                        checkcolor="primary"
                        width="fit-content"
                        label={tipoFasciaEta.value}
                        value={tipoFasciaEta.checked}
                        onChange={isChecked => {
                          const dataCopy = dataset.fasceEtaBambini.map(el => ({ ...el }));

                          const selectedCheckbox = dataCopy.find(el => el.id === tipoFasciaEta.id);
                          selectedCheckbox.checked = isChecked;

                          setFormField('fasceEtaBambini', dataCopy);
                        }}
                      />
                    </Column>
                ))}
                </ColumnContainer>
              </Row>
            </Row>
          </Row>
        </Row>
      </Row>
    </>
  );
};

PreferenzeFasceEta.displayName = 'PreferenzeFasceEta';
export default PreferenzeFasceEta;
