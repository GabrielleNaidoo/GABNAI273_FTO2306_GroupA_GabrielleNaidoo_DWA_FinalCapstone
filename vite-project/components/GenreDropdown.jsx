import React, { useState } from "react";
import Preview from "./Preview";
import { Select, MenuItem } from "@mui/material";
import styled from "@emotion/styled";

const StyledSelect = styled(Select)`
  && {
    color: #05161a;
    width: 10rem;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  && {
    color: #05161a;
  }
`;

function GenreDropdown(props) {
  return (
    <div className="dropdown-genre">
      <label htmlFor="selectedGenre" className="filter-bar-label">
        Genre:
      </label>
      <StyledSelect
        id="selectedGenre"
        value={props.data.selectedGenreFilter}
        onChange={props.changeHandler}
        name="selectedGenreFilter"
      >
        <StyledMenuItem value="all">All</StyledMenuItem>
        <StyledMenuItem value="personalGrowth">Personal Growth</StyledMenuItem>
        <StyledMenuItem value="trueCrimeAndInvestigativeJournalism">
          True Crime and Investigative Journalism
        </StyledMenuItem>
        <StyledMenuItem value="history">History</StyledMenuItem>

        <StyledMenuItem value="comedy">Comedy</StyledMenuItem>
        <StyledMenuItem value="entertainment">Entertainment</StyledMenuItem>
        <StyledMenuItem value="business">Business</StyledMenuItem>
        <StyledMenuItem value="fiction">Fiction</StyledMenuItem>
        <StyledMenuItem value="news">News</StyledMenuItem>
        <StyledMenuItem value="kidsAndFamily">Kids and Family</StyledMenuItem>
      </StyledSelect>
    </div>
  );
}

export default GenreDropdown;
