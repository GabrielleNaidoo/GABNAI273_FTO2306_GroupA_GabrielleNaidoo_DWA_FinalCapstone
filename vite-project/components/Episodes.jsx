import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouritesContext from "../store/favourites-context";
import AudioContext from "../store/audio-context";
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
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 0.6rem;
      padding: 0.2rem 1.2rem;
      margin-bottom: 1.5rem;
      letter-spacing: 0.02rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      font-size: 0.7rem;
      padding: 0.25rem 1.2rem;
      margin-bottom: 1.6rem;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 400px) {
    && {
      font-size: 0.5rem;

      padding: 0.2rem 1rem;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    && {
      font-size: 0.8rem;
      padding: 0.4rem 1.2rem;
    }
  }
`;

const StyledCard = styled(Card)`
  && {
    position: relative;
    color: #999999;
    background-color: #05161a;
    padding: 1.5rem 3rem;
    border-radius: 1rem;
    box-shadow: -8px 8px 17px 0px rgba(12, 112, 117, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    height: 100%;
  }
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      padding: 0.2rem 0.3rem;

      gap: 1.5rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      gap: 1.7rem;
    }
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
            <span> {episode.episode}. </span>
            {episode.title}
          </h1>
          <img
            className="episode-image image"
            src={seasonImage}
            alt={episode.title}
          ></img>
          <p className="episode-description">{episode.description}</p>
          <StyledButton
            className="episode-button"
            onClick={() => handleClick(episode)}
          >
            Listen
          </StyledButton>
          <div className="favourite-button">
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
