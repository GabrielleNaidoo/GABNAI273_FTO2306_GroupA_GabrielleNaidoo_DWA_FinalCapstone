import React, { useContext } from "react";
import FavouritesContext from "../store/favourites-context";
import Preview from "../components/Preview";

function FavouriteComponent(props) {
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

  return (
    <div>
      <h1>{props.episodeData.title}</h1>
      <img
        onClick={() => toggleFavouritesHandler(props.episodeData)}
        src={
          favouritesCtx.isFavourite(props.episodeData.title)
            ? "/images/heart-filled.png"
            : "/images/heart-empty.png"
        }
        alt="favourite image"
        style={{ height: "3rem", width: "3rem" }}
      ></img>
    </div>
  );
}

function Favourites() {
  const favouritesCtx = useContext(FavouritesContext);

  const favouriteItems = favouritesCtx.favourites.map((favourite) => {
    const date = `${favourite.dateAdded.getDate()}/${
      favourite.dateAdded.getMonth() + 1
    }/${favourite.dateAdded.getFullYear()}`;

    const time = `${favourite.dateAdded.getHours()}:${favourite.dateAdded.getMinutes()}`;

    return (
      <div key={favourite.title} style={{ position: "relative" }}>
        <div style={{ color: "orange" }}>
          Added: {date} {time}
        </div>
        <FavouriteComponent episodeData={favourite} />
      </div>
    );
  });

  return (
    <div>
      <h1>Your favourites</h1>
      <div className="previews-container">{favouriteItems}</div>
    </div>
  );
}

export default Favourites;
