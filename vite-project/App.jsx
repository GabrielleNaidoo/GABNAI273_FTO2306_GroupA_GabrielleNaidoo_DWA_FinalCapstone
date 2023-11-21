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

  // function handleGenreSelect(podcastData) {
  //   if (formData.selectedGenreFilter === "personalGrowth") {
  //     const personalGrowthArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(1);
  //     });
  //     setPodcastData([...personalGrowthArray]);
  //   } else if (
  //     formData.selectedGenreFilter === "trueCrimeAndInvestigativeJournalism"
  //   ) {
  //     const trueCrimeAndInvestigativeJournalismArray = [...podcastData].filter(
  //       (podcast) => {
  //         return podcast.genres.includes(2);
  //       }
  //     );
  //     setPodcastData([...trueCrimeAndInvestigativeJournalismArray]);
  //   } else if (formData.selectedGenreFilter === "history") {
  //     const historyArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(3);
  //     });
  //     setPodcastData([...historyArray]);
  //   } else if (formData.selectedGenreFilter === "comedy") {
  //     const comedyArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(4);
  //     });
  //     setPodcastData([...comedyArray]);
  //   } else if (formData.selectedGenreFilter === "entertainment") {
  //     const entertainmentArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(5);
  //     });
  //     setPodcastData([...entertainmentArray]);
  //   } else if (formData.selectedGenreFilter === "business") {
  //     const businessArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(6);
  //     });
  //     setPodcastData([...businessArray]);
  //   } else if (formData.selectedGenreFilter === "fiction") {
  //     const fictionArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(7);
  //     });
  //     setPodcastData([...fictionArray]);
  //   } else if (formData.selectedGenreFilter === "news") {
  //     const newsArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(8);
  //     });
  //     setPodcastData([...newsArray]);
  //   } else if (formData.selectedGenreFilter === "kidsAndFamily") {
  //     const kidsAndFamilyArray = [...podcastData].filter((podcast) => {
  //       return podcast.genres.includes(9);
  //     });
  //     setPodcastData([...kidsAndFamilyArray]);
  //   }
  // }

  useEffect(() => {
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
          setPodcastData([...alphabeticalPodcastData]);
        } else if (formData.selectedValueFilter === "reverse-alphabetical") {
          const reverseAlphabeticalPodcastData = [...podcastData].sort((a, b) =>
            b.title.toLowerCase().localeCompare(a.title.toLowerCase())
          );
          setPodcastData([...reverseAlphabeticalPodcastData]);
        } else if (formData.selectedValueFilter === "newest-to-oldest") {
          const newestToOldestPodcastData = [...podcastData].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return bDate - aDate;
          });
          setPodcastData([...newestToOldestPodcastData]);
        } else if (formData.selectedValueFilter === "oldest-to-newest") {
          const oldestToNewestPodcastData = [...podcastData].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return aDate - bDate;
          });
          setPodcastData([...oldestToNewestPodcastData]);
        } else {
          setPodcastData([...data]);
        }
      })
      .catch((err) => console.log(err));
  }, [formData.selectedValueFilter, podcastData]);

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
