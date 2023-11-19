import React, { useState, useEffect } from "react";

function Preview(props) {
  return (
    <div>
      <h1>{props.podcastData.title}</h1>
      <img
        src={props.podcastData.image}
        style={{ height: "12rem", width: "6rem" }}
      ></img>
    </div>
  );
}

export default Preview;
