import { createContext, useState, useEffect } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavourite: (favouriteEpisode) => {},
  removeFavourite: (favouriteEpisodeTitle) => {},
  isFavourite: (favouriteEpisodeTitle) => {},
  clearFavourites: () => {},
  currentAudioFile: "",
});

export function FavouritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  function addFavouriteHandler(favouriteEpisode, show, seasonNumber) {
    const currentDate = new Date();
    favouriteEpisode.dateAdded = currentDate;
    favouriteEpisode.showMatch = show;
    favouriteEpisode.seasonNumber = seasonNumber;
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
  function clearAllFavouritesHandler() {
    localStorage.removeItem("favourites");
    setUserFavourites([]);
  }

  useEffect(() => {
    if (localStorage.getItem("favourites")) {
      const storedFavourites =
        JSON.parse(localStorage.getItem("favourites")) || [];
      setUserFavourites(storedFavourites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(userFavourites));
  }, [userFavourites]);

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    clearFavourites: clearAllFavouritesHandler,
    isFavourite: isFavouriteHandler,
    currentAudioFile: "",
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
