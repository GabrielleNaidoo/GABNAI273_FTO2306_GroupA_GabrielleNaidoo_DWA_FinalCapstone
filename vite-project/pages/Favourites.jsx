import React, { useContext } from "react";
import FavouritesContext from "../store/favourites-context";
import Preview from "../components/Preview";

function Favourites() {
  const favouritesCtx = useContext(FavouritesContext);

  const favouriteItems = favouritesCtx.favourites.map((favourite) => {
    const date = `${favourite.dateAdded.getDate()}/${
      favourite.dateAdded.getMonth() + 1
    }/${favourite.dateAdded.getFullYear()}`;

    const time = `${favourite.dateAdded.getHours()}:${favourite.dateAdded.getMinutes()}`;

    return (
      <div key={favourite.id} style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "10rem",
            top: "-0.5rem",
            backgroundColor: "blue",
            padding: "0.2rem 1rem",
            color: "white",
          }}
        >
          Added: {date} {time}
        </div>

        <Preview podcastData={favourite} />
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
