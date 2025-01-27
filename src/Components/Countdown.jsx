import React, { useState, useEffect } from "react";

const Countdown = ({ timeLeft}) => {

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed-top d-flex justify-content-center align-items-center p-2 bg-primary text-white">
      <h4>
        Time Left: {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </h4>
    </div>
  );
};

export default Countdown;
