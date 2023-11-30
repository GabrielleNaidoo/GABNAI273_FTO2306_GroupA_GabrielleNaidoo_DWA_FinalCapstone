import React, { useState } from "react";
import Preview from "./Preview";
import { Select } from "@mui/material";
import styled from "@emotion/styled";

function GenreDropdown(props) {
  return (
    <div className="dropdown-genre-page">
      <label
        htmlFor="selectedGenre"
        style={{ marginRight: "1rem", fontSize: "1.5rem" }}
      >
        Genre:
      </label>
      <select
        id="selectedGenre"
        value={props.data.selectedGenreFilter}
        onChange={props.changeHandler}
        name="selectedGenreFilter"
        style={{
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        <option value="all">All</option>
        <option value="personalGrowth">Personal Growth</option>
        <option value="trueCrimeAndInvestigativeJournalism">
          True Crime and Investigative Journalism
        </option>
        <option value="history">History</option>

        <option value="comedy">Comedy</option>
        <option value="entertainment">Entertainment</option>
        <option value="business">Business</option>
        <option value="fiction">Fiction</option>
        <option value="news">News</option>
        <option value="kidsAndFamily">Kids and Family</option>
      </select>
    </div>
  );
}

export default GenreDropdown;
