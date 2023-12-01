import React from "react";
import { Select, MenuItem } from "@mui/material";
import styled from "@emotion/styled";

const StyledSelect = styled(Select)`
  && {
    color: #05161a;
    width: 10rem;
    background-color: #a9a9a9;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    color: #05161a;
  }
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 1rem;
    }
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
        <StyledMenuItem value="alphabetical">A-Z</StyledMenuItem>
        <StyledMenuItem value="reverse-alphabetical">Z-A</StyledMenuItem>
        <StyledMenuItem value="newest-to-oldest">
          Newest to oldest
        </StyledMenuItem>
        <StyledMenuItem value="oldest-to-newest">
          oldest to newest
        </StyledMenuItem>
      </StyledSelect>
    </div>
  );
}

export default Dropdown;
