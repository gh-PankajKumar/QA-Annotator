import React, { useState, useRef } from "react";
import axios from "axios";
export default function HomePage(props) {
  const { file, setFile } = props;
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <main className="flex flex-col flex-1 gap-3 justify-center p-4 pb-40 text-center sm:gap-4 md:gap-5">
      <h1 className="text-4xl font-black text-primary sm:text-5xl md:text-6xl">
        QA{" "}
        <span className="text-2xl text-base-content sm:text-3xl md:text-4xl">
          Annotator
        </span>
      </h1>
      <h3 className="font-semibold md:text-xs text-secondary">
        Context <span className="text-base-content">&#43;</span> Question{" "}
        <span className="text-base-content">&#43;</span> Answer{" "}
        <span className="text-base-content">&#61;</span> Dataset
      </h3>
      <button
        onClick={() => fileInputRef.current.click()}
        className="flex gap-4 justify-between items-center px-4 py-2 mx-auto my-4 w-72 max-w-full text-xs btn btn-xs sm:btn-sm md:btn-md"
      >
        <p>
          Upload Context{" "}
          <span className="text-xs text-base-content">.csv file format</span>
        </p>

        <i className="text-primary fa-solid fa-upload"></i>
      </button>
      <input
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
        type="file"
        accept=".csv"
      />

      <div className="gap-4 justify-between mx-auto my-4 w-72 max-w-full text-xs text-base-content">
        <i className="fa-solid fa-circle-info"></i>
        <p className="py-2 text-justify text-base-content">
          A tool to create SQuAD like datasets. Only .csv files are supported
          with header "context" and each context paragraph starting on a new
          line.
        </p>
        <p className="py-2 text-justify text-base-content">
          To use, upload a valid file, write questions and highlight the answers
          in the displayed context. You can write multiple questions and answers
          per context.
        </p>
        <p className="py-2 text-justify text-base-content">
          This was quickly created to help with my PhD work. As such, it is not
          perfectly designed and there may be bugs in the code. Use at your own
          caution!
        </p>
      </div>
    </main>
  );
}
