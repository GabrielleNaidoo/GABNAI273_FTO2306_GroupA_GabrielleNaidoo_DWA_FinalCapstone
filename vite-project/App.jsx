import { useState, useEffect, useContext } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import FavouritesContext from "./store/favourites-context";
import Carousel from "./carousel/Carousel";
import Preview from "/components/Preview";
import Show from "/components/Show";
import Episodes from "/components/Episodes";
import Favourites from "/pages/Favourites";
import Dropdown from "/components/Dropdown";
import GenreDropdown from "/components/GenreDropdown";
import SearchBox from "/components/SearchBox";
import AudioPlayer from "/components/AudioPlayer";
import { Button, Badge } from "@mui/material";
import styled from "@emotion/styled";
import Login from "/pages/Login.jsx";
import Signup from "/pages/SignUp.jsx";

const StyledButton = styled(Button)`
  && {
    font-size: 1.2rem;
    font-weight: bold;
    color: #05161a;
    padding: 0.5rem 3rem;
    margin-bottom: 2rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }

  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 0.6rem;
      padding: 0.1rem 1.2rem;
      margin-bottom: 0.1rem;
      letter-spacing: 0.03rem;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1200) {
    && {
      font-size: 0.8rem;
      padding: 0.1rem 1.2rem;
    }
  }
`;

export function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      let data = JSON.parse(storedToken);
      setToken(data);
    }
  }, []);

  const [podcastData, setPodcastData] = useState([]);
  const [formData, setFormData] = useState({
    selectedValueFilter: "alphabetical",
    selectedGenreFilter: "all",
    titleInput: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(true);

  const favouritesCtx = useContext(FavouritesContext);

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function scrollToTopHandler() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const toggleForm = () => {
    setShowSignup((prevShowSignup) => !prevShowSignup);
  };

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
          ? array.filter((podcast) =>
              podcast.genres.includes(genreFilters[selectedGenreFilter])
            )
          : array;

      return filteredGenreArray;
    }

    function handleTitle(array) {
      const inputValue = formData.titleInput.toLowerCase();
      const filteredTitleArray =
        inputValue !== ""
          ? array.filter((podcast) =>
              podcast.title.toLowerCase().includes(inputValue)
            )
          : array;

      return filteredTitleArray;
    }

    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (formData.selectedValueFilter === "reverse-alphabetical") {
          const reverseAlphabeticalPodcastData = [...data].sort((a, b) =>
            b.title.toLowerCase().localeCompare(a.title.toLowerCase())
          );
          setPodcastData(
            handleGenre(handleTitle(reverseAlphabeticalPodcastData))
          );
        } else if (formData.selectedValueFilter === "newest-to-oldest") {
          const newestToOldestPodcastData = [...data].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return bDate - aDate;
          });
          setPodcastData(handleGenre(handleTitle(newestToOldestPodcastData)));
        } else if (formData.selectedValueFilter === "oldest-to-newest") {
          const oldestToNewestPodcastData = [...data].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return aDate - bDate;
          });
          setPodcastData(handleGenre(handleTitle(oldestToNewestPodcastData)));
        } else {
          const alphabeticalPodcastData = [...data].sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
          setPodcastData(handleGenre(handleTitle(alphabeticalPodcastData)));
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [
    formData.selectedValueFilter,
    formData.selectedGenreFilter,
    formData.titleInput,
  ]);

  const podcastElement = podcastData.map((element) => {
    return (
      <div key={element.id}>
        <Preview podcastData={element} />
      </div>
    );
  });

  return (
    <>
      {token && (
        <>
          <nav>
            <p className="name">
              <span className="p">P</span>od<span className="p">P</span>ortal
            </p>
            <div className="navbar">
              <NavLink className="link" to="/">
                <StyledButton>Podcasts</StyledButton>
              </NavLink>
              <NavLink className="link" to="/favourites">
                <StyledButton>
                  <Badge
                    badgeContent={favouritesCtx.totalFavourites}
                    color="success"
                  >
                    Favourites
                  </Badge>
                </StyledButton>
              </NavLink>
            </div>
          </nav>
          <AudioPlayer />
          <button onClick={scrollToTopHandler} className="back-to-top-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="back-to-top"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
              />
            </svg>
          </button>
        </>
      )}
      <Routes>
        <Route
          path="/signup"
          element={<Signup setToken={setToken} toggleForm={toggleForm} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} toggleForm={toggleForm} />}
        />

        <Route
          path="/"
          element={
            <>
              {!token && <Signup />}
              {token && (
                <div>
                  <Carousel data={podcastData} />
                  <div className="filter-bar">
                    <div>
                      <div>
                        <SearchBox
                          data={formData}
                          changeHandler={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <GenreDropdown
                        data={formData}
                        changeHandler={handleChange}
                      />
                    </div>
                    <div>
                      <Dropdown data={formData} changeHandler={handleChange} />
                    </div>
                  </div>
                  {isLoading && <p className="loading">Loading...</p>}
                  <div className="previews-container">{podcastElement}</div>
                </div>
              )}
            </>
          }
        />
        <Route path="/show/:id" element={<Show />} />
        <Route
          path="/show/:id/season/:seasonNumber"
          element={<Episodes podcastData={podcastData} />}
        />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
