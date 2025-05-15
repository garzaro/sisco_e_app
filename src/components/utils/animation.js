import styled, {keyframes} from "styled-components";

const animationDot = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
    0%   { content: ""; }
    25%  { content: "."; }
    50%  { content: ".."; }
    75%  { content: "..."; }
    100% { content: ""; }
`;

const textDot = styled.span`
    &::after {
        content: "";
        animation: ${animationDot} 1.5s steps(5, end) infinite;        
    }
`;
export default textDot;