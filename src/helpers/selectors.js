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

// builds and interview object
const getInterview = (state, interview) => {
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

export { getAppointmentsForDay, getInterview };
