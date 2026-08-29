import { useState } from "react";
import "./photoGallery.css";

import parade01 from "../../images/gallery/am.JPG";
import parade02 from "../../images/gallery/banner01.JPEG";
import parade03 from "../../images/gallery/bk-pd.JPG";
import parade04 from "../../images/gallery/group01.JPG";
import parade05 from "../../images/gallery/group02.JPG";
import parade06 from "../../images/gallery/group03.JPG";
import parade07 from "../../images/gallery/group04.JPG";
import parade08 from "../../images/gallery/hafnium.JPG";
import parade09 from "../../images/gallery/lithium-isotopes.JPG";
import parade10 from "../../images/gallery/marching01.JPG";
import parade11 from "../../images/gallery/marching02.JPG";
import parade12 from "../../images/gallery/marching03.JPG";
import parade13 from "../../images/gallery/marching04.JPG";
import parade14 from "../../images/gallery/marching05.JPG";
import parade15 from "../../images/gallery/mercury.JPEG";
import parade16 from "../../images/gallery/oxygen.JPEG";
import parade17 from "../../images/gallery/th-pd-am-fe.JPG";


const photos = [
  {
    src: parade01,
    alt: "Parade of Elements participants americium",
  },
  {
    src: parade02,
    alt: "Parade of Elements participants banner",
  },
  {
    src: parade03,
    alt: "Parade of Elements participants berkelium palladium",
  },
  {
    src: parade04,
    alt: "Parade of Elements participants group",
  },
  {
    src: parade05,
    alt: "Parade of Elements participants group",
  },
  {
    src: parade06,
    alt: "Parade of Elements participants group",
  },
  {
    src: parade07,
    alt: "Parade of Elements participants group",
  },
  {
    src: parade08,
    alt: "Parade of Elements participants hafnium",
  },
  {
    src: parade09,
    alt: "Parade of Elements participants lithium",
  },
  {
    src: parade10,
    alt: "Parade of Elements participants marching",
  },
  {
    src: parade11,
    alt: "Parade of Elements participants marching",
  },
  {
    src: parade12,
    alt: "Parade of Elements participants marching",
  },
  {
    src: parade13,
    alt: "Parade of Elements participants marching",
  },
  {
    src: parade14,
    alt: "Parade of Elements participants marching",
  },
  {
    src: parade15,
    alt: "Parade of Elements participants mercury",
  },
  {
    src: parade16,
    alt: "Parade of Elements participants oxygen",
  },
  {
    src: parade17,
    alt: "Parade of Elements participants th-pd-am-fe",
  },

];

function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1
    );
  };

  const currentPhoto = photos[currentIndex];

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-heading gallery-heading">
        <p className="eyebrow">The elements in action</p>
        <h2>The Elements, Assembled.</h2>
        <p>
          Take a look at the costumes, chemistry, creativity, and amazing puns from past Dragon Con parades.
        </p>
      </div>

      <div className="gallery-carousel">
        <button
          className="gallery-arrow gallery-arrow-previous"
          type="button"
          onClick={showPrevious}
          aria-label="Show previous photo"
        >
          <span aria-hidden="true">←</span>
        </button>

      <div className="gallery-frame">
        <img
          className="gallery-image"
          src={currentPhoto.src}
          alt={currentPhoto.alt}
        />
      </div>

        <button
          className="gallery-arrow gallery-arrow-next"
          type="button"
          onClick={showNext}
          aria-label="Show next photo"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="gallery-footer">
        <p className="gallery-count" aria-live="polite">
          {currentIndex + 1} / {photos.length}
        </p>

        <div className="gallery-dots" aria-label="Choose a gallery photo">
          {photos.map((photo, index) => (
            <button
              className={`gallery-dot ${
                index === currentIndex ? "gallery-dot-active" : ""
              }`}
              type="button"
              key={photo.src}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotoGallery;