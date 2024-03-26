import React from 'react';
import { useLogger } from 'services/Logger';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import TextArea from 'components/ui2/TextArea';
import { AccordionCard } from 'components/pages/SchedaEntePage/shared';

const InstitutionSectionComponent = ({
  dataset = {},
  keySection,
}) => {
  const logger = useLogger();
  React.useEffect(() => {
    logger.log(keySection, dataset);
  }, [dataset]);
  return (
    <AccordionCard
      title="Ente"
      labelAria="sezione dei dati identificativi dell'ente in sola visualizzazione"
    >
      <Row fluid>
        <Column xs="12" md="3" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="ente id"
            disabled
            inputValue={dataset.id}
          />
        </Column>
        <Column xs="12" md="3" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="partita iva / cf"
            disabled
            inputValue={dataset.vatNumber}
          />
        </Column>
        <Column xs="12" md="6" padding="0">
          <Input
            label="nome chiave ente"
            disabled
            inputValue={dataset.name}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="nome completo ragione sociale"
            disabled
            inputValue={dataset.fullname}
          />
        </Column>
        <Column xs="12" md="6" padding="0">
          <Input
            label="spazi wemi gestiti"
            disabled
            inputValue={dataset.weMiSpaces}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        <Column xs="12" md="4" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="e-mail amministratore ente"
            disabled
            inputValue={dataset.administratorEmail}
          />
        </Column>
        <Column xs="12" md="4" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="stato"
            disabled
            inputValue={dataset.stateDescription}
          />
        </Column>
        <Column xs="12" md="4" padding="0">
          <Input
            label="OPERATORI SERVIZI WEMI"
            disabled
            inputValue={dataset.operatorsWeMI}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        <TextArea
          label="Categorie Accreditate"
          disabled
          inputValue={dataset.accreditationCategories}
        />
      </Row>
    </AccordionCard>
  );
};

InstitutionSectionComponent.displayName = 'Institution section';

export const InstitutionSection = React.memo(InstitutionSectionComponent);
