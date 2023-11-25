import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import AudioContext from "../store/audio-context";

function AudioPlayer() {
  // const location = useLocation();
  const AudioCtx = useContext(AudioContext);
  const audioRef = useRef();

  // const navigate = useNavigate();
  // const { episodeTitle, episodeAudio } = location.state || {};
  // function handleClickBack() {
  //   navigate(-1);
  // }

  function handleAbort() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }

  return (
    <>
      {/* <button onClick={handleClickBack}>Back to Episodes</button> */}
      <h1>{AudioCtx.currentShowTitle}</h1>
      <ReactAudioPlayer
        src={AudioCtx.currentAudioFile}
        onAbort={handleAbort}
        autoPlay
        controls
      />
    </>
  );
}

export default AudioPlayer;
