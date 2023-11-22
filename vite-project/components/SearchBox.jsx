import React, { useState, useEffect } from "react";

function SearchBox(props) {
  return (
    <div className="search-bar">
      <label
        htmlFor="titleInput"
        style={{ marginRight: "1rem", fontSize: "1.5rem" }}
      >
        {" "}
        Find podcast:{" "}
      </label>
      <input
        id="titleInput"
        type="text"
        name="titleInput"
        value={props.data.titleInput}
        onChange={props.changeHandler}
        placeholder="Title"
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
        }}
      />
    </div>
  );
}

export default SearchBox;

{
  /* <svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="w-6 h-6"
>
<path
  stroke-linecap="round"
  stroke-linejoin="round"
  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
/>
</svg> */
}