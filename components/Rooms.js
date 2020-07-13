import React from "react";

const Rooms = (props) => {
  const { connected, allrooms } = props;

  return (
    <select name="rooms" disabled={connected}>
      <option key="default">Choose your room!</option>
      {allrooms.map((e, i) => (
        <option key={i}>{e.room}</option>
      ))}
    </select>
  );
};

export default Rooms;
