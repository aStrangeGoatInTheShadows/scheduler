import React from "react";
import "./styles.scss";
// import classNames from 'classnames'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

/////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// ///////////////////////////
// The Form component is a bit more complicated than the rest. We will save it for the next activity.
/////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// /////////////////////////// ///////////////////////////

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {!props.interview && props.id !== "last" && <Empty />}
      {props.interview && (
        <Show
          interviewer={props.interview.interviewer}
          student={props.interview.student}
        />
      )}
    </article>
  );
}
