import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div
      className="metrics-container mt-6 p-4 rounded-xl text-sm text-black space-y-3"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1.5px solid #B6B09F",
        boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.06)"
      }}
    >
      <p>
        <span className="font-medium">Status:</span>{" "}
        <span
          className="font-semibold px-2 py-1 rounded-md"
          style={{ backgroundColor: "#EAE4D5", color: "#000000" }}
        >
          {outputDetails?.status?.description}
        </span>
      </p>

      <p>
        <span className="font-medium">Memory:</span>{" "}
        <span
          className="font-semibold px-2 py-1 rounded-md"
          style={{ backgroundColor: "#EAE4D5", color: "#000000" }}
        >
          {outputDetails?.memory}
        </span>
      </p>

      <p>
        <span className="font-medium">Time:</span>{" "}
        <span
          className="font-semibold px-2 py-1 rounded-md"
          style={{ backgroundColor: "#EAE4D5", color: "#000000" }}
        >
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
