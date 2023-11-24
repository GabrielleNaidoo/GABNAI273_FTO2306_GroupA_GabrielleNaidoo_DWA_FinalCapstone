import { createContext, useState } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavourite: (favouriteEpisode) => {},
  removeFavourite: (favouriteEpisodeTitle) => {},
  isFavourite: (favouriteEpisodeTitle) => {},
});

export function FavouritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  function addFavouriteHandler(favouriteEpisode, show) {
    const currentDate = new Date();
    favouriteEpisode.dateAdded = currentDate;
    favouriteEpisode.showMatch = show;
    setUserFavourites((prev) => [...prev, favouriteEpisode]);
  }
  function removeFavouriteHandler(favouriteEpisodeTitle) {
    setUserFavourites((prev) => {
      return prev.filter((episode) => episode.title !== favouriteEpisodeTitle);
    });
  }
  function isFavouriteHandler(favouriteEpisodeTitle) {
    return userFavourites.some(
      (episode) => episode.title === favouriteEpisodeTitle
    );
  }

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    isFavourite: isFavouriteHandler,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
