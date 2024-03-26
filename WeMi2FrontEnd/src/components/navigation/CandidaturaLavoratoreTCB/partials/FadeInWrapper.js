/** @format */

import { Row } from 'components/ui/Grid';
import styled, {css} from 'styled-components';

export const FadeInWrapper = styled(Row)`
    @keyframes fadeInWrapper {
        0% {opacity: 0.3}
        100% {opacity: 1}
    }
    animation-name: fadeInWrapper;
    animation-duration:1.5s;
    ${props => props.shift && css`
    padding-left: 20%;
`}

`;

FadeInWrapper.displayName = 'FadeInWrapper';