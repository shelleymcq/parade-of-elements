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

// 2026 additions
import parade9003 from "../../images/gallery/ROSS9003.jpg"
import parade9004 from "../../images/gallery/ROSS9004.jpg"
import parade9010 from "../../images/gallery/ROSS9010.jpg"
import parade9012 from "../../images/gallery/ROSS9012.jpg"
import parade9016 from "../../images/gallery/ROSS9016.jpg"
import parade9018 from "../../images/gallery/ROSS9018.jpg"
import parade9023 from "../../images/gallery/ROSS9023.jpg"
import parade9026 from "../../images/gallery/ROSS9026.jpg"
import parade9029 from "../../images/gallery/ROSS9029.jpg"
import parade9030 from "../../images/gallery/ROSS9030.jpg"
import parade9034 from "../../images/gallery/ROSS9034.jpg"
import parade9046 from "../../images/gallery/ROSS9046.jpg"
import parade9050 from "../../images/gallery/ROSS9050.jpg"
import parade9053 from "../../images/gallery/ROSS9053.jpg"
import parade9067 from "../../images/gallery/ROSS9067.jpg"
import parade9092 from "../../images/gallery/ROSS9092.jpg"
import parade9109 from "../../images/gallery/ROSS9109.jpg"
import parade9110 from "../../images/gallery/ROSS9110.jpg"
import parade9119 from "../../images/gallery/ROSS9119.jpg"
import parade9122 from "../../images/gallery/ROSS9122.jpg"
import parade9124 from "../../images/gallery/ROSS9124.jpg"



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
  {
    src: parade9003,
    alt: "Parade of Elements participants platinum",
  },
  {
    src: parade9004,
    alt: "Parade of Elements participants neptumium",
  },
  {
    src: parade9010,
    alt: "Parade of Elements participants lead",
  },
  {
    src: parade9012,
    alt: "Parade of Elements participants polonium",
  },
  {
    src: parade9016,
    alt: "Parade of Elements participants potassium",
  },
  {
    src: parade9018,
    alt: "Parade of Elements participants mercury",
  },
  {
    src: parade9023,
    alt: "Parade of Elements participants californium",
  },
  {
    src: parade9026,
    alt: "Parade of Elements participants berkelium",
  },
  {
    src: parade9029,
    alt: "Parade of Elements participants thorium",
  },
  {
    src: parade9030,
    alt: "Parade of Elements participants helium",
  },
  {
    src: parade9034,
    alt: "Parade of Elements participants nickel",
  },
  {
    src: parade9046,
    alt: "Parade of Elements participants mg-ba",
  },
  {
    src: parade9050,
    alt: "Parade of Elements participants nihonium",
  },
  {
    src: parade9053,
    alt: "Parade of Elements participants boron",
  },
  {
    src: parade9067,
    alt: "Parade of Elements participants three mad scientists",
  },
  {
    src: parade9092,
    alt: "Parade of Elements participants as-md",
  },
  {
    src: parade9109,
    alt: "Parade of Elements participants sn-au-hg-f",
  },
  {
    src: parade9110,
    alt: "Parade of Elements participants sodium",
  },
  {
    src: parade9119,
    alt: "Parade of Elements participants americium",
  },
  {
    src: parade9122,
    alt: "Parade of Elements participants mad scientist",
  },
  {
    src: parade9124,
    alt: "Parade of Elements participants lawrencium",
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