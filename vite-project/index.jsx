import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FavouritesContextProvider } from "./store/favourites-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FavouritesContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </FavouritesContextProvider>
);
