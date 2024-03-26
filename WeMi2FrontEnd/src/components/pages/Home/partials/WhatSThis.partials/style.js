import style from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';

export const WrapperBackground = style.div`
  background-color: ${colors.greyCardInclusione};
  padding: 1.56rem;
  line-height: 21px;
  letter-spacing: 0.07em;
`;

export const WrapperTextRight = style.div`
  font-style: italic;
  font-family: Lora, serif;
  font-size: 2.9rem !important;
  line-height: 52px;
  word-break: break-word;
  padding: 0;
  margin: 1.5rem 0 0 0;
  ${media.lg`
    padding: 0 0 0 1.5rem;
    margin: 0;
  `}
`;

export const WrapperTextLeft = style.div`
  font-family: Lora, serif;
  padding: 0;
  line-height: 1.9;
  ${media.lg`
    padding: 0 2rem 0 0;
  `}
`;

export const TextUnderline = style(Text)`
  border-bottom: 5px solid  ${colors.orange};
  text-decoration: none;
  height: 4rem;
  display: inline-block;
  font-size: 2.9rem !important;
`;
