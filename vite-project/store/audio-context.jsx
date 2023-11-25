import { createContext, useState } from "react";

const AudioContext = createContext({
  currentAudioFile: "",
  favouriteShowTitle: "",
  currentAudioHandler: (episode) => {},
  showTitleHandler: (show) => {},
});

export function AudioContextProvider(props) {
  const [currentAudio, setCurrentAudio] = useState("");
  const [currentShowTitle, setCurrentShowTitle] = useState("");

  function handleAudioChange(episode) {
    setCurrentAudio(episode.file);
  }
  function handleFavouriteShowTitle(show) {
    setCurrentShowTitle(show.title);
  }
  const context = {
    currentAudioFile: currentAudio,
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
