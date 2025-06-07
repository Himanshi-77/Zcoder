"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Testareaanswer = ({ _id }) => {
  const [addAnswer, setAddAnswer] = useState({
    user_id: "",
    name: "",
    answer: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = window.sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getAuth`, {
          headers: { Authorization: token },
        });
        setAddAnswer((prev) => ({
          ...prev,
          user_id: res.data._id,
          name: res.data.name,
        }));
      } catch (err) {
        console.error("User auth fetch failed:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addAnswer.answer.trim() === "") {
      alert("Please enter the answer first.");
      return;
    }

    const token = window.sessionStorage.getItem("token");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/${_id}/answer`,
        addAnswer,
        {
          headers: { Authorization: token },
        }
      );

      console.log("Answer submitted:", res.data);
      setAddAnswer((prev) => ({
        ...prev,
        answer: "",
      }));
    } catch (err) {
      console.error("Failed to post answer:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="answerbox my-5">
      <div className="w-full border rounded-xl" style={{ borderColor: "#B6B09F", backgroundColor: "#F2F2F2" }}>
        <div className="px-4 py-2 bg-white rounded-t-xl">
          <label htmlFor="comment" className="sr-only">Your answer</label>
          <textarea
            id="comment"
            rows="6"
            value={addAnswer.answer}
            onChange={(e) => setAddAnswer({ ...addAnswer, answer: e.target.value })}
            className="w-full text-sm p-3 rounded-lg"
            style={{
              border: "1px solid #B6B09F",
              backgroundColor: "#FFFFFF",
              color: "#000000",
              resize: "vertical",
            }}
            placeholder="Write an answer..."
            required
          />
        </div>
        <div className="flex justify-end px-4 py-3 border-t" style={{ borderColor: "#B6B09F" }}>
          <button
            type="submit"
            className="hover:opacity-90 transition"
            style={{
              backgroundColor: "#B6B09F",
              color: "#FFFFFF",
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            Post Answer
          </button>
        </div>
      </div>
    </form>
  );
};

export default Testareaanswer;
