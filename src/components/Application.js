import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
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

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = [];

  const setDay = function (day) {
    setState((stateClassic) => {
      const newData = { ...stateClassic, day: day };

      return newData;
    });
  };

  ///////////////// Probably shouldn't push
  ///////// Don't direwctly manipulate state

  useEffect(() => {
    Promise.all([apiGetDays(), apiGetAppointments()]).then((response) => {
      // console.log("useEffect promise.all response", response);

      setState(() => {
        const newState = {
          days: response[0].data,
          appointments: response[1].data,
          day: "Monday",
        };

        const allApps = [];

        console.log(
          `This is newState from API call in setState`,
          newState.appointments
        );

        for (let app in newState.appointments) {
          // console.log(newState.appointments[app]);
          allApps.push(newState.appointments[app]);
        }

        dailyAppointments.push(...allApps);

        // dailyAppointments.push(...newState.appointments);

        return { ...newState };
      });
    });
  }, []);

  // dailyAppointments.push[...useState.appointments];
  // console.log("this is use state appointments", useState.appointments);

  console.log("premap dailyAppointments", dailyAppointments);
  const appArr = dailyAppointments.map((appointment) => {
    console.log("Map ", appointment);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });

  appArr.push(<Appointment key="last" time="5pm" />);

  // console.log("This is dailyAppointments prerender", dailyAppointments);

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
}
