import React, { useContext, useState, useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import AudioContext from "../store/audio-context";

function AudioPlayer() {
  const AudioCtx = useContext(AudioContext);
  const rapRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function playHandler() {
    setIsPlaying(true);
  }

  const handleBeforeUnload = (event) => {
    if (isPlaying) {
      event.returnValue = prompt();
      ("Are you sure you want to leave? Your audio is still playing.");
    }
    console.log(event.returnValue);
  };
  window.addEventListener("beforeunload", handleBeforeUnload);

  return (
    <div className="audio-player">
      {AudioCtx.currentAudioFile && (
        <p className="playing-episode">{`Episode ${AudioCtx.currentEpisode}: ${AudioCtx.currentEpisodeTitle}`}</p>
      )}
      <ReactAudioPlayer
        style={{ width: "100vw", opacity: "0.75", backgroundColor: "#6da5c0" }}
        key={AudioCtx.currentEpisode}
        src={AudioCtx.currentAudioFile}
        autoPlay
        controls
        // onListen={handleListen}
        // onPause={handlePause}
        // onPlay={handlePlay}
        onPlay={playHandler}
        listenInterval={1000}
        ref={rapRef}
      />
    </div>
  );
}

export default AudioPlayer;

