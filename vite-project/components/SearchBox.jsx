import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

const StyledTextField = styled(TextField)`
  && {
    color: #05161a;
    width: 10rem;
    background-color: #a9a9a9;
  }
`;

function SearchBox(props) {
  return (
    <div className="search-bar">
      <label htmlFor="titleInput" className="filter-bar-label">
        Search Titles
      </label>
      <StyledTextField
        id="titleInput"
        type="text"
        name="titleInput"
        value={props.data.titleInput}
        onChange={props.changeHandler}
        placeholder="Title"
      />
    </div>
  );
}

export default SearchBox;
