/** @format */

import styled from 'styled-components';

const FadeInWrapper = styled.div`
    @keyframes fadeInWrapper {
        0% {opacity: 0.3}
        100% {opacity: 1}
    }
    animation-name: fadeInWrapper;
    animation-duration:1.5s;
    margin: ${props => props.margin}
`;

FadeInWrapper.displayName = 'FadeInWrapper';
export default FadeInWrapper;
