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

  console.log(appointments);

  return appointments;
};

const getInterview = () => {
  return "haha i exist. This function is not implimented as it was not needed";
};

export { getAppointmentsForDay, getInterview };
