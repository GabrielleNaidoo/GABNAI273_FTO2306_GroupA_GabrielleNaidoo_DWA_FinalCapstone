import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Preview from "/components/Preview";
import Navigation from "/components/Navigation";
import Show from "/components/Show";
import Episodes from "/components/Episodes";
import Favourites from "/components/Favourites";

function App() {
  const [podcastDataAll, setPodcastDataAll] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPodcastDataAll([...data]))
      .catch((err) => console.log(err));
  }, []);

  // console.log(podcastDataAll);

  const podcastElement = podcastDataAll.map((element) => {
    return (
      <div key={element.id}>
        <Preview podcastData={element} />
        <Link to={`/show/${element.id}`}>See details</Link>
      </div>
    );
  });

  return (
    <>
      <Navigation />
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
