import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouritesContext from "../store/favourites-context";
import AudioContext from "../store/audio-context";
import { Card, Button } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  && {
    font-size: 0.8rem;
    font-weight: 400;
    color: #05161a;
    padding: 0.4rem 1.5rem;
    margin-bottom: 2rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
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
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: -8px 8px 17px 0px rgba(12, 112, 117, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
  }
`;

function Episodes(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const AudioCtx = useContext(AudioContext);
  const favouritesCtx = useContext(FavouritesContext);
  const { episodes, seasonImage, seasonInfo, showId } = location.state || {}; //episodes is an array of all the episodes in a **(season)**

  const seasonShowMatch = props.podcastData.filter(
    (show) => showId && show.id === showId
  );
  const seasonNumber = seasonInfo && seasonInfo.season;

  function toggleFavouritesHandler(episode) {
    const itemIsFavourite = favouritesCtx.isFavourite(episode.title);
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(episode.title);
      console.log("removed from favourites");
    } else {
      favouritesCtx.addFavourite(episode, seasonShowMatch, seasonNumber);
      console.log("Added to favourites");
    }
  }

  function handleClickBack() {
    navigate(-1);
  }

  function handleClick(episode) {
    AudioCtx.currentAudioHandler(episode);
  }

  const episodeItems =
    episodes &&
    episodes.map((episode) => (
      <div key={episode.episode} id={episode.episode}>
        <StyledCard>
          <h1 className="episode-title">
            <span>Episode {episode.episode}: </span>
            {episode.title}
          </h1>
          <img
            className="episode-image image"
            src={seasonImage}
            alt={episode.title}
          ></img>
          <p className="episode-description">{episode.description}</p>

          <div className="episode-button-container">
            <StyledButton
              className="episode-button"
              onClick={() => handleClick(episode)}
            >
              Listen
            </StyledButton>
            <img
              className="episode-favourite-image image"
              onClick={() => toggleFavouritesHandler(episode)}
              src={
                favouritesCtx.isFavourite(episode.title)
                  ? "/images/heart-filled.png"
                  : "/images/heart-empty.png"
              }
              alt="favourite image"
            ></img>
          </div>
        </StyledCard>
      </div>
    ));

  return (
    <div>
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
      <h1 className="episode-page-title">{seasonInfo.title}</h1>
      <div className="episodes-container">
        {episodeItems || "No episodes available"}
      </div>
    </div>
  );
}

export default Episodes;
