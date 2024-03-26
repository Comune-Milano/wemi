import React from 'react';
import { useFormField } from 'libs/Form/hooks/useFormField';
import InputNumber from 'components/ui2/InputNumber';
import Text from 'components/ui/Text';
import styled from 'styled-components';

const WrapperInput = styled.div`
  padding: 0 0 0 1rem;
  outline: none;
`;

const Order = () => {
  const { value, setValue, handleBlur, touched, error } = useFormField('order');
  return (
    <React.Fragment>
      <Text value="Ordine visualizzazione" size="f7" color="blue" weight="bold" />
      <Text value="*" size="f7" color="red" weight="bold" />
      <Text value=":" size="f7" color="blue" weight="bold" />
      <WrapperInput role="button" onBlur={handleBlur} tabIndex="0">
        <InputNumber
          material
          label="Ordine visualizzazione"
          ariaLabel="Ordine visualizzazione"
          required
          value={value || ''}
          minValue={1}
          onChange={setValue}
          onInputChange={setValue}
          onInputBlur={handleBlur}
          error={touched && error ? error : undefined}
          onBlur={handleBlur}
        />
      </WrapperInput>
      {touched && error ? (
        <Text value={error} size="f7" color="red" />
      ) : null}
    </React.Fragment>
  );
};

Order.displayName = 'Order Content';

export default React.memo(Order);
