import React, { useContext, useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import AudioContext from "../store/audio-context";

function AudioPlayer() {
  const AudioCtx = useContext(AudioContext);

  return (
    <div>
      <h1>{AudioCtx.currentShowTitle}</h1>
      <ReactAudioPlayer
        key={AudioCtx.currentEpisode}
        src={AudioCtx.currentAudioFile}
        autoPlay
        controls
      />
    </div>
  );
}

export default AudioPlayer;
