import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FavouritesContextProvider } from "./store/favourites-context";
import { AudioContextProvider } from "./store/audio-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AudioContextProvider>
    <FavouritesContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </FavouritesContextProvider>
  </AudioContextProvider>
);
