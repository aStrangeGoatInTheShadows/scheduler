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

  ///////////////// Probably shouldn't push
  ///////// Don't direwctly manipulate state

  useEffect(() => {
    Promise.all([apiGetDays(), apiGetAppointments()]).then((response) => {
      setState(() => {
        const newState = {
          days: response[0].data,
          appointments: response[1].data,
          day: "Monday",
        };

        return { ...newState };
      });
    });
  }, []);

  const appArr = dailyAppointments.map((appointment) => {
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
              <DayList
                days={state.days}
                day={state.day}
                setDay={setState.day}
              />
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
