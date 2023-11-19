import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ContextDisplay from "./components/ContextDisplay";
import QAPage from "./components/QAPage";

function App() {
  const [file, setFile] = useState(null);
  const isFileUploaded = file;

  return (
    <div className="flex flex-col">
      <section className="flex flex-col min-h-screen">
        <Header isFileUploaded={isFileUploaded} file={file} />
        {isFileUploaded ? (
          <QAPage file={file} />
        ) : (
          <HomePage file={file} setFile={setFile} />
        )}
      </section>
    </div>
  );
}

export default App;
