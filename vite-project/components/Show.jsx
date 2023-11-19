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
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setShowData({ ...data });
      })
      .catch((err) => console.log(err));
  }, [currentId, showData]);

  return (
    <div>
      <h1>{showData.title}</h1>
      {/* <image src={showData.image}></image> */}
      <p>{showData.description}</p>
    </div>
  );
}

export default Show;
