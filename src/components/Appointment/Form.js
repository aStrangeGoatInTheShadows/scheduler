import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import { objToArray } from "helpers/ductTape.js";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  console.log("This is props in form", props);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </form>
        <InterviewerList
          interviewers={objToArray(props.interviewers)}
          interviewer={interviewer}
          setInterviewer={setInterviewer} // Passes state CALLBACK down as prop to interviewer list
          ///////////////////////////////////// HERE
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel && cancel}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (name && interviewer) {
                props.onSave(name, interviewer, props.id, props.happyDone);
                props.saving();
              }
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
