import React from 'react';
import Text from 'components/ui/Text';

const TextTitle = React.memo(({
  value,
  margin = "0 0 2em 0", //margin bottom
  color = "darkGrey"
}) => (
  <Text
    value={value}
    size="f6"
    tag="div"
    weight="bold"
    transform="uppercase"
    color={color}
    margin={margin}
  />
));

TextTitle.displayName = 'ModificaUtenzaNavigation - TextTitle';

export default TextTitle;