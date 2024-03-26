import styled from "styled-components";

const AccordionBodyWrapper = styled.div`
width:100%;
border: 1px solid ${({theme}) => theme.colors.blue};
border-radius: 0 0 5px 5px;
`;

AccordionBodyWrapper.displayName = 'AccordionBodyWrapper';

export default AccordionBodyWrapper;