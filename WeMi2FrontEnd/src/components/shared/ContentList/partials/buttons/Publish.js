import React from 'react';
import FaIcon from 'components/ui2/FaIcon/ButtonIcon';
import Tooltip from 'components/ui/Tooltip';
import { Column } from 'components/ui/Grid';

const PublishButton = ({
  id,
  handlePublish,
  disabled,
  description = '',
}) => (
  <Column
    xs="2"
    flex
    justifycontent="center"
    padding="1em 0"
    margin="0"
  >
    <Tooltip
      top
      horizzontalShift="-1em"
      fontSize="f8"
      textTT="Pubblica"
      color="white"
      bgcolor="green"
    >
      <FaIcon
        icon="upload"
        padding="0.5em"
        color="white"
        disabled={disabled}
        style={{ width: '2em', height: '2em', borderRadius: '50%', backgroundColor: 'rgb(119, 188, 31)' }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handlePublish(id);
        }}
        tabindex="0"
        aria-label={`Pubblica ${description}`}
      />
    </Tooltip>
  </Column>
);

PublishButton.displayName = 'Publish Button Component';

export const Publish = PublishButton;
