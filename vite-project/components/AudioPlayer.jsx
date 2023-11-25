import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

function AudioPlayer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { episodeTitle, episodeAudio } = location.state || {};
  // episodeTitle && console.log(episodeTitle);
  function handleClickBack() {
    navigate(-1);
  }

  return (
    <>
      <button onClick={handleClickBack}>Back to Episodes</button>
      <h1>{episodeTitle}</h1>
      <ReactAudioPlayer src={episodeAudio} autoPlay controls />
    </>
  );
}

export default AudioPlayer;
