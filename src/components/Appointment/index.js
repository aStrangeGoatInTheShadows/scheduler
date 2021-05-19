import React from "react";
import "./styles.scss";
// import classNames from 'classnames'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";
// unused
// import { getInterview, getInterviewersForDay } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

///////////////////////////////////
// props.intObj contains all interview info
//////////////////////////////

export default function Appointment(props) {
  const { mode, transition, back, resetTo, show } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const createOrEdit = (editMode = null) => {
    // console.log("This is props.interview in create or edit", props.interview);
    return (
      <Form
        name={editMode && props.interview.student}
        interviewer={editMode && props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={() => {
          back();
          console.log("Form Cancellation SHOW", show());
        }}
        // editMode={editMode}
        onSave={props.onSave}
        id={props.id}
        saving={() => {
          transition(SAVING);
        }}
        happyDone={() => transition(SHOW)}
        sadDone={() => transition(ERROR_SAVE, true)}
        showHistory={show}
      />
    );
  };

  // console.log("This is show before render", show());
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
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && createOrEdit()}
      {mode === EDIT && createOrEdit(EDIT)}
      {mode === ERROR_SAVE && (
        <Error
          message={"We are unable to save at this time."}
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"We are unable to delete at this time."}
          onClose={() => {
            resetTo(SHOW);
          }}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={back}
          onConfirm={() => {
            transition(DELETING);
            props.onDelete(props.id, resetTo, EMPTY, () =>
              transition(ERROR_DELETE)
            );
          }}
        />
      )}
    </article>
  );
}
