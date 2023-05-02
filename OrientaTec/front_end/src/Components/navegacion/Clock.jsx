import React, { useState, useEffect } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString('es-CR', { hourCycle: "h12"}));

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date().toLocaleTimeString('es-CR', { hourCycle: "h12" }));
  };

  return <p>{date}</p>;
};

export default Clock;