import { createContext, useState } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavourite: (favouritePodcast) => {},
  removeFavourite: (favouritesId) => {},
  isFavourite: (favouritesId) => {},
});

export function FavouritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  function addFavouriteHandler(favouritePodcast) {
    const currentDate = new Date();
    favouritePodcast.dateAdded = currentDate;
    setUserFavourites((prev) => [...prev, favouritePodcast]);
  }
  function removeFavouriteHandler(favouriteId) {
    setUserFavourites((prev) => {
      return prev.filter((podcast) => podcast.id !== favouriteId);
    });
  }
  function isFavouriteHandler(favouriteId) {
    return userFavourites.some((podcast) => podcast.id === favouriteId);
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
