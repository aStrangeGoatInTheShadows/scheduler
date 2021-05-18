import React from "react";
import "./styles.scss";
// import classNames from 'classnames'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "../../hooks/useVisualMode";
import { getInterview, getInterviewersForDay } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

///////////////////////////////////
// props.intObj contains all interview info
//////////////////////////////

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("Appointment.props", props);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.intObj.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={props.onSave}
          id={props.id}
          saving={() => {
            transition(SAVING);
            console.log("transition to savinfg");
          }}
          // onComplete={() => transition(SHOW)}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
    </article>
  );
}
