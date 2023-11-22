import React from "react";

function Dropdown(props) {
  return (
    <div className="dropdown-main-page">
      <label
        htmlFor="selectedFilter"
        style={{ marginRight: "1rem", fontSize: "1.5rem" }}
      >
        Filter by:
      </label>
      <select
        id="selectedFilter"
        value={props.data.selectedValueFilter}
        onChange={props.changeHandler}
        name="selectedValueFilter"
        style={{
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        <option value="alphabetical">A-Z</option>
        <option value="reverse-alphabetical">Z-A</option>
        <option value="newest-to-oldest">Newest to oldest</option>
        <option value="oldest-to-newest">oldest to newest</option>
      </select>
    </div>
  );
}

export default Dropdown;
