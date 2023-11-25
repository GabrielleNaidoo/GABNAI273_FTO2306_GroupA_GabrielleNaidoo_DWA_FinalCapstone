import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

function CarouselComponent(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{props.carouselData.title}</h1>
      <div>
        <img
          className="preview-cover-image"
          src={props.carouselData.image}
          alt="cover image"
        ></img>
      </div>
      <p style={{ textAlign: "center" }}>
        {`${props.carouselData.description.slice(0, 350)}...`}
      </p>
    </div>
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
    <div
      style={{
        marginBottom: "10rem",
        height: "100vh",
      }}
    >
      <h1>Welcome to PodPortal</h1>
      <h3>You might like:</h3>
      <Slider {...settings}>{carouselItems}</Slider>
    </div>
  );
}

export default Carousel;
