"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [alertStatus, setAlertStatus] = useState(null);

  const handleCreateRoom = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/createroom`,
        { roomName, roomPassword }
      );
      console.log(res.data);
      setAlertStatus("success");
      setRoomName("");
      setRoomPassword("");
      setTimeout(() => (window.location.href = '/joinroom'), 1200);
    } catch (err) {
      setAlertStatus("error");
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#F2F2F2" }} className="min-h-screen p-6">
      {alertStatus && (
        <div className="px-4 pt-4 mb-4">
          <Alert severity={alertStatus}>
            {alertStatus === 'success'
              ? "Room has been created successfully!"
              : "Error in creating the room!"}
          </Alert>
        </div>
      )}

      <h2 className="text-3xl font-semibold text-black text-center mb-6">
        Create Room
      </h2>

      <div className="flex flex-col gap-5 max-w-xl mx-auto bg-white rounded-xl p-6 shadow-md">
        <div>
          <label htmlFor="room-name" className="block mb-2 text-sm font-medium text-black">
            Room Name
          </label>
          <input
            id="room-name"
            type="text"
            className="w-full p-2.5 text-sm rounded-lg border"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#B6B09F",
              color: "#000000",
            }}
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="room-password" className="block mb-2 text-sm font-medium text-black">
            Room Password
          </label>
          <input
            id="room-password"
            type="text"
            className="w-full p-2.5 text-sm rounded-lg border"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#B6B09F",
              color: "#000000",
            }}
            placeholder="Enter password"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="px-6 py-2 rounded-lg text-white font-medium"
          style={{ backgroundColor: "#B6B09F" }}
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
