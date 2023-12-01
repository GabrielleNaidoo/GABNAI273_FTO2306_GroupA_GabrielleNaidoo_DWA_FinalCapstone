import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import { Card } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  && {
    height: 60vh;
    padding: 3rem 8rem;
    color: #999999;

    background-color: #05161a;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
  }
`;

const StyledCarousel = styled(Slider)`
  && {
    width: 80vw;
    margin-top: 4rem;
  }

  @media only screen and (min-width: 375px) and (max-width: 1000px) {
    && {
      display: none;
      margin-top: 0;
    }
  }
`;

function CarouselComponent(props) {
  return (
    <StyledCard>
      <img
        className="carousel-image"
        src={props.carouselData.image}
        alt="cover image"
      ></img>
      <div className="carousel-text-inside">
        <h1 className="carousel-title title">{props.carouselData.title}</h1>
        <p className="carousel-description">{`${props.carouselData.description.slice(
          0,
          350
        )}...`}</p>
      </div>
    </StyledCard>
  );
}

function Carousel(props) {
  const carouselArray = props.data.slice(15, 20);

  const carouselItems = carouselArray.map((carouselItem) => {
    return (
      <div key={carouselItem.id}>
        <CarouselComponent carouselData={carouselItem} />
      </div>
    );
  });

  const settings = {
    dots: true,
    className: "center",
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 400,
    fade: true,
  };
  return (
    <div className="carousel-content flex-column">
      <p className="carousel-text">You might like:</p>

      <div className="carousel flex-column">
        <StyledCarousel {...settings}>{carouselItems}</StyledCarousel>
      </div>
    </div>
  );
}

export default Carousel;
