import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QADisplay({
  currentContext,
  shouldFetchData,
  setShouldFetchData,
}) {
  const [qaData, setQAData] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (index) => {
    const isSelected = selectedRows.includes(index);

    if (isSelected) {
      // If already selected, remove from the list
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      // If not selected, add to the list
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleDeleteData = async () => {
    // Build the request body with selected data
    
    const selectedData = selectedRows.map((index) => qaData[index]);
    console.log(selectedData)
    const selectedIds = selectedData.map((data) => data.id);
    try {
      const response = await axios.post("api/qa_data/qa_data_delete/", {
        selected_ids: selectedIds,
      });
      const updatedData = await getQAData(currentContext);
      setQAData(updatedData.data.QAData);
    } catch (error) {
      console.error("Error deleting entries", error);
    }
  };

  const getQAData = async (context) => {
    try {
      console.log("Getting QA data");
      const context_id = context.id;
      const response = await axios.get("/api/qa_data/", {
        params: { context_id: context_id },
      });
      console.log("Get QA Data Success: ", response);
      return response;
    } catch (error) {
      console.error("Get QA Data Error: ", error);
    }
  };

  useEffect(() => {
    if (shouldFetchData && currentContext) {
      console.log("Fetching for:", currentContext);
      getQAData(currentContext).then((response) => {
        setQAData(response.data.QAData);
      });
      setShouldFetchData(false)
    }
  }, [currentContext, shouldFetchData]);

  return (
    <>
      {qaData ? (
        <div className="overflow-x-auto">
          <table className="table table-auto">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <button
                    className="btn btn-xs btn-circle"
                    disabled={selectedRows.length === 0}
                    onClick={handleDeleteData}
                  >
                    <i className="text-error fa-solid fa-trash"></i>
                  </button>
                </th>
                <th className="px-16 w-full">
                  <span className="font-bold"> Question </span>
                </th>
                <th className="px-16 w-full">
                  <span className="font-bold">Answer </span>
                </th>
                <th className="px-16 w-full">
                  <span className="font-bold">Answer Start</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {qaData.map((data, index) => (
                <tr key={index}>
                  <th className="px-16 w-full">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className="checkbox checkbox-sm"
                      />
                    </label>
                  </th>
                  <td className="px-16 w-full">{data.question}</td>
                  <td className="px-16 w-full">{data.answer}</td>
                  <td className="px-16 w-full">{data.answer_start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
