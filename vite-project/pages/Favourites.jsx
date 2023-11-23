import React, { useContext } from "react";
import FavouritesContext from "../store/favourites-context";
import Preview from "../components/Preview";

function Favourites() {
  const favouritesCtx = useContext(FavouritesContext);

  const favouriteItems = favouritesCtx.favourites.map((favourite) => {
    const hours = favourite.addedDate.getHour();
    const minutes = favourite.addedDate.getMinutes();

    return (
      <div key={favourite.id}>
        <p>Date: {favourite.addedDate}</p>
        <p>Time: {`${hours}:${minutes}`}</p>
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
