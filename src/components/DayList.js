import React from "react";
// import classNames from "classnames";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  console.log("props map");
  const ourDays = props.days.map((day) => {
    // console.log(`day${day.id} of `, day);

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{ourDays}</ul>;
}
