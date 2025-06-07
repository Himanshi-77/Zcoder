"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';

const JoinRoom = () => {
  const [roomList, setRoomList] = useState(null);
  const [status, setAlertStatus] = useState(null);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/getallrooms`);
        setRoomList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getAuthUser = async () => {
      const token = window.sessionStorage.getItem('token');
      const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `${token}`,
        },
      });
      try {
        const res = await instance.get('/getAuth');
        setAuthUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllRooms();
    getAuthUser();
  }, []);

  const handleJoinRoom = async (room) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/joinroom`, {
        roomName: room.roomName,
        roomPassword: room.roomPassword,
        member: authUser._id,
      });
      setAlertStatus('success');
      setTimeout(() => (window.location.href = `/room?id=${res.data._id}`), 1000);
    } catch (err) {
      setAlertStatus('error');
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {status && (
        <div className="fixed top-0 w-full z-50">
          <Alert severity={status}>
            {status === 'success'
              ? "Room joined successfully! Redirecting..."
              : "Error in joining the room!"}
          </Alert>
        </div>
      )}

      <div style={{ backgroundColor: "#F2F2F2" }} className="min-h-screen p-6">
        <h2 className="text-3xl font-semibold text-black mb-4">Join Room</h2>

        <div className="grid gap-5 max-w-3xl mx-auto">
          {roomList && roomList.map((room, ind) => (
            <div
              key={ind}
              className="bg-white border border-[#B6B09F] rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-black mb-2">
                {room.roomName.toUpperCase()}
              </h3>
              <button
                type="button"
                className="px-5 py-2 rounded-md text-white font-medium text-sm"
                style={{ backgroundColor: "#B6B09F" }}
                onClick={() => handleJoinRoom(room)}
              >
                Join Room
              </button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default JoinRoom;
