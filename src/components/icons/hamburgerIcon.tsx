import React from "react";
import styled from "@emotion/styled";

interface Props {
  theme: string;
}

const HamburgerIcon: React.FunctionComponent<Props> = ({ theme }) => (
  <Svg theme={theme} version="1.1" x="0px" y="0px" viewBox="0 0 100 125">
    <path d="M7.12,26.07h51.261c1.171,0,2.121-0.949,2.121-2.12c0-1.172-0.95-2.12-2.121-2.12H7.12  C5.949,21.83,5,22.778,5,23.95C5,25.121,5.949,26.07,7.12,26.07z" />
    <path d="M92.879,47.879H7.12C5.949,47.879,5,48.828,5,50c0,1.171,0.949,2.12,2.12,2.12h85.759  C94.05,52.12,95,51.171,95,50C95,48.828,94.05,47.879,92.879,47.879z" />
    <path d="M92.879,73.93H7.12C5.949,73.93,5,74.879,5,76.05c0,1.172,0.949,2.12,2.12,2.12h85.759  c1.171,0,2.121-0.948,2.121-2.12C95,74.879,94.05,73.93,92.879,73.93z" />
  </Svg>
);

const Svg = styled.svg<Props>(props => ({
  fill: props.theme === "home" ? "white" : "black",
  width: "2rem",
  height: "2rem",
  margin: "0.5rem",
  display: "inline-block",
  "@media (max-width: 1023px)": {
    fill: "black"
  }
}));

export default HamburgerIcon;
