import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Episodes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { episodes, seasonImage } = location.state || {};
  // console.log(episodes);

  function handleClickBack() {
    navigate(-1);
  }

  const episodeItems =
    episodes &&
    episodes.map((episode) => (
      <div key={episode.episode}>
        <h1>
          <span>Episode {episode.episode}: </span>
          {episode.title}
        </h1>
        <img
          src={seasonImage}
          alt={episode.title}
          style={{ height: "12rem", width: "6rem" }}
        ></img>
        <p>{episode.description}</p>
      </div>
    ));

  return (
    <div>
      <button onClick={handleClickBack}>Back to show</button>
      <h1>EPISODES</h1>
      <div>{episodeItems || "No episodes available"}</div>
    </div>
  );
}

export default Episodes;
