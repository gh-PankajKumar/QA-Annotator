import React, { useEffect, useState } from "react";
import axios from "axios";
import QAList from "./QADisplay";
import QAForm from "./QAForm";
import ContextDisplay from "./ContextDisplay";
import QADisplay from "./QADisplay";

export default function QAPage({ file }) {
  const [contextList, setContextList] = useState([]);
  const [currentContext, setCurrentContext] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  const handleCurrentContextChange = (newState) => {
    setCurrentContext(newState);
  };

  const handleShouldFetchDataChange = (newState) => {
    setShouldFetchData(newState);
  };

  const contextFromFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/context_upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Read Context Success: ", response);
      setContextList(response.data.context_list);
    } catch (error) {
      console.error("Read Context Error:", error);
    }
  };

  const exportQAData = async (contextList) => {
    try {
      const response = await axios.get("api/qa_data/export_qa_data/", {
        params: { context_list: contextList },
      });
    } catch (error) {
      console.error("Error exporting data", error);
    }
  };

  const handleExportData = () => {
   exportQAData(contextList)

  }

  useEffect(() => {
    contextFromFile(file);
  }, [file]);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div>
        <button className="w-36 btn btn-primary" onClick={handleExportData}> 
          Test Export
        </button>
      </div>
      <div className="text-center">
        <ContextDisplay
          contextList={contextList}
          onCurrentContextChange={handleCurrentContextChange}
        />
      </div>
      <div className="flex flex-col items-center mt-4 max-w-2xl">
        <QAForm
          contextList={contextList}
          currentContext={currentContext}
          shouldFetchData={shouldFetchData}
          setShouldFetchData={handleShouldFetchDataChange}
        />
      </div>
      <div className="w-10/12">
        <div className="justify-center divider"></div>
      </div>
      <div className="">
        <QADisplay
          currentContext={currentContext}
          shouldFetchData={shouldFetchData}
          setShouldFetchData={setShouldFetchData}
        />
      </div>
    </div>
  );
}
