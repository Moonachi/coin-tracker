import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  subtitleColor: "#9c88ff",
  bgColor: "rgba(0,0,0,0.9)",
  increaseColor: "rgba(255,0,0,0.9)",
  decreaseColor: "rgba(0,0,255,0.9)",

  mainPage: {
    color: "black",
    hoverColor: "white",
    bgColor: "lightgray"
  },

  detailPage: {
    color: "white",
    recBgColor: "rgba(0, 0, 0, 0.5)",
    selected: {
      color: "white",
      bgColor: "rgba(0, 0, 0, 0.5)"
    }
  }
};

export const whiteTheme: DefaultTheme = {
  subtitleColor: "#9c88ff",
  bgColor: "white",
  increaseColor: "rgba(255,0,0,0.9)",
  decreaseColor: "rgba(0,0,255,0.9)",

  mainPage: {
    color: "black",
    hoverColor: "white",
    bgColor: "lightgray"
  },

  detailPage: {
    color: "black",
    recBgColor: "lightgray",
    selected: {
      color: "black",
      bgColor: "lightgray"
    }
  }
};
