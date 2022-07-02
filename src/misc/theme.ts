export enum ThemeMode {
  Light = "Light",
  Dark = "Dark",
}

export interface Theme {
  mode: ThemeMode;
  background: string;
  paper: string;
  grey: string;
  green: string;
  amber: string;
}

export const lightTheme: Theme = {
  mode: ThemeMode.Light,
  background: "#ffffff",
  paper: "#787c7e",
  grey: "#d3d6da",
  green: "#6aaa64",
  amber: "#c9b458",
};

export const darkTheme: Theme = {
  mode: ThemeMode.Light,
  background: "#121213",
  paper: "#3a3a3c",
  grey: "#818384",
  green: "#538d4e",
  amber: "#b59f3b",
};
