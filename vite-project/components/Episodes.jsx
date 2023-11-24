import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouritesContext from "../store/favourites-context";

function Episodes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { episodes, seasonImage, seasonInfo } = location.state || {}; //episodes is an array of all the episodes in a **(season)**
  // console.log(seasonInfo);
  const favouritesCtx = useContext(FavouritesContext);

  function toggleFavouritesHandler(episode) {
    const itemIsFavourite = favouritesCtx.isFavourite(episode.title);
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(episode.title);
      console.log("removed from favourites");
    } else {
      favouritesCtx.addFavourite(episode);
      console.log("Added to favourites");
    }
  }

  function handleClickBack() {
    navigate(-1);
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
      <h1>EPISODES</h1>
      <div>{episodeItems || "No episodes available"}</div>
    </div>
  );
}

export default Episodes;
