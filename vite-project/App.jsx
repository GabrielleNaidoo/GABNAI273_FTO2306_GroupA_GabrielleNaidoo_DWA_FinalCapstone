import { useState, useEffect, useContext } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import FavouritesContext from "./store/favourites-context";
import Carousel from "./carousel/Carousel";
import Preview from "/components/Preview";
import Show from "/components/Show";
import Episodes from "/components/Episodes";
import Favourites from "/pages/Favourites";
import Dropdown from "/components/Dropdown";
import GenreDropdown from "/components/GenreDropdown";
import SearchBox from "/components/SearchBox";
import AudioPlayer from "/components/AudioPlayer";
import { Button, Badge } from "@mui/material";
import styled from "@emotion/styled";
// import { supabase } from "./supabaseClient";

const StyledButton = styled(Button)`
  && {
    font-size: 1.2rem;
    font-weight: bold;
    color: #05161a;
    padding: 0.5rem 3rem;
    margin-bottom: 2rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
`;

export function App() {
  const [podcastData, setPodcastData] = useState([]);
  const [formData, setFormData] = useState({
    selectedValueFilter: "alphabetical",
    selectedGenreFilter: "all",
    titleInput: "",
  });

  const favouritesCtx = useContext(FavouritesContext);

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function scrollToTopHandler() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function handleGenre(array) {
      const genreFilters = {
        all: 0,
        personalGrowth: 1,
        trueCrimeAndInvestigativeJournalism: 2,
        history: 3,
        comedy: 4,
        entertainment: 5,
        business: 6,
        fiction: 7,
        news: 8,
        kidsAndFamily: 9,
      };

      const selectedGenreFilter = formData.selectedGenreFilter;

      const filteredGenreArray =
        selectedGenreFilter !== "all"
          ? array.filter((podcast) =>
              podcast.genres.includes(genreFilters[selectedGenreFilter])
            )
          : array;

      return filteredGenreArray;
    }

    function handleTitle(array) {
      const inputValue = formData.titleInput.toLowerCase();
      const filteredTitleArray =
        inputValue !== ""
          ? array.filter((podcast) =>
              podcast.title.toLowerCase().includes(inputValue)
            )
          : array;

      return filteredTitleArray;
    }

    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Country not found ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (formData.selectedValueFilter === "reverse-alphabetical") {
          const reverseAlphabeticalPodcastData = [...data].sort((a, b) =>
            b.title.toLowerCase().localeCompare(a.title.toLowerCase())
          );
          setPodcastData(
            handleGenre(handleTitle(reverseAlphabeticalPodcastData))
          );
        } else if (formData.selectedValueFilter === "newest-to-oldest") {
          const newestToOldestPodcastData = [...data].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return bDate - aDate;
          });
          setPodcastData(handleGenre(handleTitle(newestToOldestPodcastData)));
        } else if (formData.selectedValueFilter === "oldest-to-newest") {
          const oldestToNewestPodcastData = [...data].sort((a, b) => {
            const aDate = new Date(a.updated) || 0;
            const bDate = new Date(b.updated) || 0;
            return aDate - bDate;
          });
          setPodcastData(handleGenre(handleTitle(oldestToNewestPodcastData)));
        } else {
          const alphabeticalPodcastData = [...data].sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
          setPodcastData(handleGenre(handleTitle(alphabeticalPodcastData)));
        }
      })
      .catch((err) => console.log(err));
  }, [
    formData.selectedValueFilter,
    formData.selectedGenreFilter,
    formData.titleInput,
    podcastData,
  ]);

  const podcastElement = podcastData.map((element) => {
    return (
      <div key={element.id}>
        <Preview podcastData={element} />
      </div>
    );
  });

  return (
    <>
      <nav>
        <p className="name">
          <span className="p">P</span>od<span className="p">P</span>ortal
        </p>
        <div className="navbar">
          <NavLink className="link" to="/">
            <StyledButton>Podcasts</StyledButton>
          </NavLink>
          <NavLink className="link" to="/favourites">
            <StyledButton>
              <Badge
                badgeContent={favouritesCtx.totalFavourites}
                color="success"
              >
                Favourites
              </Badge>
            </StyledButton>
          </NavLink>
        </div>
      </nav>

      <AudioPlayer />
      <button onClick={scrollToTopHandler} className="back-to-top-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="back-to-top"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
          />
        </svg>
      </button>

      <Routes>
        {/* <Route path="/loginPage" element={Login}></Route> */}
        <Route
          path="/"
          element={
            <>
              <Carousel data={podcastData} />
              <div className="filter-bar">
                <div>
                  <h2>
                    <SearchBox data={formData} changeHandler={handleChange} />
                  </h2>
                </div>
                <div>
                  <GenreDropdown data={formData} changeHandler={handleChange} />
                </div>
                <div>
                  <Dropdown data={formData} changeHandler={handleChange} />
                </div>
              </div>
              <div className="previews-container">{podcastElement}</div>
            </>
          }
        />
        <Route path="/show/:id" element={<Show />} />
        <Route
          path="/show/:id/season/:seasonNumber"
          element={<Episodes podcastData={podcastData} />}
        />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;

// const supabase = createClient(
//   "https://pboftvcxrpbbdjawbkrc.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBib2Z0dmN4cnBiYmRqYXdia3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMDEzODYsImV4cCI6MjAxNjY3NzM4Nn0.COmlMAs-G2q9hXHptorFA0Pasuw_vZMosXoYiAq9WDk"
// );

// export function Login() {
//   const [session, setSession] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     if (session) {
//       navigate("/");
//     }

//     return () => subscription.unsubscribe();
//   }, [navigate, session]);

//   if (!session) {
//     return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
//   }

//   return null;
// }
