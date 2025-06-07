"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Alert } from "@mui/material";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    techstack: [],
    favlang: "",
  });

  const [tags, setTags] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [alertOpt, setAlertOpt] = useState("");
  const [errMsg, setErrmsg] = useState("");
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value.trim();
    if (!value || tags.includes(value)) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Backspace" && e.target.value === "") {
        setTags((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  useEffect(() => {
    setPasswordMatch(form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword]);

  useEffect(() => {
    const filled =
      form.name &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.email.toLowerCase().endsWith("@gmail.com");
    setButtonDisabled(!filled);
  }, [form]);

  const handleSubmit = async () => {
    if (!passwordMatch) return;
    try {
      const payload = { ...form, techstack: tags };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
        payload
      );
      if (res.data.success) {
        setAlertOpt("success");
        setTimeout(() => router.push("/user/login"), 1000);
      } else {
        setAlertOpt("error");
        setErrmsg(res.data.message);
      }
    } catch (err) {
      setAlertOpt("error");
      setErrmsg("Something went wrong, Try again!");
      console.error(err);
    }
  };

  return (
    <>
      {alertOpt && (
        <div className="absolute top-4 w-full px-4 z-50">
          <Alert severity={alertOpt}>
            {alertOpt === "success" ? "User created successfully!" : errMsg}
          </Alert>
        </div>
      )}

      {/* Zcoder header styled exactly like Login page */}
      <div className="w-full flex justify-center mt-12 mb-8 font-extrabold font-sans" style={{ fontSize: "4rem", color: "#000000", lineHeight: 1, letterSpacing: "-0.025em" }}>
        Zcoder
      </div>

      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] px-4">
        <div className="w-full max-w-5xl flex bg-white rounded-xl shadow-xl border border-[#B6B09F] overflow-hidden">
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-center items-start p-8 w-1/2 bg-[#B6B09F] text-white">
            <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
            <p className="text-sm opacity-90 mb-10">
              Join Zcoder to code together, solve problems, and collaborate!
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 bg-white">
            <h2 className="text-2xl font-semibold text-black mb-6">Sign Up</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email <span className="text-xs text-gray-500">(must end with @gmail.com)</span>
              </label>
              <input
                type="email"
                placeholder="you@gmail.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
              />
              {!passwordMatch && (
                <span className="text-xs text-red-500 absolute top-full mt-1">
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Tech Stack Tags */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Tech Stack (press enter to add)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-[#B6B09F] text-white px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="e.g. React"
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={buttonDisabled}
              className={`w-full py-2.5 text-white font-semibold rounded-lg transition-colors duration-200 mb-4 ${
                buttonDisabled
                  ? "bg-[#B6B09F]/50 cursor-not-allowed"
                  : "bg-[#B6B09F] hover:bg-[#a49c89]"
              }`}
            >
              Sign Up
            </button>

            {/* Already Have Account */}
            <p className="text-sm text-gray-500 text-center">Already have an account?</p>
            <button
              type="button"
              onClick={() => router.push("/user/login")}
              className="mt-2 w-full py-2.5 bg-black text-white text-sm rounded-lg hover:bg-[#333] transition"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
