"use client";

import Card from './components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import auth from './auth/auth';

const Home = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home`,
          {
            headers: {
              'Authorization': `${token}`,
            },
          }
        );
        setProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-black p-6">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
        All Questions
      </h1>
      <div className="max-w-5xl mx-auto space-y-4">
        {problems.length > 0 ? (
          problems.map((problem) => (
            <Card problem={problem} key={problem._id} />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default auth(Home);
