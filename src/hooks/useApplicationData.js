import React, { useState, useEffect } from "react";
import { getFreeSpots } from "../helpers/selectors";
const axios = require("axios");
const api = "http://192.168.1.249:8075";

const dayRay = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
        console.log("Failed to add new appointment to server", err);
      });
  };

  ////////////////////////////////// ////////////////////////////////// //////////////////////////////////
  ////////////////////////////////// ////////////////////////////////// //////////////////////////////////
  ////////////////////////////////// ////////////////////////////////// //////////////////////////////////
  //////////////////////////////////  UPDATE SPOTS ON DELETE AND SAVE

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
        console.log("heres freespots ", getFreeSpots(state));
      })
      .catch((err) => {
        sadDelete();
        console.log("Failed to remove appointment from server", err);
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
