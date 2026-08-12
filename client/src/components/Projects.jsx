import { useRef } from "react";
import projects from "../data/projects.js";
import "./Projects.css";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg
    const rotateY = ((x - centerX) / centerX) * 7;  // max 7 deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <article
      ref={cardRef}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card__glow" aria-hidden="true" />
      <div className="project-card__image" aria-hidden={project.imageUrl ? "false" : "true"}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={`${project.title} preview`} loading="lazy" />
        ) : (
          <span>{project.title}</span>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <ul className="project-card__tech">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="project-card__actions">
          <a href={project.demoUrl} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">
            <i className="bi bi-box-arrow-up-right" aria-hidden="true" /> Live Demo
          </a>
          <a href={project.githubUrl} className="btn btn-outline btn-sm" target="_blank" rel="noreferrer">
            <i className="bi bi-github" aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-alt projects">
      <div className="container">
        <p className="eyebrow">&lt;Projects/&gt;</p>
        <h2 className="section-heading reveal">Things I&apos;ve built</h2>
        <p className="section-sub reveal">
          A mix of practice projects and real builds — each one taught me something new.
        </p>

        <div className="projects__grid">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
