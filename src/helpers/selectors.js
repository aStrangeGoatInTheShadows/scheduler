const getAppointmentsForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter((dayOf) => dayOf.name === day);

  if (filteredDays.length === 0) {
    return [];
  }

  const appIndexs = filteredDays[0].appointments;
  const appointments = [];

  for (let index of appIndexs) {
    appointments.push(state.appointments[index]);
  }

  // console.log(appointments);

  return appointments;
};

const getInterviewersForDay = (state, day) => {
  if (state.days.length === 0) {
    return [];
  }

  const filteredDays = state.days.filter((dayOf) => dayOf.name === day);

  if (filteredDays.length === 0) {
    return [];
  }
  const appIndexs = filteredDays[0].appointments;
  const appointments = [];

  for (let index of appIndexs) {
    appointments.push(state.appointments[index]);
  }

  // console.log("Appointments", appointments);

  const interviewers = [];
  for (let app of appointments) {
    // console.log("this is ", app);
    if (app.interview) {
      if (!interviewers.includes(app.interview.interviewer)) {
        interviewers.push(state.interviewers[app.interview.interviewer]);
      }
    }
  }

  // console.log("this is state", state);
  // console.log("this is interviewers", interviewers);

  return interviewers;
};

// builds and interview object
const getInterview = (state, interview) => {
  // console.log(" THIS IS INTERVIEW WHERE EVERYTHING BLOWS UP", interview);

  if (!interview) {
    return null;
  }
  const { student: student, interviewer: interviewer } = interview;

  for (let a in state.appointments) {
    if (
      state.appointments[a].interview &&
      state.appointments[a].interview.student === student &&
      state.appointments[a].interview.interviewer === interviewer
    ) {
      // console.log("this is state interviewers", state.interviewers);
      return {
        student: student,
        interviewer: {
          id: interviewer,
          name: state.interviewers[interviewer].name,
          avatar: state.interviewers[interviewer].avatar,
        },
      };
    }
  }
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
