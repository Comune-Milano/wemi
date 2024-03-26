import React, { useEffect } from 'react';
import { useLogger } from 'services/Logger';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import TextArea from 'components/ui2/TextArea';
import Button from 'components/ui2/Button';
import { AccordionCard } from 'components/pages/SchedaEntePage/shared';
import Chip from 'components/pages/MatchingDomandaLavoratore/utils/Chip';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  addOperator,
  removeOperator,
} from './utils';
import { GroupChip } from './style';
import {
  checkInsertOperatorCard,
  checkDeleteOperatorCard,
} from './graphql';

const OperatorsSectionComponent = ({
  isAdmin,
  dataset = {},
  errors = {},
  setDataset,
  keySection,
  institutionId,
  disabled = {},
  handleFieldBlur,
  touched = {},
}) => {
  const checkInsertOperator = useStatelessGraphQLRequest(checkInsertOperatorCard);
  const checkDeleteOperator = useStatelessGraphQLRequest(checkDeleteOperatorCard);

  const logger = useLogger();

  useEffect(() => {
    logger.log(keySection, dataset);
  }, [dataset]);

  const setFormFieldOperator = (key, value) => {
    const formOperatore = {
      ...dataset,
      [key]: value,
    };
    setDataset(keySection, formOperatore);
  };

  const setValuesOperator = (newDataset) => {
    const formOperatore = {
      ...dataset,
      ...newDataset,
    };
    setDataset(keySection, formOperatore);
  };

  const addNewOperator = async () => {
    if (!dataset.email) {
      return;
    }
    const newOperators = addOperator(dataset.email, dataset.authorizedOperators);

    const requestVariablesInsert = {
      users: [{ email: dataset.email }],
      institutionId: isAdmin ? institutionId : undefined,
    };
    const result = await checkInsertOperator(requestVariablesInsert);

    if (result) {
      setValuesOperator({
        email: '',
        authorizedOperators: newOperators,
      });
    }
  };

  const deleteOldOperator = async (operator) => {
    const newOperators = removeOperator(operator, dataset.authorizedOperators);
    const requestVariablesDelete = {
      users: [operator],
      institutionId: isAdmin ? institutionId : undefined,
    };
    const result = await checkDeleteOperator(requestVariablesDelete);
    if (result) {
      setFormFieldOperator('authorizedOperators', newOperators);
    }
  };

  /**
   * Verify if the field e-mail operatore is touched and errored
   * if there is an administrative block of the button
   * and if the field is empty.
   * Then disable the button aggiungi
   */
  const isTouched = !!(touched.email && errors.email);
  const isAdminDisabled = disabled.section;
  const isEmpty = !(dataset.email);
  const isDisabled = isTouched || isEmpty || isAdminDisabled;

  return (
    <AccordionCard title="Operatori abilitati WeMi">
      <Row fluid>
        <Column xs="12" md="9" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
          <Input
            label="e-mail operatore"
            inputValue={dataset.email}
            // placeholder="inserire e-mail"
            onChange={(newValue) => {
              setFormFieldOperator('email', newValue);
            }}
            disabled={disabled.section}
            error={touched.email && errors.email ? errors.email : ''}
            onBlur={() => handleFieldBlur(`${keySection}.email`)}
          />
        </Column>
        <Column
          flex
          alignitems="flex-end"
          xs="12"
          md="3"
          padding="0"
          sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}
        >
          <Button
            label="aggiungi"
            color="blue"
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              addNewOperator();
            }}
            disabled={isDisabled}
          />
        </Column>
      </Row>
      <Row fluid margin="2em 0 0 0">
        <GroupChip>
          {dataset.authorizedOperators?.map((operator) => (
            <Chip
              id={operator.email}
              aria-label={`rimuovi ${operator.email}`}
              spacing="0 0.5em 0.5em 0"
              key={operator.email}
              value={operator.email}
              onClick={() => {
                deleteOldOperator(operator);
              }}
              color="grey"
              disabled={disabled.section}
            />
          ))}
        </GroupChip>

      </Row>
      {(dataset.note2 && disabled.notes) || isAdmin ? (
        <Row fluid margin="2em 0 0 0">
          <TextArea
            label="Indicazioni della redazione WeMi"
            inputValue={dataset.note2}
            onChange={(newValue) => {
              setFormFieldOperator('note2', newValue);
            }}
            disabled={disabled.notes}
            bgColor="lightYellow"
          />
        </Row>
      ) : null}
    </AccordionCard>
  );
};

OperatorsSectionComponent.displayName = 'Operator Section';

export const OperatorsSection = React.memo(OperatorsSectionComponent);
