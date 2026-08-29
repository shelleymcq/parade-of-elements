import "./about.css";
import preview from "../../images/rad-og.png"

function About() {
  return (
    <section id="more-info" className="about-section">
      <div className="about-shell">
        <header className="about-header">
          <p className="about-kicker">
            <span aria-hidden="true">Be</span>
            About the Parade Group
          </p>

          <h2>
            Science. Costumes.
            <span>A suspicious number of puns.</span>
          </h2>

          <p className="about-lead">
            The Parade of Elements brings the periodic table to life at Dragon
            Con, with each participant representing a chemical element through
            costumes, signs, and plenty of scientific enthusiasm.
          </p>
        </header>

        <div className="about-story">
          <div className="about-story-marker" aria-hidden="true">
            <span>118</span>
            <small>possible elements</small>
          </div>

          <div className="about-story-copy">
            <p className="about-history">
              Since 2009, the Parade of Elements has brought chemistry to the
              streets of Atlanta one atom at a time.
            </p>

            <p>
              Every marcher represents a unique chemical element, transforming
              the group into a colorful, walking periodic table that has become
              one of Dragon Con&apos;s most recognizable parade groups.
            </p>

            <p>
              Costumes range from historically accurate to delightfully
              ridiculous, and element-themed puns are highly encouraged.
              Whether you&apos;re channeling Nobel-worthy chemistry or just
              looking for the perfect joke, there&apos;s an element for
              everyone.
            </p>
          <div className="about-reel">
            <a
              href="https://www.instagram.com/reel/Dcg55wNhY9v/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-reel-link"
            >
              <div className="about-reel-image-wrap">
                <img
                  src={preview}
                  alt="Parade of Elements marchers as radium and oganesson"
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
          </div>
        </div>
        
        <div className="about-details">
          <section className="about-panel participate-panel">
            <div className="about-panel-heading">
              <span className="about-panel-number" aria-hidden="true">
                01
              </span>

              <div>
                <p className="about-panel-label">Join the table</p>
                <h3>How to Participate</h3>
              </div>
            </div>

            <p>
              Choose an available element, register your selection, and start planning your costume and element sign. The element sign can be incorporated in any way you choose but must include the element name or abreviation and the atomic number. 
            </p>

            <p className="family-reminder">
              Remember that this is a family-friendly event when choosing your element/costume design.
            </p>

            <p>
              Closer to the parade, you&apos;ll receive meetup details, lineup information, and everything you&apos;ll need for parade day.
            </p>

            <a className="about-action" href="#elements">
              Choose your element
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <section className="about-panel contact-panel">
            <div className="about-panel-heading">
              <span className="about-panel-number" aria-hidden="true">
                02
              </span>

              <div>
                <p className="about-panel-label">Stay in Touch</p>
                <h3>Questions?</h3>
              </div>
            </div>

            <p>
              First-time marcher, returning element, or just curious about how this wonderfully nerdy thing works? We&apos;d love to hear from you.
            </p>

            <a
              className="contact-email"
              href="mailto:paradeofelements@gmail.com"
            >
              paradeofelements@gmail.com
            </a>

            <p>
              Follow us on social media.
            </p>
            
            <div className="about-socials">
              <a
                href="https://www.facebook.com/groups/116802341707801/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>

              <a
                href="https://instagram.com/parade_of_elements/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </section>
        </div>

        <aside className="about-invitation">
          <span className="about-invitation-symbol" aria-hidden="true">
            Au
          </span>

          <p>
            Know someone coming to Dragon Con who loves science, cosplay, and puns?
            <strong> Please spread the word.</strong>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default About;