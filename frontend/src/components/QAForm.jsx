import React, { useEffect, useState } from "react";
import axios from "axios";

export default function QAForm({
  contextList,
  currentContext,
  shouldFetchData,
  setShouldFetchData,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1);

  const handleTypedQuestion = (e) => {
    // console.log("Typed Question: ", e.target.value);
    setQuestion(e.target.value);
  };

  const handleSetAnswer = () => {
    setAnswer({
      text: selectedText,
      answer_start: selectedTextIndex,
    });
    setShowAnswer(true);
  };

  const handleSelectedText = () => {
    const selection = window.getSelection();
    setSelectedText(selection.toString());
    setSelectedTextIndex(selection.anchorOffset);
  };

  const handleReset = () => {
    setAnswer({});
    setQuestion("");
    setShowAnswer(false);
  };

  const submitData = async (currentContext) => {
    try {
      const data = {
        context: currentContext,
        question: question,
        answer: answer,
      };
      const response = await axios.post("/api/qa_data/", data);
      console.log("Submit Data Success: ", response);
      setShouldFetchData(true);
    } catch (error) {
      console.error("Submit Data Error: ", error);
    }
  };

  const handleSubmit = () => {
    submitData(currentContext);
  };

  return (
    <>
      <div className="flex justify-center items-center space-x-14 w-full">
        <textarea
          id="question"
          value={question}
          className="p-2 mb-4 w-full rounded border border-gray-500 resize-none textarea textarea-primary"
          placeholder="Type question here . . . "
          onChange={handleTypedQuestion}
        />
        {showAnswer ? (
          <textarea
            readOnly
            value={answer.text}
            className="p-2 mb-4 w-full rounded border border-gray-500 resize-none textarea textarea-primary"
          ></textarea>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-center py-4 space-x-14 w-full">
        <button className="w-36 btn" onClick={handleReset}>
          Reset <i className="fa-solid fa-arrows-rotate"></i>
        </button>

        <button
          className="w-36 btn btn-primary"
          onClick={handleSetAnswer}
          onMouseUp={handleSelectedText}
          disabled={!question}
        >
          {/* New button adjacent to the textarea */}
          Answer <i className="fa-solid fa-check"></i>
        </button>

        <button
          className="w-36 btn btn-accent"
          onClick={handleSubmit}
          disabled={!showAnswer}
        >
          Submit <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </>
  );
}
