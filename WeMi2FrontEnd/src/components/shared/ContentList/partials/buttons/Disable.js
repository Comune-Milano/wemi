import React from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui/Tooltip';

const DisableButton = ({
  id,
  handleDisable,
  disabled,
  description = '',
}) => (
  <Tooltip
    top
    horizzontalShift="-1em"
    fontSize="f8"
    textTT="Disattiva"
    color="white"
    bgcolor="red"
  >
    <FaIcon
      icon="minus"
      padding="0.5em"
      color="white"
      style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: 'rgb(221, 0, 49)' }}
      bgcolor="red"
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleDisable(id);
      }}
      tabindex="0"
      aria-label={`Disattiva ${description}`}
    />
  </Tooltip>
);

DisableButton.displayName = 'Disable button content';

export const Disable = DisableButton;
