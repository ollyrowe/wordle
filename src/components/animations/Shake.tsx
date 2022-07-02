import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  shaking: boolean;
  children: React.ReactNode;
}

const Shake: React.FC<Props> = ({ shaking, children }) => {
  return <ShakeWrapper shaking={shaking}>{children}</ShakeWrapper>;
};

const shakeAnimation = keyframes`
  0% { transform: translate(1px, 0px); }
  10% { transform: translate(-1px, 0px); }
  20% { transform: translate(-4px, 0px); }
  30% { transform: translate(4px, 0px); }
  40% { transform: translate(1px, 0px); }
  50% { transform: translate(-1px, 0px); }
  60% { transform: translate(-4px, 0px); }
  70% { transform: translate(4px, 0px); }
  80% { transform: translate(-1px, 0px); }
  90% { transform: translate(1px, 0px); }
  100% { transform: translate(1px, 0px); }
`;

/* Shake animation length in milliseconds */
export const SHAKE_ANIMATION_LENGTH = 500;

const ShakeWrapper = styled.div<Props>`
  animation: ${(props) => (props.shaking ? shakeAnimation : "none")} 0.35s;
  animation-iteration-count: infinite;
`;

export default Shake;
