import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FavouritesContext from "../store/favourites-context";

function Preview(props) {
  const favouritesCtx = useContext(FavouritesContext);

  const itemIsFavourite = favouritesCtx.isFavourite(props.id);

  function toggleFavouritesHandler() {
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(props.id);
      console.log("removed from favourites");
    } else {
      favouritesCtx.addFavourite(props.podcastData);
      console.log("added to favourites");
    }
  }

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

  const lastUpdated = `${day}/${month}/${year}`;

  const genreMap = props.podcastData.genres.map((genre) => {
    return (
      <li
        key={genre}
        style={{
          backgroundColor: "#F8F8F8",
          marginBottom: "1rem",
          display: "inline-block",
          listStyle: "none",
          padding: "0.25rem 0.5rem",
        }}
      >
        <div className="genre-list-item-text-container">
          {genreTitle[genre]}
        </div>
      </li>
    );
  });

  return (
    <div className="preview">
      <p className="preview-title">{props.podcastData.title}</p>
      <div className="preview-cover-image-container">
        <img
          className="preview-cover-image"
          src={props.podcastData.image}
          alt="cover image"
        ></img>
      </div>
      <div>
        <ul className="preview-genres" style={{ display: "flex", gap: "1rem" }}>
          {genreMap}
        </ul>
      </div>
      <h4 className="preview-seasons">Seasons: {props.podcastData.seasons}</h4>
      <h4>Last Updated: {lastUpdated}</h4>
      <button onClick={toggleFavouritesHandler}>
        {itemIsFavourite ? "Remove from favourites" : "Add to favourites"}
      </button>
      <Link to={`/show/${props.podcastData.id}`}>See details</Link>
    </div>
  );
}

export default Preview;
