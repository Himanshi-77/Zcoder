"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert } from "@mui/material";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [alertOpt, setAlertOpt] = useState("");
  const [errMsg, setErrmsg] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        form
      );
      if (res.data.success === true) {
        window.sessionStorage.setItem("token", res.data.token);
        router.push("/");
      } else {
        setAlertOpt("error");
        setErrmsg(res.data.message || "Login failed");
      }
    } catch (err) {
      setAlertOpt("error");
      setErrmsg("Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(form.email && form.password));
  }, [form]);

  return (
    <>
      {/* Zcoder Title on Top Center */}
      <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50">
        <span className="text-6xl font-extrabold text-black select-none cursor-default">
          Zcoder
        </span>
      </div>

      {alertOpt && (
        <div className="absolute top-28 w-full px-4 z-50">
          <Alert severity={alertOpt}>
            {alertOpt === "success" ? "Login successful!" : errMsg}
          </Alert>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] px-4">
        <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-xl border border-[#B6B09F] overflow-hidden">
          {/* Left Panel */}
          <div className="hidden md:flex flex-col justify-center items-start p-8 w-1/2 bg-[#B6B09F] text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-sm opacity-90 mb-10">
              Log in to access your coding dashboard, solve problems, and join rooms!
            </p>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-1/2 p-8 bg-white">
            <h2 className="text-2xl font-semibold text-black mb-6">Sign in</h2>

            {/* Email Input */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#B6B09F]"
                placeholder="******"
              />
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={buttonDisabled}
              className={`w-full py-2.5 text-white font-semibold rounded-lg transition-colors duration-200 ${
                buttonDisabled
                  ? "bg-[#B6B09F]/50 cursor-not-allowed"
                  : "bg-[#B6B09F] hover:bg-[#a49c89]"
              }`}
            >
              Log In
            </button>

            {/* Redirect to Signup */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Don&apos;t have an account?</p>
              <Link href="/user/signup">
                <button className="mt-2 w-full py-2.5 bg-black text-white text-sm rounded-lg hover:bg-[#333] transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
