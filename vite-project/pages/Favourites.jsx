import React, { useContext, useState, useEffect } from "react";
import FavouritesContext from "../store/favourites-context";
import GenreDropdown from "/components/GenreDropdown";
import SearchBox from "/components/SearchBox";
import Dropdown from "/components/DropDown";

function Favourites() {
  // context:
  const [favourites, setFavourites] = useState([]);
  const favouritesCtx = useContext(FavouritesContext);

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
    function handleGenre(array) {
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
      <h1
        style={{ textAlign: "center", marginTop: "5rem", marginBottom: "5rem" }}
      >
        Your favourites
      </h1>
      <div style={{ display: "flex", gap: "5rem", padding: "4rem 2rem" }}>
        {favouriteItems}
      </div>
    </div>
  );
}

export default Favourites;
