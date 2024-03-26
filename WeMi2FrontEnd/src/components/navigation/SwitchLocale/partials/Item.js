/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';

const Item = styled.li`
  text-align: center;
  outline: 0;
  min-width: 4.2rem;
  padding: 0.35rem 0.5rem;
  margin: 0 0.05rem;
  cursor: pointer;
  border-radius: 20px;
  ${({ selected }) => selected && 'background: rgba(0,0,0,0.1)'};
  &:hover {
    background: rgba(0, 0, 0, 0.12);
  }

  ${media.md`
  min-width: 5.5rem;
  padding: 0.35rem 0.5rem;
  margin: 0 0.25rem;
  `}
`;
Item.displayName = 'Item';

export default Item;
