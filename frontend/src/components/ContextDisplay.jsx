import React, { useEffect, useState } from "react";

export default function ContextDisplay({
  contextList,
  onCurrentContextChange,
}) {
  const [contextIndex, setContextIndex] = useState(0);

  useEffect(() => {
    onCurrentContextChange(contextList[contextIndex]);
  }, [onCurrentContextChange, contextIndex]);

  const handlePrevButton = () => {
    setContextIndex(contextIndex - 1);
    console.log("Prev button pressed");
  };

  const handleNextButton = () => {
    setContextIndex(contextIndex + 1);
    console.log("Next button pressed");
  };

  return (
    <main>
      <div className="flex flex-row justify-center pb-16">
        <div className="join">
          <button
            className="join-item btn"
            onClick={handlePrevButton}
            disabled={contextIndex === 0}
          >
            «
          </button>
          <button className="px-4 join-item btn-neutral no-animation btn-active">
            Context: {contextIndex + 1}/{contextList.length}
          </button>
          <button
            className="join-item btn"
            onClick={handleNextButton}
            disabled={contextIndex === contextList.length - 1}
          >
            »
          </button>
        </div>
      </div>
      <div className="flex overflow-auto px-4 pb-8 mx-auto w-10/12 h-96 shadow-xl card bg-base-100">
        <div className="items-center text-justify card-body">
          <h2 className="card-title">Context: </h2>
          <p>{contextList[contextIndex]?.context}</p>
        </div>
      </div>
    </main>
  );
}
