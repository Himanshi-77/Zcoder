import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    const statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      return (
        <pre className="text-sm px-4 py-2 text-red-700 whitespace-pre-wrap">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="text-sm px-4 py-2 text-green-700 whitespace-pre-wrap">
          {atob(outputDetails?.stdout) !== null
            ? atob(outputDetails?.stdout)
            : ""}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="text-sm px-4 py-2 text-red-700 whitespace-pre-wrap">
          Time Limit Exceeded
        </pre>
      );
    } else {
      return (
        <pre className="text-sm px-4 py-2 text-red-700 whitespace-pre-wrap">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-lg font-semibold text-black mb-2">Output</h1>
      <div
        className="w-full h-56 overflow-y-auto rounded-lg"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1.5px solid #B6B09F",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
        }}
      >
        {outputDetails ? getOutput() : (
          <p className="text-gray-500 text-sm px-4 py-2">No output yet</p>
        )}
      </div>
    </div>
  );
};

export default OutputWindow;
