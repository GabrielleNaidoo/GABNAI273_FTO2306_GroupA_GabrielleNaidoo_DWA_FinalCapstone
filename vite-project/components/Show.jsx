import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  && {
    font-size: 1rem;
    font-weight: 400;
    color: #05161a;
    padding: 0.8rem 2.4rem;
    margin-bottom: 2rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
    letter-spacing: 0.04rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
`;

const StyledCard = styled(Card)`
  && {
    color: #999999;
    background-color: #05161a;
    padding: 1.5rem 3rem;
    border-radius: 1rem;
    box-shadow: -8px 8px 17px 0px rgba(12, 112, 117, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
  }
`;

function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(id);
  const [showData, setShowData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${currentId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setShowData({ ...data });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [currentId]);

  function handleSeasonButtonClick(season) {
    navigate(`/show/${id}/season/${season.season}`, {
      state: {
        episodes: season.episodes,
        seasonImage: season.image,
        seasonInfo: season,
        showId: id,
      },
    });
  }

  function handleClickBack() {
    navigate(-1);
  }

  const seasonDetails =
    showData.seasons &&
    showData.seasons.map((season) => {
      // console.log(season.episodes);
      return (
        <div key={season.season}>
          <StyledCard>
            <h1 className="season-title">{season.title}</h1>
            <img
              className="season-cover-image image"
              src={season.image}
              alt="season-cover-image"
            ></img>
            <p className="season-episode-number">
              Episodes: {season.episodes.length}
            </p>
            <StyledButton
              className="season-button"
              onClick={() => handleSeasonButtonClick(season)}
            >
              SEE EPISODES
            </StyledButton>
          </StyledCard>
        </div>
      );
    });

  return (
    <div className="show">
      {isLoading && <p className="loading">Loading...</p>}
      <StyledButton onClick={handleClickBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="back-to-shows"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </StyledButton>
      <div className="show-relative-container">
        <h1 className="show-title">{showData.title}</h1>
        <img
          className="show-cover-image"
          src={showData.image}
          alt="cover image of show"
        ></img>
        <img
          className="show-cover-image-blurred"
          src={showData.image}
          alt="blurred cover image of show"
        ></img>
      </div>
      <div className="show-description-container">
        <p className="show-description">{showData.description}</p>
      </div>
      <div className="seasons-container">{seasonDetails}</div>
    </div>
  );
}

export default Show;
