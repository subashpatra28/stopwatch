import React from "react";
const History = ({ timerHistory }) => {
  return React.createElement(
    "ul",
    { className: "history" },
    timerHistory.map((timer, index) =>
      React.createElement("li", { key: index }, timer.time)
    )
  );
};
export default History;
