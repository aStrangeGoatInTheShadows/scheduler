import React from "react";

// import { getByPlaceholderText, getByTestId } from "@testing-library/jest-dom";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: "12pm", interview: null },
//     2: { id: 2, time: "1pm", interview: null },
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 },
//     },
//     4: {
//       id: 4,
//       time: "3pm",
//       interview: { student: "Archie Cohen", interviewer: 1 },
//     },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },

//   interviewers: {
//     1: {
//       id: 1,
//       name: "Sylvia Palmer",
//       avatar: "https://i.imgur.com/LpaY82x.png",
//     },
//     2: {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png",
//     },
//   },
// };

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const save = jest.fn();
    const saving = jest.fn();

    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={save}
        saving={saving}
        name={""}
      />
    );
    fireEvent.click(getByText("Save"));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(save).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const save = jest.fn();
    const saving = () => {
      console.log("hello");
    };
    const { queryByText, getByText, onSave } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Miller-Jones"
        onSave={save}
        interviewer={interviewers[0]}
        saving={saving}
      />
    );
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    fireEvent.click(getByText("Save"));

    /* 4. onSave is called once*/
    expect(save).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(save).toHaveBeenCalledWith(
      "Lydia Miller-Jones",
      interviewers[0],
      undefined,
      undefined,
      undefined
    );
  });
});
