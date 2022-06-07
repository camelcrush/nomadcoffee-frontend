import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  fontColor: "rgb(38, 38, 38)",
  bgColor: "#FAFAFA",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  accent: "#0095f6",
  fontColor: "white",
  bgColor: "#000",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
${reset}
input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
body{
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.bgColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
}
a {
      text-decoration: none;
    }
`;
