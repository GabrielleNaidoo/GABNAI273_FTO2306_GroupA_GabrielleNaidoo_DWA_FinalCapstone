import React, { useState, useEffect } from "react";

function Preview(props) {
  const genreTitle = {
    0: "All",
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const date = new Date(props.podcastData.updated);
  const lastUpdated = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  const genreMap = props.podcastData.genres.map((genre) => {
    return <li key={genre}>{genreTitle[genre]}</li>;
  });

  return (
    <div className="preview">
      <h1>{props.podcastData.title}</h1>
      <img
        className="preview-cover-image"
        src={props.podcastData.image}
        alt="cover image"
        style={{ height: "12rem", width: "6rem" }}
      ></img>
      <div>
        <h3>Genres:</h3>
        <ul className="preview-genres">{genreMap}</ul>
      </div>
      <h4 className="preview-seasons">Seasons: {props.podcastData.seasons}</h4>
      <h4>Last Updated: {lastUpdated}</h4>
      <h4>favourites star image</h4>
    </div>
  );
}

export default Preview;
