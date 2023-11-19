import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Show() {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [showData, setShowData] = useState({});

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${currentId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setShowData({ ...data });
      })
      .catch((err) => console.log(err));
  }, [currentId]);

  console.log(showData);
  const seasonDetails =
    showData.seasons &&
    showData.seasons.map((season) => {
      return (
        <div key={season.season}>
          <h1>{season.title}</h1>
          <img
            src={season.image}
            alt="season-cover-image"
            style={{ width: "6rem", height: "10rem" }}
          ></img>
          <p>Episodes: {season.episodes.length}</p>
        </div>
      );
    });

  return (
    <div className="show">
      <h1>{showData.title}</h1>
      <img
        className="show-cover-image"
        src={showData.image}
        alt="cover image of show"
        style={{ width: "6rem", height: "10rem" }}
      ></img>

      <img
        className="show-cover-image-blurred"
        src={showData.image}
        alt="blurred cover image of show"
        style={{ width: "6rem", height: "10rem" }}
      ></img>
      <p>{showData.description}</p>
      <div className="seasons">{seasonDetails}</div>
    </div>
  );
}

export default Show;