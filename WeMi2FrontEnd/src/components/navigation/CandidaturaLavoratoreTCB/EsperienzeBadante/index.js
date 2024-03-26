import React from 'react';
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Esperienze1 from './partials/Esperienze1';
import Esperienze2 from './partials/Esperienze2';

const EsperienzeBadante = ({
  locale,
  patologie,
}) => {
  const { dataset, setFormField, errors, touched, handleFieldBlur } = useFormContext();


  return (
    <>
      <Row fluid>
      </Row>
      <>
        <Esperienze1
          dataset={dataset}
          setFormField={setFormField}
          locale={locale}
          patologie={patologie.data.EstraiPatologieGeneriche}
        />
        <Esperienze2
          dataset={dataset}
          errors={errors}
          handleFieldBlur={handleFieldBlur}
          touched={touched}
          setFormField={setFormField}
          locale={locale}
          patologie={patologie.data.EstraiPatologie}
        />
      </>
    </>
  );
};

EsperienzeBadante.displayName = 'EsperienzeBadante';

export default (EsperienzeBadante);
