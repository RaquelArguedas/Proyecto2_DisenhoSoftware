import React, { useState, useEffect } from "react";

const Clock = () => {
  const [date, setDate] = useState(new Date().toLocaleTimeString('es-CR', { hour12: true , second: undefined}));

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date().toLocaleTimeString('es-CR', { hour12: true }));
  };

  return <p>{date}</p>;
};

export default Clock;