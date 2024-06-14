import React, { useState } from 'react';
import rafael from './images/imagem-2-real.png';

const images = [
  { src: rafael, alt: "Molécula 1" },
  { src: rafael, alt: "Molécula 2" },
  { src: rafael, alt: "Molécula 3" }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showSlide = (index) => {
    setCurrentSlide((index + images.length) % images.length);
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
      <div className="carousel-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={index === currentSlide ? 'active' : ''}
          />
        ))}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Carousel;
