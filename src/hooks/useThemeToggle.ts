import { useState } from "react";
import { lightTheme, darkTheme, ThemeMode } from "../misc/theme";

/**
 * Hook which stores the current theme which can be toggled.
 *
 * @returns the currently selected theme.
 */
export const useThemeToggle = () => {
  const [theme, setTheme] = useState(darkTheme);

  const toggle = () => {
    setTheme(theme.mode === ThemeMode.Light ? darkTheme : lightTheme);
  };

  return { ...theme, toggle };
};
