import { useState } from "react";
import { getFreeSpots } from "../helpers/selectors";
const axios = require("axios");

require("dotenv").config();
const api = `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}`;

const dayRay = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//////////////////////////////////////////////////////////////////
// This is a custom hook to manage the state of our data
const useApplicationData = function () {
  const [state, setState] = useState({
    day: dayRay[1],
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Makes an api call to the server to insert data.
  // Updates the spots available and provides an error on failure
  const bookInterview = function (id, interview, happyDone, sadDone) {
    axios
      .put(`${api}/api/appointments/${id}`, { interview })
      .then((res) => {
        setState((sClassic) => {
          const newData = { ...sClassic };
          newData.appointments[id].interview = interview;
          newData.days[dayRay.indexOf(state.day) - 1].spots =
            getFreeSpots(state);
          return newData;
        });

        happyDone();
      })
      .catch((err) => {
        sadDone();
      });
  };

  function deleteApp(id, happyDelete, mode, sadDelete) {
    axios
      .delete(`${api}/api/appointments/${id}`)
      .then((res) => {
        happyDelete(mode);

        setState((sClassic) => {
          const newData = { ...sClassic };
          newData.appointments[id].interview = null;
          newData.days[dayRay.indexOf(state.day) - 1].spots =
            getFreeSpots(state);

          return newData;
        });
      })
      .catch(() => {
        sadDelete();
      });
  }

  function save(name, interviewer, id, happyDone, sadDone) {
    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(id, interview, happyDone, sadDone);
  }

  const setDay = function (day) {
    setState((stateClassic) => {
      const newData = { ...stateClassic, day: day };
      return newData;
    });
  };
  return { state, setState, setDay, bookInterview, save, deleteApp };
};

export { useApplicationData };
