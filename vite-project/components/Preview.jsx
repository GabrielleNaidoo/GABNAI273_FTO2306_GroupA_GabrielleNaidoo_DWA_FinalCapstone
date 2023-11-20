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
    return (
      <li
        key={genre}
        style={{
          backgroundColor: "#C0C0C0",
          marginBottom: "1rem",
          display: "inline-block",
          listStyle: "none",
          padding: "0.05rem",
        }}
      >
        <div className="genre-list-item-text-container">
          {genreTitle[genre]}
        </div>
      </li>
    );
  });

  return (
    <div className="preview">
      <p className="preview-title">{props.podcastData.title}</p>
      <div className="preview-cover-image-container">
        <img
          className="preview-cover-image"
          src={props.podcastData.image}
          alt="cover image"
        ></img>
      </div>
      <div>
        <ul className="preview-genres" style={{ display: "flex", gap: "1rem" }}>
          {genreMap}
        </ul>
      </div>
      <h4 className="preview-seasons">Seasons: {props.podcastData.seasons}</h4>
      <h4>Last Updated: {lastUpdated}</h4>
      <h4>favourites star image</h4>
    </div>
  );
}

export default Preview;
