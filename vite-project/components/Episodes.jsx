import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouritesContext from "../store/favourites-context";
// import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "./AudioPlayer";

function Episodes(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { episodes, seasonImage, seasonInfo, showId } = location.state || {}; //episodes is an array of all the episodes in a **(season)**

  const favouritesCtx = useContext(FavouritesContext);

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
    navigate(`/audioplayer`, {
      state: {
        episodeTitle: episode.title,
        episodeAudio: episode.file,
      },
    });
  }

  const episodeItems =
    episodes &&
    episodes.map((episode) => (
      <div key={episode.episode} id={episode.episode}>
        <h1>
          <span>Episode {episode.episode}: </span>
          {episode.title}
        </h1>
        <img
          src={seasonImage}
          alt={episode.title}
          style={{ height: "12rem", width: "6rem" }}
        ></img>
        <button onClick={() => handleClick(episode)}>Listen</button>
        <p>{episode.description}</p>
        <img
          onClick={() => toggleFavouritesHandler(episode)}
          src={
            favouritesCtx.isFavourite(episode.title)
              ? "/images/heart-filled.png"
              : "/images/heart-empty.png"
          }
          alt="favourite image"
          style={{ height: "3rem", width: "3rem" }}
        ></img>
      </div>
    ));

  return (
    <div>
      <button onClick={handleClickBack}>Back to show</button>
      <h1>{seasonInfo.title}</h1>
      <div>{episodeItems || "No episodes available"}</div>
    </div>
  );
}

export default Episodes;
