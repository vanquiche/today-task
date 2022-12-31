export const lightTheme: ThemeType = {
  bgColor: "rgb(255, 255, 255)",
  color: "rgb(0, 0, 0)",
  inputBgColor: "rgb(220, 230, 230)",
  disabledInputColor: "rgb(240, 240, 240)",
  switchBgColor: "rgb(43, 43, 43)",
  accentColor: "rgb(110, 112, 212)",
};

export const darkTheme: ThemeType = {
  bgColor: "rgb(0, 0, 0)",
  color: "rgb(255, 255, 255)",
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
