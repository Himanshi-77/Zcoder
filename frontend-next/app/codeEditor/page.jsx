"use client";

import React, { useState, useEffect } from 'react';
import LanguagesDropdown from '../components/LanguagesDropdown';
import ThemeDropdown from '../components/ThemeDropdown';
import CodeEditorWindow from '../components/CodeEditorWindow';
import OutputWindow from '../components/OutputWindow';
import OutputDetails from '../components/OutputDetails';
import CustomInput from '../components/CustomInput';
import axios from "axios";
import { defineTheme } from "../lib/defineTheme";
import { languageOptions } from "../constants/languageOptions";

const defaultCode = "console.log('Hello World');";

const EditorPage = () => {
  const [language, setLanguage] = useState(languageOptions[0]);
  const [theme, setTheme] = useState("cobalt");
  const [code, setCode] = useState(defaultCode);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);

  const onSelectChange = (selection) => setLanguage(selection);

  const onChange = (action, data) => {
    if (action === "code") setCode(data);
  };

  const handleThemeChange = (themeOption) => {
    if (["light", "vs-dark"].includes(themeOption.value)) {
      setTheme(themeOption);
    } else {
      defineTheme(themeOption.value).then(() => setTheme(themeOption));
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
        'Content-Type': 'application/json',
      },
      data: formData,
    };

    axios.request(options)
      .then((response) => checkStatus(response.data.token))
      .catch((err) => {
        const error = err.response ? err.response.data : err;
        const status = err.response ? err.response.status : err;
        if (status === 429) console.log("Too many requests. Quota exceeded.");
        setProcessing(false);
        console.log("Error:", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => checkStatus(token), 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
      }
    } catch (err) {
      console.error("Status check error:", err);
      setProcessing(false);
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Language & Theme dropdowns */}
      <div className="flex md:flex-row flex-col items-center pt-4">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} language={language} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>

      {/* Editor + Output */}
      <div className="flex md:flex-row flex-col space-x-0 md:space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full md:h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme?.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-full md:w-[30%] flex-col mt-4 md:mt-0">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={`mt-5 px-6 py-2 rounded-3xl font-semibold border-2 border-black text-white bg-[#B6B09F] hover:opacity-90 transition-all duration-300 ${
                !code ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
