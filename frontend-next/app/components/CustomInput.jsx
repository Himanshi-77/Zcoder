import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <textarea
      rows="5"
      value={customInput}
      onChange={(e) => setCustomInput(e.target.value)}
      placeholder="Custom input"
      className="w-full mt-2 resize-vertical text-sm"
      style={{
        border: "2px solid #B6B09F",
        borderRadius: "1rem",
        padding: "0.75rem 1rem",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        fontFamily: "inherit",
        outline: "none",
      }}
    />
  );
};

export default CustomInput;
