import React, { useContext, useState, useEffect } from "react";
import FavouritesContext from "../store/favourites-context";
import AudioContext from "../store/audio-context";
import GenreDropdown from "/components/GenreDropdown";
import SearchBox from "/components/SearchBox";
import Dropdown from "/components/DropDown";

function Favourites() {
  // context:
  const [favourites, setFavourites] = useState([]);
  const favouritesCtx = useContext(FavouritesContext);
  const AudioCtx = useContext(AudioContext);

  function handleClick(favourite) {
    AudioCtx.currentAudioHandler(favourite);
  }

  function toggleFavouritesHandler(episode) {
    const itemIsFavourite = favouritesCtx.isFavourite(episode.title);
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(episode.title);
    } else {
      favouritesCtx.addFavourite(episode);
    }
  }

  //form:
  const [formData, setFormData] = useState({
    selectedValueFilter: "alphabetical",
    selectedGenreFilter: "all",
    titleInput: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    const genreFilters = {
      all: 0,
      personalGrowth: 1,
      trueCrimeAndInvestigativeJournalism: 2,
      history: 3,
      comedy: 4,
      entertainment: 5,
      business: 6,
      fiction: 7,
      news: 8,
      kidsAndFamily: 9,
    };
    function handleGenre(array) {
      const selectedGenreFilter = formData.selectedGenreFilter;

      const filteredGenreArray =
        selectedGenreFilter !== "all"
          ? array.filter((favourite) =>
              favourite.showMatch[0].genres.includes(
                genreFilters[selectedGenreFilter]
              )
            )
          : array;

      return filteredGenreArray;
    }

    function handleTitle(array) {
      const inputValue = formData.titleInput.toLowerCase();
      const filteredTitleArray =
        inputValue !== ""
          ? array.filter((favourite) =>
              favourite.showMatch[0].title.toLowerCase().includes(inputValue)
            )
          : array;

      return filteredTitleArray;
    }

    // Allows you to fetch the current updateFavourites without having infinite loop due to favourites constantly changing(useEffect dependency)

    let updatedFavourites = [...favouritesCtx.favourites];

    if (formData.selectedValueFilter === "reverse-alphabetical") {
      updatedFavourites = updatedFavourites.sort((a, b) =>
        b.showMatch[0].title
          .toLowerCase()
          .localeCompare(a.showMatch[0].title.toLowerCase())
      );
    } else if (formData.selectedValueFilter === "newest-to-oldest") {
      updatedFavourites = updatedFavourites.sort((a, b) => {
        const aDate = new Date(a.showMatch[0].updated) || 0;
        const bDate = new Date(b.showMatch[0].updated) || 0;
        return bDate - aDate;
      });
    } else if (formData.selectedValueFilter === "oldest-to-newest") {
      updatedFavourites = updatedFavourites.sort((a, b) => {
        const aDate = new Date(a.showMatch[0].updated) || 0;
        const bDate = new Date(b.showMatch[0].updated) || 0;
        return aDate - bDate;
      });
    } else {
      updatedFavourites = updatedFavourites.sort((a, b) =>
        a.showMatch[0].title
          .toLowerCase()
          .localeCompare(b.showMatch[0].title.toLowerCase())
      );
    }

    updatedFavourites = handleGenre(handleTitle(updatedFavourites));
    setFavourites(updatedFavourites);
  }, [
    favouritesCtx.favourites,
    formData.selectedValueFilter,
    formData.selectedGenreFilter,
    formData.titleInput,
  ]);

  const favouriteItems = favourites.map((favourite) => {
    const show = favourite.showMatch[0];

    const date =
      favourite.dateAdded instanceof Date
        ? `${favourite.dateAdded.getDate()}/${
            favourite.dateAdded.getMonth() + 1
          }/${favourite.dateAdded.getFullYear()}`
        : "";

    const time =
      favourite.dateAdded instanceof Date
        ? `${favourite.dateAdded.getHours()}:${favourite.dateAdded.getMinutes()}`
        : "";

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

    const genreMap = show.genres.map((genre) => {
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
      <div
        key={favourite.title}
        style={{
          backgroundColor: "purple",
          padding: "1rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "15rem",
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
          <div>
            <ul>{genreMap}</ul>
          </div>

          <img
            className="episode-favourite-image image"
            onClick={() => toggleFavouritesHandler(favourite)}
            src={
              favouritesCtx.isFavourite(favourite.title)
                ? "/images/heart-filled.png"
                : "/images/heart-empty.png"
            }
            alt="favourite image"
            style={{ height: "3rem", width: "3rem" }}
          ></img>
          <button onClick={() => handleClick(favourite)}>Listen</button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="filter-bar" style={{ backgroundColor: "green" }}>
        <div>
          <h2>
            <SearchBox data={formData} changeHandler={handleChange} />
          </h2>
        </div>
        <div>
          <GenreDropdown data={formData} changeHandler={handleChange} />
        </div>
        <div>
          <Dropdown data={formData} changeHandler={handleChange} />
        </div>
      </div>
      <div>
        <h1>Your favourites</h1>
        <button onClick={favouritesCtx.clearFavourites}>Clear All</button>
      </div>

      <div style={{ display: "flex", gap: "5rem", padding: "4rem 2rem" }}>
        {favouriteItems}
      </div>
    </div>
  );
}

export default Favourites;
