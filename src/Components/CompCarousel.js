import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import bg from "../Images/bg.jpg"
import bg1 from "../Images/bg1.jpg"
import gauri from "../Images/gauri.jpg"

export default function CompCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
      <Carousel.Item>
        <img
          className="d-block "
          style={{width: "100vw", height: "70vh"}}
          src={bg}
          alt="First slide"
        />
        <Carousel.Caption className="text-light">
          <h3>First slide label</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam hic quas tempora officiis cum blanditiis reprehenderit earum tenetur voluptatibus adipisci culpa quisquam quae ab architecto animi ipsum, amet autem at. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit recusandae harum modi sed quis at labore totam. Recusandae, maiores exercitationem? Ad optio similique, dolore repellat veritatis a qui totam voluptatibus.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style={{width: "100vw", height: "70vh"}}
          src={bg1}
          alt="Second slide"
        />

        <Carousel.Caption className="text-light">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style={{width: "100vw", height: "70vh"}}
          src={gauri}
          alt="Third slide"
        />

        <Carousel.Caption className="text-light">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

