import React, { useContext, useState, useEffect } from "react";
import FavouritesContext from "../store/favourites-context";
import AudioContext from "../store/audio-context";
import GenreDropdown from "/components/GenreDropdown";
import SearchBox from "/components/SearchBox";
import Dropdown from "/components/DropDown";
import { Card, Button, Chip } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  && {
    font-size: 1rem;
    font-weight: 400;
    color: #05161a;
    padding: 0.8rem 2.4rem;
    margin-bottom: 1rem;
    margin-top: 3rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
    letter-spacing: 0.04rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 0.6rem;
      padding: 0.2rem 1.2rem;
      margin-bottom: 1.5rem;
      letter-spacing: 0.02rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      font-size: 0.7rem;
      padding: 0.25rem 1.2rem;
      margin-bottom: 1.6rem;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 400px) {
    && {
      font-size: 0.5rem;
      padding: 0.2rem 1rem;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    && {
      font-size: 0.8rem;
      padding: 0.4rem 1.2rem;
    }
  }
`;
const StyledButtonVariant = styled(Button)`
  && {
    font-size: 1rem;
    font-weight: 400;
    color:;
    padding: 0.8rem 2.4rem;
    margin-top: 3rem;
    background-color: #711f22;
    color: #a9a9a9;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
    letter-spacing: 0.04rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 0.6rem;
      padding: 0.2rem 1.2rem;
      margin-bottom: 1.5rem;
      letter-spacing: 0.02rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      font-size: 0.7rem;
      padding: 0.25rem 1.2rem;
      margin-bottom: 1.6rem;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 400px) {
    && {
      font-size: 0.5rem;

      padding: 0.2rem 1rem;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    && {
      font-size: 0.8rem;
      padding: 0.4rem 1.2rem;
    }
  }
`;

const StyledCard = styled(Card)`
  && {
    position: relative;
    color: #999999;
    background-color: #05161a;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: -8px 8px 17px 0px rgba(12, 112, 117, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    height: 100%;
  }
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      padding: 0.2rem 0.3rem;

      gap: 1.5rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      gap: 1.7rem;
    }
  }
`;

const StyledChip = styled(Chip)`
  && {
    font-size: 1rem;
    font-weight: 400;
    padding: 0.2rem 0.4rem;
    color: #05161a;
    background-color: #999999;
  }

  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 1rem;
      padding: 0.1rem 0.2rem;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 1200px) {
    && {
      font-size: 1rem;
      padding: 0.4rem 1.2rem;
    }
  }
`;

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
      return <StyledChip key={genre} label={genreTitle[genre]}></StyledChip>;
    });

    return (
      <div key={favourite.title}>
        <StyledCard>
          <p className="favourite-time">
            Added: {date} {time}
          </p>
          <h1 className="favourite-title">{show.title}</h1>
          <img
            className="favourite-image image"
            src={show.image}
            alt="show image"
          ></img>
          <div className="favourite-genres">
            <div>{genreMap}</div>
          </div>
          <div>
            <p className="favourite-season">{`Season: ${favourite.seasonNumber}`}</p>
            <p className="favourite-episode">{`Episode ${favourite.episode} : ${favourite.title}`}</p>

            <div className="favourite-button">
              <img
                className="episode-favourite-image"
                onClick={() => toggleFavouritesHandler(favourite)}
                src={
                  favouritesCtx.isFavourite(favourite.title)
                    ? "/images/heart-filled.png"
                    : "/images/heart-empty.png"
                }
                alt="favourite image"
              ></img>
            </div>
            <StyledButton onClick={() => handleClick(favourite)}>
              Listen
            </StyledButton>
          </div>
        </StyledCard>
      </div>
    );
  });

  return (
    <div>
      <div className="filter-bar">
        <div>
          <div>
            <SearchBox data={formData} changeHandler={handleChange} />
          </div>
        </div>
        <div>
          <GenreDropdown data={formData} changeHandler={handleChange} />
        </div>
        <div>
          <Dropdown data={formData} changeHandler={handleChange} />
        </div>
      </div>

      <div>
        <h1 className="favourite-page-title">Your favourites</h1>
      </div>
      <div className="clear-all-favourites">
        <StyledButtonVariant onClick={favouritesCtx.clearFavourites}>
          Clear All Favourites
        </StyledButtonVariant>
      </div>
      <div className="favourites-container">{favouriteItems}</div>
    </div>
  );
}

export default Favourites;
