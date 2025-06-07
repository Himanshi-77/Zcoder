import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const themeOptions = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
    label: themeName,
    value: themeId,
    key: themeId,
  }));

  return (
    <div className="min-w-[220px]">
      <Select
        placeholder="Select Theme"
        options={themeOptions}
        value={theme}
        styles={customStyles}
        onChange={handleThemeChange}
        theme={(selectTheme) => ({
          ...selectTheme,
          colors: {
            ...selectTheme.colors,
            primary25: "#EAE4D5", // hover color
            primary: "#B6B09F",   // active color
            neutral0: "#FFFFFF",  // background
            neutral80: "#000000", // text
          },
        })}
      />
    </div>
  );
};

export default ThemeDropdown;
