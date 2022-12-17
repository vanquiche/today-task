export const lightTheme: ThemeType = {
  bgColor: "white",
  color: "black",
  inputBgColor: "rgb(230, 230, 230)",
  switchBgColor: "black",
};

export const darkTheme: ThemeType = {
  bgColor: "black",
  color: "white",
  inputBgColor: "rgb(43, 43, 43)",
  switchBgColor: "white",
};

export interface ThemeType {
  bgColor: string;
  color: string;
  inputBgColor: string;
  switchBgColor: string;
}
