import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Preview from "/components/Preview";
import Show from "/components/Show";
import Episodes from "/components/Episodes";
import Favourites from "/components/Favourites";
import Dropdown from "/components/Dropdown";

function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [formData, setFormData] = useState({ selectedValue: "all" });

  function handleChange(event) {
    const { value } = event.target;
    setFormData({ selectedValue: value });
  }

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
        if (formData.selectedValue === "alphabetical") {
          const alphabeticalPodcastData = [...podcastData].sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
          setPodcastData([...alphabeticalPodcastData]);
        } else if (formData.selectedValue === "reverse-alphabetical") {
          const reverseAlphabeticalPodcastData = [...podcastData].sort((a, b) =>
            b.title.toLowerCase().localeCompare(a.title.toLowerCase())
          );
          setPodcastData([...reverseAlphabeticalPodcastData]);
        } else if (formData.selectedValue === "newest-to-oldest") {
          const newestToOldestPodcastData = [...podcastData].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return bDate - aDate;
          });
          setPodcastData([...newestToOldestPodcastData]);
        } else if (formData.selectedValue === "oldest-to-newest") {
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
  }, [formData.selectedValue, podcastData]);

  const podcastElement = podcastData.map((element) => {
    return (
      <div key={element.id}>
        <Preview podcastData={element} />
      </div>
    );
  });

  return (
    <>
      <nav>
        <h1>PodPortal</h1>
        <Link to="/">
          <h1>All podcasts</h1>
        </Link>
        <Link to="/favourites">
          <h1>Favourites</h1>
        </Link>
        <Dropdown data={formData} changeHandler={handleChange} />
      </nav>
      <Routes>
        <Route
          path="/"
          element={<div className="previews-container">{podcastElement}</div>}
        />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/show/:id/season/:seasonNumber" element={<Episodes />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
