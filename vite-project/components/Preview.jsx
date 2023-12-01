import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, Chip } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  && {
    color: #999999;
    background-color: #05161a;
    padding: 0.4rem 0.6rem;
    border-radius: 1rem;
    box-shadow: -8px 8px 17px 0px rgba(12, 112, 117, 0.75);

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      padding: 0.2rem 0.3rem;

      gap: 1.5rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      gap: 1.7rem;
    }
  }
`;

const StyledChip = styled(Chip)`
  && {
    font-size: 0.8rem;
    font-weight: 400;
    padding: 0.2rem 0.4rem;
    color: #05161a;
    background-color: #999999;
  }
  @media screen and (min-width: 375px) and (max-width: 400px) {
    && {
      font-size: 0.5rem;
      letter-spacing: 0.03rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      font-size: 0.8rem;
      letter-spacing: 0.03rem;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 0.5rem;
      padding: 0.1rem 0.2rem;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    && {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    font-size: 0.8rem;
    font-weight: 400;
    color: #05161a;
    padding: 0.6rem 2rem;
    margin-bottom: 2rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
    letter-spacing: 0.04rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }

  @media screen and (min-width: 375px) and (max-width: 600px) {
    && {
      font-size: 0.6rem;
      padding: 0.2rem 1.2rem;
      margin-bottom: 1.5rem;
      letter-spacing: 0.02rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    && {
      font-size: 0.7rem;
      padding: 0.25rem 1.2rem;
      margin-bottom: 1.6rem;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 400px) {
    && {
      font-size: 0.5rem;
      padding: 0.2rem 1rem;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    && {
      font-size: 0.8rem;
      padding: 0.4rem 1.2rem;
    }
  }
`;

function Preview(props) {
  const genreTitle = {
    0: "All",
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const monthMatch = {
    1: "January",
    2: "Feburary",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const date = new Date(props.podcastData.updated);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const lastUpdated = `${day} ${monthMatch[month]} ${year}`;

  const genreMap = props.podcastData.genres.map((genre) => {
    return (
      <StyledChip
        key={genre}
        label={genreTitle[genre].toUpperCase()}
      ></StyledChip>
    );
  });

  return (
    <StyledCard>
      <p className="preview-title title">{props.podcastData.title}</p>
      <div className="preview-image-container flex-column">
        <img
          className="preview-image image"
          src={props.podcastData.image}
          alt="cover image"
        ></img>
      </div>

      <div className="preview-genres">{genreMap}</div>
      <div className="preview-info">
        <h4 className="preview-seasons">
          {`${props.podcastData.seasons} ${
            props.podcastData.seasons > 1 ? "SEASONS" : "SEASON"
          }`}
        </h4>
        <h4>Updated: {lastUpdated}</h4>
      </div>
      <div className="preview-button-container flex-column">
        <NavLink
          className="link"
          style={{}}
          to={`/show/${props.podcastData.id}`}
        >
          <StyledButton
            className="preview-button"
            variant="contained"
            size="small"
          >
            See show details
          </StyledButton>
        </NavLink>
      </div>
    </StyledCard>
  );
}

export default Preview;
