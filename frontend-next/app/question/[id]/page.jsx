"use client";

import auth from "@/auth/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiMessageAltCheck } from "react-icons/bi";
import Testareaanswer from "@/components/ui/textareaeditor";

const QuestionPage = ({ params }) => {
  const _id = params.id;
  const [question_, setQuestion_] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = window.sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/${_id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setQuestion_(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [_id]);

  if (loading) {
    return (
      <div className="text-center p-10 text-[#B6B09F]">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!question_) {
    return (
      <div className="text-center p-10 text-gray-500">No data found</div>
    );
  }

  const { title, question, answers, tag, name } = question_.problems;
  const no_of_answers = answers?.length || 0;

  const updatedAnswers = answers.map((answer, index) => (
    <div
      key={index}
      className="bg-[#EAE4D5] shadow-md rounded-lg p-4 mb-4"
    >
      <div className="text-sm text-[#6a6a6a] capitalize font-semibold text-[#B6B09F]">
        {answer.name}
      </div>
      <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
        {answer.answer}
      </p>
    </div>
  ));

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#B6B09F] mb-2">
          Question
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Explore answers from the community and share your insights.
        </p>

        <div className="bg-[#EAE4D5] rounded-xl shadow-md p-6">
          <div className="text-sm text-[#6a6a6a] mb-1 capitalize">
            {name}
          </div>
          <h2 className="text-2xl font-bold mb-3">{title}</h2>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <BiMessageAltCheck className="mr-1" /> {no_of_answers} answers
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tag.map((tag, index) => (
              <span
                key={index}
                className="bg-[#B6B09F] text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-800 whitespace-pre-wrap mb-6 text-sm">
            {question}
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-[#B6B09F]">
              Answers
            </h3>
            {no_of_answers === 0 ? (
              <div className="text-sm font-medium text-[#B6B09F]">
                No answers yet!
              </div>
            ) : (
              updatedAnswers
            )}

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 text-[#B6B09F]">
                Write your answer
              </h4>
              <Testareaanswer _id={_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth(QuestionPage);
