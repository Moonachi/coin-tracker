import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    subtitleColor: string;
    bgColor: string;
    increaseColor: string;
    decreaseColor: string;

    mainPage: {
      color: string;
      hoverColor: string;
      bgColor: string;
    };

    detailPage: {
      color: string;
      recBgColor: string;
      selected: {
        color: string;
        bgColor: string;
      };
    };
  }
}
