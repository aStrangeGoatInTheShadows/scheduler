import React from "react";
import PropTypes from "prop-types";
import "./InterviewerList.scss";
// import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  ///////////////////// THIS IS CRASHING BECAUSE ITS AN OBJ AND NOT AN ARRAY

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  const interviewersList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
}
