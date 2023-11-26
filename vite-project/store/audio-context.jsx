import { createContext, useState } from "react";

const AudioContext = createContext({
  currentAudioFile: "",
  currentEpisode: "",
  favouriteShowTitle: "",
  currentAudioHandler: (episode) => {},
  showTitleHandler: (show) => {},
});

export function AudioContextProvider(props) {
  const [currentAudio, setCurrentAudio] = useState("");
  const [currentShowTitle, setCurrentShowTitle] = useState("");
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState("");

  function handleAudioChange(episode) {
    setCurrentAudio(episode.file);
    setCurrentEpisodeTitle(episode.title);
  }
  function handleFavouriteShowTitle(show) {
    setCurrentShowTitle(show.title);
  }
  const context = {
    currentAudioFile: currentAudio,
    currentEpisode: currentEpisodeTitle,
    favouriteShowTitle: currentShowTitle,
    currentAudioHandler: handleAudioChange,
    showTitleHandler: handleFavouriteShowTitle,
  };

  return (
    <AudioContext.Provider value={context}>
      {props.children}
    </AudioContext.Provider>
  );
}

export default AudioContext;
