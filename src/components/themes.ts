export const lightTheme: ThemeType = {
  bgColor: "white",
  color: "black",
  inputBgColor: "rgb(220, 230, 230)",
  disabledInputColor: "rgb(240, 240, 240)",
  switchBgColor: "rgb(43, 43, 43)",
  accentColor: "rgb(110, 112, 212)",
};

export const darkTheme: ThemeType = {
  bgColor: "black",
  color: "white",
  inputBgColor: "rgb(43, 43, 43)",
  disabledInputColor: "rgb(20, 20, 20)",
  switchBgColor: "rgb(240, 240, 240)",
  accentColor: "rgb(110, 112, 212)",
};

export interface ThemeType {
  bgColor: string;
  color: string;
  inputBgColor: string;
  disabledInputColor: string;
  switchBgColor: string;
  accentColor: string;
}
