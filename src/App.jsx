import { useEffect, useMemo, useState } from "react";
import Countdown from "./components/countdownTimer/Countdown";
import Table from "./components/pTable/Table";
import ClaimForm from "./components/claimForm/ClaimForm";
import useElementStatus from "./hooks/useElementStatus";
import paradeBanner from "./images/parade-banner.jpg"
import "./App.css";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("poe-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function App() {
  const { statusMap, loading } = useElementStatus();
  const [theme, setTheme] = useState(getInitialTheme);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("poe-theme", theme);
  }, [theme]);

  const assigned = useMemo(
    () =>
      Object.keys(statusMap)
        .filter((number) => statusMap[number] === "unavailable")
        .map(Number),
    [statusMap]
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selectElement = (element) => {
    setSelectedElement(element);
    window.setTimeout(() => scrollTo("claim"), 0);
  };

  const clearSelection = () => {
    setSelectedElement(null);
    scrollTo("elements");
  };

  return (
    <div className="app-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <button className="brand-button" onClick={() => scrollTo("home")}>
          <span className="brand-mark" aria-hidden="true">PoE</span>
          <span>Parade of Elements</span>
        </button>

        <div className="nav-actions">
          <button className="nav-link" onClick={() => scrollTo("elements")}>
            Choose an element
          </button>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
            <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </nav>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Dragon Con Parade · Saturday, September 5, 2026</p>
            <Countdown />
            <h1>Join the Parade of Elements</h1>
            <p className="hero-intro">
              Choose an element, claim your place, and help bring the periodic
              table to life at Dragon Con.
            </p>
            <button className="primary-button" onClick={() => scrollTo("elements")}>
              Find your element
            </button>
          </div>

        <div className="hero-banner">
          <img
            src={paradeBanner}
            alt="Parade of Elements participants marching in element costumes"
          />
        </div>
        </section>

        <section id="elements" className="table-section">
          <div className="section-heading">
            <p className="eyebrow">Step one</p>
            <h2>Choose an available element</h2>
            <p>Unavailable elements are dimmed. Select any colorful cell to continue.</p>
          </div>

          {loading && <p className="status-message">Loading available elements…</p>}
          <Table assigned={assigned} onCellClick={selectElement} readOnly={false} />
        </section>

        {selectedElement && (
          <section id="claim" className="claim-section">
            <ClaimForm element={selectedElement} onCancel={clearSelection} />
          </section>
        )}
      </main>

      <footer className="site-footer">
        <span>Parade of Elements</span>
        <span>Made with 💜 for Dragon Con science fans.</span>
      </footer>
    </div>
  );
}

export default App;
