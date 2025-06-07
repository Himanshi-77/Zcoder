import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <div
      className="min-w-[200px]"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        border: "1.5px solid #B6B09F",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Select
        options={languageOptions}
        styles={customStyles}
        defaultValue={languageOptions[0]}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
        isSearchable={false}
      />
    </div>
  );
};

export default LanguagesDropdown;
