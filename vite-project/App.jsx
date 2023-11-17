import { useState, useEffect } from "react";
import Header from "./components/Header";
import Podcast from "./components/Podcast";

function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [star, setStar] = useState({ "": true });

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {
        setPodcastData([...data]);
      });
  }, []);

  const podcastElements = podcastData.map((element) => (
    <Podcast podcastData={element} key={element.id} star={star} />
  ));

  return (
    <div>
      <Header />
      <div className="podcast-container">{podcastElements}</div>
    </div>
  );
}

export default App;
