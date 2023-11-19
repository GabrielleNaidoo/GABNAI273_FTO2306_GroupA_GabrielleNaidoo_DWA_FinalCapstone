import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Episode() {
  const { episodesDataArray } = useParams();
  const [episodesData, setEpisodesData] = useState(episodesDataArray);

  const episodes = episodesData.map((episode) => {
    return (
      <div key={episode.title}>
        <h1>Episode: {episode.episode}</h1>
        <p>{episode.description}</p>
      </div>
    );
  });

  console.log(episodesData);

  // return <div className="episodes">{episodes}</div>;
  return <h1>Stuff</h1>;
}

export default Episode;
