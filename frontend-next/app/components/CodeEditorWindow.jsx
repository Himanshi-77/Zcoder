"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div
      className="w-full h-full overflow-hidden bg-white"
      style={{
        border: "2px solid #B6B09F",
        borderRadius: "1rem",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Editor
        height="85vh"
        width="100%"
        language={language || "javascript"}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          formatOnPaste: true,
          formatOnType: true,
          padding: {
            top: 20,
          },
        }}
      />
    </div>
  );
};

export default CodeEditorWindow;
