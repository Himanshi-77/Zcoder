"use client";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSearchParams } from 'next/navigation';

const Roomcomponent = () => {
  const [authUser, setAuthUser] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [room, setRoom] = useState(null);
  const [postmsg, setPostMsg] = useState("");
  const [msgList, setmsgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatRef = useRef(null);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/getroombyid?q=${id}`);
        setmsgList(res.data.message);
        setRoom(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    const getAuthUser = async () => {
      const token = window.sessionStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getAuth`, {
          headers: { 'Authorization': `${token}` }
        });
        setAuthUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getRoom();
    getAuthUser();
  }, [id]);

  const socket = useMemo(() => {
    return io(process.env.NEXT_PUBLIC_SOCKET_URL, { withCredentials: true });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('joinRoom', id);
    socket.on('welcomeMsg', (msg) => console.log(msg));
    socket.on('getmessage', (msg) => {
      setmsgList(prev => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, [socket, id]);

  useEffect(() => {
    chatRef.current?.scrollIntoView();
  }, [msgList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/msg/postmessage`, {
        content: postmsg,
        roomId: id,
        sender: authUser._id,
      });
      setmsgList(prev => [...prev, res.data]);
      socket.emit('newmessage', { msg: res.data, id });
      setPostMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen p-4" style={{ backgroundColor: '#F2F2F2', color: '#000000' }}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Chat Box */}
        <div className="md:w-3/4">
          <h2 className="text-2xl font-semibold mb-4">{room?.roomName}</h2>
          <div className="w-full h-[65vh] overflow-y-auto border border-[#B6B09F] rounded-xl p-4 bg-white shadow-sm mb-4">
            {!loading && msgList.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 w-[calc(50%-1rem)] mb-4 text-sm rounded-xl shadow-sm ${
                  authUser?.name === msg?.sender?.name
                    ? "ml-auto bg-[#B6B09F] text-white"
                    : "bg-[#EAE4D5] text-black"
                }`}
              >
                <p className="font-semibold capitalize">{msg?.sender?.name}</p>
                <p className="break-words mt-1">{msg?.content}</p>
              </div>
            ))}
            <div ref={chatRef}></div>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Type message..."
              value={postmsg}
              onChange={(e) => setPostMsg(e.target.value)}
              className="flex-grow px-4 py-2 rounded-lg border border-[#B6B09F] bg-white text-black focus:outline-none shadow-sm"
            />
            <input
              type="submit"
              value="Post"
              className="px-5 py-2 rounded-lg bg-[#B6B09F] text-white hover:opacity-90 cursor-pointer shadow-md"
            />
          </form>
        </div>

        {/* Member List */}
        <div className="md:w-1/4 border border-[#B6B09F] rounded-xl p-4 bg-white shadow-sm h-[65vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">Room Members</h3>
          {room?.members?.map((user, idx) => (
            <p key={idx} className="text-sm mb-1">{user.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roomcomponent;
