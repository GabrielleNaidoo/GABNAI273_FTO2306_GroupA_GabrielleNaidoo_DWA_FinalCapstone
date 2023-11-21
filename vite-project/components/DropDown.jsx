import React from "react";

function Dropdown(props) {
  return (
    <select
      id="selected"
      value={props.data.selectedValue}
      onChange={props.changeHandler}
      name="selected"
    >
      <option value="all">All</option>
      <option value="alphabetical">A-Z</option>
      <option value="reverse-alphabetical">Z-A</option>
      <option value="newest-to-oldest">Newest to oldest</option>
      <option value="oldest-to-newest">oldest to newest</option>
    </select>
  );
}

export default Dropdown;
