import { useState, useEffect } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Preview from "/components/Preview";
import Show from "/components/Show";
import Episodes from "/components/Episodes";
import Favourites from "/components/Favourites";
import Dropdown from "/components/Dropdown";
import GenreDropdown from "/components/GenreDropdown";

function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [formData, setFormData] = useState({
    selectedValueFilter: "all",
    selectedGenreFilter: "all",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    // setFormData({ selectedValueFilter: value });
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
      const filteredArray =
        selectedGenreFilter !== "all"
          ? array.filter((podcast) =>
              podcast.genres.includes(genreFilters[selectedGenreFilter])
            )
          : array;

      setPodcastData([...filteredArray]);
    }

    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // conditionals based on filtering for podcastData
        if (formData.selectedValueFilter === "alphabetical") {
          const alphabeticalPodcastData = [...podcastData].sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
          setPodcastData(alphabeticalPodcastData);
          handleGenreSelect(alphabeticalPodcastData);
        } else if (formData.selectedValueFilter === "reverse-alphabetical") {
          const reverseAlphabeticalPodcastData = [...podcastData].sort((a, b) =>
            b.title.toLowerCase().localeCompare(a.title.toLowerCase())
          );
          setPodcastData(reverseAlphabeticalPodcastData);
          handleGenreSelect(reverseAlphabeticalPodcastData);
        } else if (formData.selectedValueFilter === "newest-to-oldest") {
          const newestToOldestPodcastData = [...podcastData].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return bDate - aDate;
          });
          setPodcastData(newestToOldestPodcastData);
          handleGenreSelect(newestToOldestPodcastData);
        } else if (formData.selectedValueFilter === "oldest-to-newest") {
          const oldestToNewestPodcastData = [...podcastData].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return aDate - bDate;
          });
          setPodcastData(oldestToNewestPodcastData);
          handleGenreSelect(oldestToNewestPodcastData);
        } else {
          setPodcastData([...data]);
          handleGenreSelect(data);
        }
      })
      .catch((err) => console.log(err));
  }, [formData.selectedValueFilter, formData.selectedGenreFilter, podcastData]);

  const podcastElement = podcastData.map((element) => {
    return (
      <div key={element.id}>
        <Preview podcastData={element} />
      </div>
    );
  });

  return (
    <>
      <nav
        className="navbar"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr" }}
      >
        <h1 style={{ gridColumn: "1/3" }}>PodPortal</h1>
        <NavLink to="/" style={{ gridColumn: "3/4" }}>
          <h1>All Podcasts</h1>
        </NavLink>
        <NavLink to="/favourites" style={{ gridColumn: "4/5" }}>
          <h1>Favourites</h1>
        </NavLink>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <Dropdown data={formData} changeHandler={handleChange} />
              </div>
              <div>
                <GenreDropdown data={formData} changeHandler={handleChange} />
              </div>
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
