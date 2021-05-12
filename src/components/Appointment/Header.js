import React from "react";
// import "./styles.scss";
/////////////////////////// STYLES SCSS ONLY NEEDS TO BE IMPORTETED IN THE PARENT MODULE (Appointment/index.js)
// import classNames from 'classnames'

/////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// ///////////////////////////
// The Form component is a bit more complicated than the rest. We will save it for the next activity.
/////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// ///////////////////////////
// https://web.compass.lighthouselabs.ca/activities/1209
// Reread if confused

export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
