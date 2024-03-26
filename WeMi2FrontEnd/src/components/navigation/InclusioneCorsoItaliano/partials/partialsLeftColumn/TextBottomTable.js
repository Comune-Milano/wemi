import React from 'react';
import Text from 'components/ui/Text';
import { textBottomTable } from './costants';
import { StyledHashLink } from '../CorsoItaliano.styled';

const TextBottomTable = ({
  color = 'blue',
  keyText,
}) => (
  <>
    {
      textBottomTable?.map((ele, index) => (
        <React.Fragment key={`TextBottomTable-${index}-${keyText}`}>
          {
            ele.link ? (
              <StyledHashLink
                to={`#${ele.link}`}
                scroll={el => {
                  window.scrollTo({ behavior: 'smooth', top: el.offsetTop });
                }}
              >
                <Text
                  value={ele.text}
                  lineHeight="175%"
                  fontStyle="italic"
                  decoration="underline"
                  color={color}
                  size="f7"
                />
              </StyledHashLink>
            )
              : (
                <Text
                  value={ele.text}
                  lineHeight="175%"
                  color={color}
                  fontStyle="italic"
                  size="f7"
                />
              )
          }
          &nbsp;
        </React.Fragment>
      ))
    }
  </>
);

TextBottomTable.displayName = 'TextBottomTableNavigation';

export default TextBottomTable;
