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
//     4: { id: 4, time: "3pm", interview: null },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },
// };

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
// getAppointmentsForDay(state, day);

export { getAppointmentsForDay };
