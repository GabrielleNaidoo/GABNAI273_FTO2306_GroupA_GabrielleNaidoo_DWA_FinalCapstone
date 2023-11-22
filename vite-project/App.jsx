import { useState, useEffect } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Preview from "/components/Preview";
import Show from "/components/Show";
import Episodes from "/components/Episodes";
import Favourites from "/components/Favourites";
import Dropdown from "/components/Dropdown";
import GenreDropdown from "/components/GenreDropdown";
import SearchBox from "/components/SearchBox";

function App() {
  const [podcastData, setPodcastData] = useState([]);
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
    function handleGenreSelect(array) {
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
      const filteredByGenreArray =
        selectedGenreFilter !== "all"
          ? array.filter((podcast) =>
              podcast.genres.includes(genreFilters[selectedGenreFilter])
            )
          : array;

      return filteredByGenreArray;
    }

    function handleTitleInput(array) {
      const inputValue = formData.titleInput.toLowerCase();
      const filteredByTitleArray =
        inputValue !== ""
          ? array.filter((podcast) =>
              podcast.title.toLowerCase().includes(inputValue)
            )
          : array;

      return filteredByTitleArray;
    }

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
            handleGenreSelect(handleTitleInput(reverseAlphabeticalPodcastData))
          );
        } else if (formData.selectedValueFilter === "newest-to-oldest") {
          const newestToOldestPodcastData = [...data].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return bDate - aDate;
          });
          setPodcastData(
            handleGenreSelect(handleTitleInput(newestToOldestPodcastData))
          );
        } else if (formData.selectedValueFilter === "oldest-to-newest") {
          const oldestToNewestPodcastData = [...data].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return aDate - bDate;
          });
          setPodcastData(
            handleGenreSelect(handleTitleInput(oldestToNewestPodcastData))
          );
        } else {
          const alphabeticalPodcastData = [...data].sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
          setPodcastData(
            handleGenreSelect(handleTitleInput(alphabeticalPodcastData))
          );
        }
      })
      .catch((err) => console.log(err));
  }, [
    formData.selectedValueFilter,
    formData.selectedGenreFilter,
    formData.titleInput,
    podcastData,
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
      <header>
        <h1 className="name">PodPortal</h1>
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            gap: "4rem",
          }}
        >
          <NavLink to="/">
            <h1>All Podcasts</h1>
          </NavLink>
          <NavLink to="/favourites">
            <h1>Favourites</h1>
          </NavLink>
        </div>
      </header>

      <div className="filter-bar">
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="previews-container">{podcastElement}</div>
            </>
          }
        />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/show/:id/season/:seasonNumber" element={<Episodes />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
