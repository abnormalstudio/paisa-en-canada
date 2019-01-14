import React from "react";
import styled from "@emotion/styled";

interface Props {
  theme: string;
}

const SearchIcon: React.FunctionComponent<Props> = ({ theme }) => (
  <Svg
    theme={theme}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 125"
  >
    <g>
      <path d="M45.5,79.5c8.7,0,16.8-3.2,22.9-8.6l18.9,18.9c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7c1-1,1-2.6,0-3.5L71.9,67.4   c5.3-6.1,8.6-14.1,8.6-22.9c0-19.3-15.7-35-35-35c-19.3,0-35,15.7-35,35C10.5,63.8,26.2,79.5,45.5,79.5z M45.5,14.5   c16.5,0,30,13.5,30,30s-13.5,30-30,30s-30-13.5-30-30S29,14.5,45.5,14.5z" />
    </g>
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

export default SearchIcon;
