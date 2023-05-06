import Carousel from "react-bootstrap/Carousel";
import "./App.css";

function Slider() {
  return (
    <Carousel variant="dark" className="lessWidth mainSlider">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/slider/welcomeHDCOLOR.png"
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h5>¡Trabaja con nosotros!</h5> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/slider/imagenBoard.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          {/* <h5 className="blackFont">¡Organízate de la mejor manera!</h5> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/slider/imagenAddBoard.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
