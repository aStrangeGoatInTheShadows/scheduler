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

  return appointments;
};

const getFreeSpots = (state) => {
  const apps = getAppointmentsForDay(state, state.day);
  let count = 0;

  for (let a of apps) {
    if (!a.interview) {
      count++;
    }
  }

  return count;
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

  const interviewers = [];
  for (let app of appointments) {
    if (app.interview) {
      if (!interviewers.includes(app.interview.interviewer)) {
        interviewers.push(state.interviewers[app.interview.interviewer]);
      }
    }
  }
  return interviewers;
};

// builds an interview object
const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const { student, interviewer } = interview;

  for (let a in state.appointments) {
    if (
      state.appointments[a].interview &&
      state.appointments[a].interview.student === student &&
      state.appointments[a].interview.interviewer === interviewer
    ) {
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

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  getFreeSpots,
};
