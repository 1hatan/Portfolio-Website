import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "/Harani Gayathri Resume.pdf", download: true, label: "Resume" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver scroll-spy for active nav link
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id) => {
    if (id) setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo" onClick={() => handleLinkClick("home")}>
          <span className="navbar__logo-bracket">&lt;</span>
          Harani Gayathri
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`} aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={activeSection === link.id ? "active" : ""}
                  download={link.download ? "Harani Gayathri Resume.pdf" : undefined}
                  target={link.download ? "_blank" : undefined}
                  rel={link.download ? "noreferrer" : undefined}
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.download && <i className="bi bi-file-earmark-arrow-down navbar__icon" aria-hidden="true" />}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <a
            href="https://github.com/1hatan"
            target="_blank"
            rel="noreferrer"
            className="navbar__social-link"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <i className="bi bi-github" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/haranigayathri008/"
            target="_blank"
            rel="noreferrer"
            className="navbar__social-link"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <i className="bi bi-linkedin" aria-hidden="true" />
          </a>

          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title="Toggle dark / light mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
