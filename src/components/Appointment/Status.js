import React from "react";
// import Button from "../Button";
// import "./styles.scss";
/////////////////////////// STYLES SCSS ONLY NEEDS TO BE IMPORTETED IN THE PARENT MODULE (Appointment/index.js)
// import classNames from 'classnames'

export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
        message={props.message}
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
