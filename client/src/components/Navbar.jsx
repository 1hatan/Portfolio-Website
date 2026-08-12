import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
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
    const sectionElements = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);

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

  // Close mobile menu on link click
  const handleLinkClick = (id) => {
    setActiveSection(id);
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
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === link.id ? "active" : ""}
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
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
