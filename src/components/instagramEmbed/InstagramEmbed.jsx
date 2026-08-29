import { useEffect } from "react";
import "./instagramEmbed.css"

function InstagramEmbed({ url, captioned = true }) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existingScript) {
      window.instgrm?.Embeds?.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;

    script.onload = () => {
      window.instgrm?.Embeds?.process();
    };

    document.body.appendChild(script);
  }, []);

  return (
<div className="about-reel">
  <a
    href="https://www.instagram.com/reel/Dcg55wNhY9v/"
    target="_blank"
    rel="noopener noreferrer"
    className="about-reel-link"
  >
    <div className="about-reel-image-wrap">
      <img
        src="/images/parade-reel-preview.jpg"
        alt="Parade of Elements marcher dressed as rhodium"
        className="about-reel-image"
      />

      <span className="about-reel-play" aria-hidden="true">
        ▶
      </span>
    </div>

    <div className="about-reel-caption">
      <span>See the periodic table in motion</span>
      <span>Watch on Instagram →</span>
    </div>
  </a>
</div>
  );
}

export default InstagramEmbed;