import React from 'react';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Text from 'components/ui/Text';
import { StyledContent, StyledDivFaIcon, StyledItem } from './style';

const ListItemComponent = ({
id,
item,
onClick,
icon,
iconColor,
tabIndex,
ariaButtonDescription,
ariaItemDescription,
orientation,
disabledItem,
sortable,
...rest
}) => (
  <StyledItem
    role="menuitem"
    aria-labelledby={`${id}_menuitem`}
    tabIndex={tabIndex}
    orientation={orientation}
    disabled={disabledItem}
    sortable={sortable}
    {...rest}
  >
    <StyledContent orientation={orientation}>
      <Text
        id={`${id}_menuitem`}
        value={item.value}
        size="f7_5"
        color="darkGrey"
        whitespace="pre-line"
        tag="p"
        aria-label={ariaItemDescription}
      />
      <StyledDivFaIcon>
        <ButtonIcon
          disabled={disabledItem}
          tabIndex="0"
          icon={icon}
          fontSize="f7"
          aria-label={ariaButtonDescription}
          color={iconColor}
          noBorder
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            onClick(item);
          }}
        />
      </StyledDivFaIcon>
    </StyledContent>
  </StyledItem>
);

ListItemComponent.displayName = 'list item element';

export const ListItem = ListItemComponent;
