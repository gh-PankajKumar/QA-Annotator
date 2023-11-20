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
  const [csvData, setCSVData] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

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
      const response = await axios.post("api/qa_data/export_qa_data/", {
        context_list: contextList,
      });
      const responseData = response.data;
      console.log(responseData);
      setCSVData(responseData);
    } catch (error) {
      console.error("Error exporting data", error);
    }
  };

  const handleExportData = () => {
    exportQAData(contextList);
  };

  const downloadCsv = () => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_qa_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportLoading(false);
  };

  useEffect(() => {
    if (csvData !== null && csvData !== "") {
      setExportLoading(true);
      downloadCsv();
    }
  }, [csvData]);

  useEffect(() => {
    contextFromFile(file);
  }, [file]);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
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
      <div className="w-10/12">
        <div className="justify-center divider"></div>
      </div>
      <div className="py-8">
        <button
          className="w-36 btn btn-primary"
          onClick={handleExportData}
          disabled={exportLoading}
        >
          {exportLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            "Export Data"
          )}
        </button>
      </div>
    </div>
  );
}
