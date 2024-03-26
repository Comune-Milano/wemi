import React from 'react';
import Text from 'components/ui/Text';
import { WrapperTextLeft } from './style';

const LeftColumn = () => (
  <WrapperTextLeft>
    <Text
      size="f5"
      value="WeMi è la prima piattaforma pubblica che"
    />
    &nbsp;
    <Text
      size="f5"
      value="aggrega l'offerta di servizi di welfare"
      weight="bold"
    />
    &nbsp;
    <Text
      size="f5"
      value="erogati dal Comune di Milano"
    />
    &nbsp;
    <Text
      size="f5"
      value="e da una rete qualificata"
    />
    &nbsp;
    <Text
      size="f5"
      value="di associazioni, cooperative e imprese sociali"
    />
    &nbsp;
    <Text
      size="f5"
      value="del territorio."
    />
  </WrapperTextLeft>
);

LeftColumn.displayName = 'LeftColumn';

export default React.memo(LeftColumn);
