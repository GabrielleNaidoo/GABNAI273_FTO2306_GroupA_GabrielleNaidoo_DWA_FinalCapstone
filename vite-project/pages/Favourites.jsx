import React, { useContext } from "react";
import FavouritesContext from "../store/favourites-context";

function Favourites() {
  const favouritesCtx = useContext(FavouritesContext);

  function toggleFavouritesHandler(episode) {
    const itemIsFavourite = favouritesCtx.isFavourite(episode.title);
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(episode.title);
    } else {
      favouritesCtx.addFavourite(episode);
    }
  }

  const favouriteItems = favouritesCtx.favourites.map((favourite) => {
    const show = favourite.showMatch[0];
    const date = `${favourite.dateAdded.getDate()}/${
      favourite.dateAdded.getMonth() + 1
    }/${favourite.dateAdded.getFullYear()}`;

    const time = `${favourite.dateAdded.getHours()}:${favourite.dateAdded.getMinutes()}`;

    return (
      <div
        key={favourite.title}
        style={{
          backgroundColor: "purple",
          padding: "1rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "20rem",
        }}
      >
        <p style={{ color: "orange" }}>
          Added: {date} {time}
        </p>
        <img
          src={show.image}
          alt="show image"
          className="preview-cover-image"
        ></img>
        <div>
          <h4>{show.title}</h4>
          <h5>{`Season: ${favourite.seasonNumber}`}</h5>
          <h3>{`Episode ${favourite.episode} : ${favourite.title}`}</h3>
          <img
            onClick={() => toggleFavouritesHandler(favourite)}
            src={
              favouritesCtx.isFavourite(favourite.title)
                ? "/images/heart-filled.png"
                : "/images/heart-empty.png"
            }
            alt="favourite image"
            style={{ height: "3rem", width: "3rem" }}
          ></img>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "5rem" }}>
        Your favourites
      </h1>
      <div style={{ display: "flex", gap: "5rem" }}>{favouriteItems}</div>
    </div>
  );
}

export default Favourites;
