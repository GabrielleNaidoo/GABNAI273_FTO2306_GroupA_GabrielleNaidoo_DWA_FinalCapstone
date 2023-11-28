import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, Chip } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  && {
    background-color: #05161a;
    padding: 0.4rem 0.8rem;
    border-radius: 1rem;
    color: #f7f7f7;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledChip = styled(Chip)`
  && {
    padding: 0.1rem 0.2rem;
    background-color: #294d61;
    color: #ffffff;
    font-weight: 500;
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #0c7075;
    padding: 0.2rem 0.4rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
`;

function Preview(props) {
  const genreTitle = {
    0: "All",
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const date = new Date(props.podcastData.updated);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const lastUpdated = `${day} / ${month} / ${year}`;

  const genreMap = props.podcastData.genres.map((genre) => {
    return (
      <StyledChip
        key={genre}
        label={genreTitle[genre].toUpperCase()}
      ></StyledChip>
    );
  });

  return (
    <StyledCard>
      <p className="preview-title">{props.podcastData.title}</p>
      <div className="preview-cover-image-container">
        <img
          className="preview-cover-image image"
          src={props.podcastData.image}
          alt="cover image"
        ></img>
      </div>
      <div>
        <div
          className="preview-genres"
          style={{ display: "flex", gap: "1rem" }}
        >
          {genreMap}
        </div>
      </div>
      <h4 className="preview-seasons">Seasons: {props.podcastData.seasons}</h4>
      <h4>Last Updated: {lastUpdated}</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "3rem",
        }}
      >
        <NavLink
          to={`/show/${props.podcastData.id}`}
          style={{ textDecoration: "none" }}
        >
          <StyledButton variant="contained" size="small">
            See details
          </StyledButton>
        </NavLink>
      </div>
    </StyledCard>
  );
}

export default Preview;
