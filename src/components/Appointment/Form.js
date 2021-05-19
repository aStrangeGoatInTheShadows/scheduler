import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import { objToArray } from "helpers/ductTape.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("You must select an interviewer");
      return;
    }

    props.onSave(name, interviewer, props.id, props.happyDone, props.sadDone);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={objToArray(props.interviewers)}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={() => {
              props.onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            data-testid="save-button"
            onClick={() => {
              validate();
              props.saving();
            }}
            confirm
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
