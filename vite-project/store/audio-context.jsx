import { createContext, useState } from "react";

const AudioContext = createContext({
  currentAudioFile: "",
  currentEpisodeTitle: "",
  currentEpisode: "",
  currentAudioHandler: (episode) => {},
});

export function AudioContextProvider(props) {
  const [currentAudio, setCurrentAudio] = useState("");
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState("");

  function handleAudioChange(episode) {
    setCurrentAudio(episode.file);
    setCurrentEpisodeTitle(episode.title);
    setCurrentEpisode(episode.episode);
  }

  const context = {
    currentAudioFile: currentAudio,
    currentAudioHandler: handleAudioChange,
    currentEpisodeTitle: currentEpisodeTitle,
    currentEpisode: currentEpisode,
  };

  return (
    <AudioContext.Provider value={context}>
      {props.children}
    </AudioContext.Provider>
  );
}

export default AudioContext;
