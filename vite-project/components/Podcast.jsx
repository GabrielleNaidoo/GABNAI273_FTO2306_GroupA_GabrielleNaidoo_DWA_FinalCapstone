import React, { useState, useEffect } from "react";

function Podcast(props) {
  const [podcast, setpodcast] = useState(props.podcastData);

  const date = new Date(podcast.updated);
  return (
    <div className="podcast-item">
      <div className="podcast-image-container">
        <img className="podcast-image" src={podcast.image} />
      </div>
      <div className="podcast-content-container">
        <h2 className="podcast-title">{podcast.title}</h2>
        <p>
          Last updated:{" "}
          {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
        </p>
        <p>Number of seasons: {podcast.seasons}</p>
        <p>Genres:</p>
        <img
          className="favourites-star"
          src={
            props.star ? "/images/star-filled.png" : "/images/star-empty.png"
          }
        ></img>
      </div>
    </div>
  );
}

export default Podcast;
