import React, { useState, useEffect } from "react";

function Preview(props) {
  const date = new Date(props.podcastData.updated);
  const lastUpdated = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  return (
    <div className="preview">
      <h1>{props.podcastData.title}</h1>
      <img
        className="preview-cover-image"
        src={props.podcastData.image}
        alt="cover image"
        style={{ height: "12rem", width: "6rem" }}
      ></img>
      <h4>Genres:</h4>
      <h4>Seasons:{props.podcastData.seasons}</h4>
      <h4>Last Updated: {lastUpdated}</h4>
      <h4>favourites star image</h4>
    </div>
  );
}

export default Preview;
