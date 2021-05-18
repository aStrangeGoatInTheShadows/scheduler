import React from "react";
import "./styles.scss";
// import classNames from 'classnames'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";
import { getInterview, getInterviewersForDay } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

///////////////////////////////////
// props.intObj contains all interview info
//////////////////////////////

export default function Appointment(props) {
  const { mode, transition, back, resetTo } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("Appointment.props", props);

  const createOrEdit = (editMode = null) => {
    // console.log("This is props.interview in create or edit", props.interview);
    return (
      <Form
        name={editMode && props.interview.student}
        interviewer={editMode && props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={props.onSave}
        id={props.id}
        saving={() => {
          transition(SAVING);
        }}
        happyDone={() => transition(SHOW)}
      />
    );
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.intObj.interviewer}
          id={props.id}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            console.log("you hit edit");
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && createOrEdit()}
      {mode === EDIT && createOrEdit(EDIT)}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={back}
          onConfirm={() => {
            transition(DELETING);
            props.onDelete(props.id, resetTo, EMPTY);
          }}
        />
      )}
    </article>
  );
}
