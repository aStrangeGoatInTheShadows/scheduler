import React, { useState, useEffect } from "react";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: dayRay[1],
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = function (day) {
    setState((stateClassic) => {
      const newData = { ...stateClassic, day: day };

      return newData;
    });
  };

  return { state, setState, setDay };
};

export { useApplicationData };
