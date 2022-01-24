import React, { useState } from "react";
import HistoryTemplate from "./HistoryTemplate";
import "./HistoryMain.scss";
import HistoryBookedEvent from "./HistoryBookedEvent";

const History = () => {
  const [isVisibleMyEventsHistory, setIsVisibleMyEventsHistory] =
    useState(false);
  const [isVisibleBookedEventsHistory, setIsVisibleBookedEventsHistory] =
    useState(true);

  const handleClick = (
    isVisibleMyEventsHistory,
    isVisibleBookedEventsHistory
  ) => {
    setIsVisibleMyEventsHistory(isVisibleMyEventsHistory);
    setIsVisibleBookedEventsHistory(isVisibleBookedEventsHistory);
  };
  return (
    <>
      <div className="historyMain">
        <div className="userTabs">
          <button
            className={"tab" + (isVisibleBookedEventsHistory ? " active" : "")}
            onClick={() => handleClick(false, true, false, false)}
          >
            My Visited Events
          </button>
          <button
            className={"tab" + (isVisibleMyEventsHistory ? " active" : "")}
            onClick={() => handleClick(true, false, false, false)}
          >
            My Events
          </button>
        </div>

        {isVisibleMyEventsHistory && <HistoryTemplate />}
        {isVisibleBookedEventsHistory && <HistoryBookedEvent />}
      </div>
    </>
  );
};

export default History;
