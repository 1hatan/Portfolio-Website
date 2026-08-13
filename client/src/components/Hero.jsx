import { useEffect, useState, useRef } from "react";
import heroCharacterImg from "./images/harani-hero.png";
import "./Hero.css";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/1hatan", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/haranigayathri008/", icon: "linkedin" },
  { label: "Email", href: "mailto:gayathri.dev2317@gmail.com", icon: "envelope" },
];

const CODE_LINES = [
  { indent: 0, text: "const developer = {" },
  { indent: 1, text: 'name: "Harani Gayathri",' },
  { indent: 1, text: 'role: "Frontend | MERN Developer",' },
  { indent: 1, text: 'degree: "B.Sc in Computer Science",' },
  { indent: 1, text: "skills: ['React', 'JS', 'Node', 'MongoDB']," },
  { indent: 1, text: "openToWork: true," },
  { indent: 0, text: "};" },
  { indent: 0, text: "export default developer;" },
];

const FLOATING_BADGES = [
  { name: "React", icon: "bi-atom", color: "#61dafb", top: "8%", left: "-4%" },
  { name: "Node.js", icon: "bi-node-plus", color: "#68a063", top: "35%", right: "-8%" },
  { name: "MongoDB", icon: "bi-database", color: "#47a248", bottom: "16%", left: "-6%" },
  { name: "JavaScript", icon: "bi-filetype-js", color: "#f7df1e", bottom: "8%", right: "-2%" },
];

export default function Hero() {
  const [typedLines, setTypedLines] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const heroRef = useRef(null);

  // Parallax tilt logic on mouse movement over Hero
  useEffect(() => {
    const heroNode = heroRef.current;
    if (!heroNode) return;

    let requestID = null;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = heroNode.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      if (requestID) cancelAnimationFrame(requestID);

      requestID = requestAnimationFrame(() => {
        heroNode.style.setProperty("--mouse-x", `${x}`);
        heroNode.style.setProperty("--mouse-y", `${y}`);
      });
    };

    const handleMouseLeave = () => {
      heroNode.style.setProperty("--mouse-x", "0");
      heroNode.style.setProperty("--mouse-y", "0");
    };

    heroNode.addEventListener("mousemove", handleMouseMove, { passive: true });
    heroNode.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroNode.removeEventListener("mousemove", handleMouseMove);
      heroNode.removeEventListener("mouseleave", handleMouseLeave);
      if (requestID) cancelAnimationFrame(requestID);
    };
  }, []);

  // Editor typing animation
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;

    function typeNext() {
      if (cancelled || lineIndex >= CODE_LINES.length) return;

      const currentLine = CODE_LINES[lineIndex].text;

      if (charIndex <= currentLine.length) {
        setTypedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        charIndex += 1;
        setTimeout(typeNext, 18 + Math.random() * 20);
      } else {
        lineIndex += 1;
        charIndex = 0;
        if (lineIndex < CODE_LINES.length) {
          setTypedLines((prev) => [...prev, ""]);
          setTimeout(typeNext, 140);
        }
      }
    }

    const start = setTimeout(typeNext, 400);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Background ambient lighting effects */}
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="hero__bg-grid" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__eyebrow-wrapper hero-reveal hero-reveal--1">
            <p className="eyebrow">&lt;Frontend & MERN Developer/&gt;</p>
            <span className="hero__status-badge">
              <span className="hero__status-dot" /> Available for Junior / Fresher Roles
            </span>
          </div>

          <h1 className="hero__title hero-reveal hero-reveal--2">
            Hi, I&apos;m <span className="hero__title-accent">Harani Gayathri</span>
          </h1>

          <p className="hero__tagline hero-reveal hero-reveal--3">
            Frontend Developer | MERN Stack Developer
          </p>

          <p className="hero__desc hero-reveal hero-reveal--4">
            B.Sc in Computer Science graduate specializing in building fast, responsive frontend web interfaces
            and full-stack MERN applications using HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.
          </p>

          <div className="hero__actions hero-reveal hero-reveal--5">
            <a href="#projects" className="btn btn-primary">
              <i className="bi bi-folder-check" aria-hidden="true" /> View Projects
            </a>
            <a href="/Harani Gayathri Resume.pdf" download="Harani Gayathri Resume.pdf" className="btn btn-outline">
              <i className="bi bi-file-earmark-arrow-down" aria-hidden="true" /> Download Resume
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>
          </div>

          <ul className="hero__socials hero-reveal hero-reveal--6" aria-label="Social media links">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                  <i className={`bi bi-${s.icon}`} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual hero-reveal hero-reveal--3">
          {/* Animated Developer Character Container */}
          <div className="hero__character-wrapper">
            <div className="hero__character-backdrop" />
            <div className="hero__character-ring hero__character-ring--1" />
            <div className="hero__character-ring hero__character-ring--2" />

            <button
              type="button"
              className="hero__character-btn"
              onClick={() => setShowModal(true)}
              aria-label="View character avatar full screen"
              title="Click to expand character view"
            >
              <div className="hero__character-frame">
                <img
                  className="hero__character-img"
                  src={heroCharacterImg}
                  alt="Developer character portrait of Harani Gayathri, Frontend Web Developer"
                />
              </div>
            </button>

            {/* Floating Tech Stack Badges */}
            {FLOATING_BADGES.map((b, i) => (
              <div
                key={b.name}
                className={`hero__floating-badge hero__floating-badge--${i + 1}`}
                style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }}
              >
                <i className={`bi ${b.icon}`} style={{ color: b.color }} />
                <span>{b.name}</span>
              </div>
            ))}
          </div>

          {/* Interactive Code Editor Mockup */}
          <div className="hero__editor" aria-hidden="true">
            <div className="hero__editor-bar">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
              <span className="hero__editor-title">intro.js</span>
            </div>
            <pre className="hero__editor-body">
              {typedLines.map((line, i) => (
                <div className="hero__editor-line" key={i}>
                  <span className="hero__editor-lineno">{i + 1}</span>
                  <span>{line}</span>
                  {i === typedLines.length - 1 && <span className="hero__cursor" />}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>

      {/* Character Modal Overlay */}
      {showModal && (
        <div
          className="hero__photo-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Developer character preview"
          onClick={() => setShowModal(false)}
        >
          <div className="hero__photo-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="hero__photo-close"
              onClick={() => setShowModal(false)}
              aria-label="Close character preview"
            >
              ×
            </button>
            <div className="hero__photo-content">
              <img
                className="hero__photo-full"
                src={heroCharacterImg}
                alt="Developer character representation of Harani Gayathri"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
