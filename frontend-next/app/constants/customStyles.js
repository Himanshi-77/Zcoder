export const customStyles = {
  control: (styles, state) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "14rem",
    borderRadius: "12px",
    fontSize: "0.875rem",
    lineHeight: "1.75rem",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "2px solid #B6B09F",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(182, 176, 159, 0.4)"
      : "0px 4px 8px rgba(0, 0, 0, 0.05)",
    ":hover": {
      border: "2px solid #B6B09F",
    },
    cursor: "pointer",
  }),

  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    fontSize: "0.875rem",
    backgroundColor: isSelected
      ? "#B6B09F"
      : isFocused
      ? "#EAE4D5"
      : "#FFFFFF",
    color: "#000000",
    cursor: "pointer",
    padding: "10px",
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "#FFFFFF",
    maxWidth: "14rem",
    border: "1.5px solid #B6B09F",
    borderRadius: "12px",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "#000000",
  }),

  placeholder: (styles) => ({
    ...styles,
    color: "#000000",
    fontSize: "0.875rem",
    lineHeight: "1.75rem",
  }),
};
