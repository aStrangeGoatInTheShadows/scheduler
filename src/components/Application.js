import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

// require("dotenv").config();
const axios = require("axios");

const api = "http://192.168.1.249:8075";

const apiGetAppointments = function () {
  return axios.get(`${api}/api/appointments`);
};

const apiGetDays = function () {
  return axios.get(`${api}/api/days`);
};

const apiGetInterviewers = function () {
  return axios.get(`${api}/api/interviewers`);
};

const dayRay = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const makeWebpageOrSomething = function (state, appArr, setDay) {
  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />

            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList days={state.days} day={state.day} setDay={setDay} />
            </nav>

            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </>
        }
      </section>
      <section className="schedule">{[...appArr]}</section>
    </main>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////////
// Takes in the state from application, converts it to an array, maps out into an HTML element
// input : Object of appointments from API
// Output : React component HTML to render to dom
//////////////////////////////////////////////////////////////////////////////////////////
// const appArr = makeAppointmentComponent(state.appointments, state.day);
// const makeAppointmentComponent = (appStateIn, currentDay) => {
const makeAppointmentComponent = (s) => {
  const appArr = getAppointmentsForDay(s, s.day).map((appointment) => {
    let inter = {};
    if (appointment.interview) {
      inter = getInterview(s, appointment.interview);
    }

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewers={s.interviewers}
        intObj={inter}
      />
    );
  });
  appArr.push(<Appointment key="last" time="5pm" />);

  return appArr;
};

/////////////////////////// START OF FUNCTION /////////////////////////////////////////
/////////////////////////// START OF APPLICATION FUNCTION /////////////////////////////////////////

export default function Application(props) {
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

  ///////////////// Probably shouldn't push
  ///////// Don't direwctly manipulate state

  ///////////////// ///////////////// ///////////////// ///////////////// ///////////////// /////////////////
  /////////////////////////// API CALLS //////////////////////////////////////////////
  ///////////////// ///////////////// ///////////////// ///////////////// ///////////////// /////////////////

  useEffect(() => {
    Promise.all([
      apiGetDays(),
      apiGetAppointments(),
      apiGetInterviewers(),
    ]).then((response) => {
      setState((stateClassic) => {
        const newState = {
          days: response[0].data,
          appointments: response[1].data,
          day: stateClassic.day,
          interviewers: response[2].data,
        };

        return newState;
      });
    });
  }, []);

  ///////////////// ///////////////// ///////////////// ///////////////// ///////////////// /////////////////
  /////////////////////////// END API CALLS //////////////////////////////////////////////
  ///////////////// ///////////////// ///////////////// ///////////////// ///////////////// /////////////////

  const appArr = makeAppointmentComponent(state);

  // Builds the DOM
  return makeWebpageOrSomething(state, appArr, setDay);
}
