import React from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui/Tooltip';

const ModifyButton = ({
  id,
  handleModify,
  disabled,
  description = '',
}) => (
  <Tooltip
    top
    horizzontalShift="-1em"
    fontSize="f8"
    textTT="Modifica"
    color="white"
    bgcolor="blue"
  >
    <FaIcon
      icon="pencil-alt"
      style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: 'rgb(0, 92, 185)' }}
      padding="0.5em"
      color="white"
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleModify(id);
      }}
      tabindex="0"
      aria-label={`Modifica ${description}`}
    />
  </Tooltip>
  );


ModifyButton.displayName = 'Modify Button content';

export const Modify = ModifyButton;
