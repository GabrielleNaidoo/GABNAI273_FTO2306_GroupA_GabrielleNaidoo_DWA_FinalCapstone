import React from "react";
import { Select, MenuItem } from "@mui/material";
import styled from "@emotion/styled";

const StyledSelect = styled(Select)`
  && {
    color: #05161a;
    width: 10rem;
  }
`;

function Dropdown(props) {
  return (
    <div className="dropdown-order">
      <label htmlFor="selectedFilter" className="filter-bar-label">
        Filter by:
      </label>
      <StyledSelect
        id="selectedFilter"
        value={props.data.selectedValueFilter}
        onChange={props.changeHandler}
        name="selectedValueFilter"
      >
        <MenuItem value="alphabetical">A-Z</MenuItem>
        <MenuItem value="reverse-alphabetical">Z-A</MenuItem>
        <MenuItem value="newest-to-oldest">Newest to oldest</MenuItem>
        <MenuItem value="oldest-to-newest">oldest to newest</MenuItem>
      </StyledSelect>
    </div>
  );
}

export default Dropdown;
