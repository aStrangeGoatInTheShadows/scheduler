import React from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={props.interviewer}
          onChange={props.setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
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
The Form component should have the following actions:

setName:Function
setInterviewer:Function
The Form component should take the following props:

name:String
interviewers:Array
interviewer:Number
onSave:Function
onCancel:Function
*/
