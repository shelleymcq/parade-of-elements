import "./navbar.css";

function Navbar({ theme, onThemeToggle, onNavigate }) {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <button
        className="brand-button"
        type="button"
        onClick={() => onNavigate("home")}
      >
        <span className="brand-mark" aria-hidden="true">
          PoE
        </span>
        <span>Parade of Elements</span>
      </button>

      <div className="nav-links">
        <button
          className="nav-link"
          type="button"
          onClick={() => onNavigate("elements")}
        >
          Elements
        </button>

        <button
          className="nav-link"
          type="button"
          onClick={() => onNavigate("gallery")}
        >
          Gallery
        </button>

        <button
          className="nav-link"
          type="button"
          onClick={() => onNavigate("more-info")}
        >
          About
        </button>
      </div>

      <button
        className="theme-toggle"
        type="button"
        onClick={onThemeToggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
        <span className="theme-label">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      </button>
    </nav>
  );
}

export default Navbar;