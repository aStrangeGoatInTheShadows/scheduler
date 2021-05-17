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

  // The Form component should have the following actions:
  //   setName:Function
  // setInterviewer:Function

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
          <Button onClick={props.onSave} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

/* MARK AS YOU GOs

Add the base HTML in the return statement of our component
Create & Import a CSS / SCSS file holding the style of our component
Write stories for Storybook to render our component in isolation
Refactor the hard coded content to use props & state

///////////////////////       Read Periodically           //////////////////////////
In the Controlled Form activity we had to make a decision. 
Do we keep interviewer and setInterviewer or do we refactor to use value and onChange instead? 
The above code uses onChange. 
So if our props are different, then they will need to be updated here as well.
////////////////////////////////////////////////////////


The Form component should track the following state:

name:String
interviewer:Number




// The Form component should take the following props:

name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function
*/
