import React from "react";
import styled from "@emotion/styled";

interface Props {}

const CloseIcon: React.FunctionComponent<Props> = () => (
  <Svg version="1.1" x="0px" y="0px" viewBox="0 0 100 125">
    <g transform="translate(0,-952.36218)">
      <path
        d="m 49.999998,958.36218 c -24.27092,0 -44,19.71901 -44,44.00002 0,24.2715 19.7285,44 44,44 24.28103,0 44.000004,-19.7291 44.000004,-44 0,-24.28051 -19.719544,-44.00002 -44.000004,-44.00002 z m 0,4.00001 c 22.11954,0 40.000004,17.8805 40.000004,40.00001 0,22.1091 -17.881034,40 -40.000004,40 -22.1085,0 -40,-17.8915 -40,-40 0,-22.11901 17.89093,-40.00001 40,-40.00001 z"
        fill-opacity="1"
        fill-rule="evenodd"
        stroke="none"
        visibility="visible"
        display="inline"
        overflow="visible"
      />
      <path
        d="m 34.764998,985.35249 a 2.0002,2.0002 0 0 0 -1.1875,3.4375 l 13.5625,13.59381 -13.5625,13.5624 a 2.0108526,2.0108526 0 0 0 2.84375,2.8438 l 13.59375,-13.5937 13.5625,13.5937 a 2.0108526,2.0108526 0 0 0 2.84375,-2.8438 l -13.59375,-13.5624 13.59375,-13.59381 a 2.0002,2.0002 0 0 0 -1.46875,-3.4375 2.0002,2.0002 0 0 0 -1.375,0.5938 l -13.5625,13.5625 -13.59375,-13.5625 a 2.0002,2.0002 0 0 0 -1.4375,-0.5938 2.0002,2.0002 0 0 0 -0.21875,0 z"
        fill-opacity="1"
        fill-rule="evenodd"
        stroke="none"
        visibility="visible"
        display="inline"
        overflow="visible"
      />
    </g>
  </Svg>
);

const Svg = styled.svg<Props>(() => ({
  fill: "black",
  width: "2rem",
  height: "2rem",
  margin: "0.5rem",
  display: "inline-block"
}));

export default CloseIcon;
