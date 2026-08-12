import { useState, useRef } from "react";
import projects from "../data/projects.js";
import "./Projects.css";

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section section-alt projects">
      <div className="container">
        <p className="eyebrow">&lt;Projects & Case Studies /&gt;</p>
        <h2 className="section-heading reveal">Featured Implementations</h2>
        <p className="section-sub reveal">
          Real-world applications and practice builds evaluated on problem-solving, clean code, and full-stack MERN capability.
        </p>

        {/* ============================================================
           FEATURED PROJECT SHOWCASE (Infinity Run / Marathon)
           ============================================================ */}
        {featuredProject && (
          <div className="featured-project reveal">
            <div className="featured-project__badge">
              <i className="bi bi-star-fill" aria-hidden="true" /> {featuredProject.badge || "Featured Project"}
            </div>

            <div className="featured-project__grid">
              <div className="featured-project__info">
                <h3 className="featured-project__title">{featuredProject.title}</h3>
                <p className="featured-project__summary">{featuredProject.summary}</p>

                <div className="project-detail-box">
                  <h4 className="project-detail-heading">
                    <i className="bi bi-exclamation-circle" aria-hidden="true" /> Problem & Purpose
                  </h4>
                  <p>{featuredProject.problem}</p>
                </div>

                <div className="project-detail-box">
                  <h4 className="project-detail-heading">
                    <i className="bi bi-person-check" aria-hidden="true" /> My Contribution
                  </h4>
                  <p>{featuredProject.contribution}</p>
                </div>

                <div className="project-detail-box">
                  <h4 className="project-detail-heading">
                    <i className="bi bi-check2-circle" aria-hidden="true" /> Key Features
                  </h4>
                  <ul className="project-features-list">
                    {featuredProject.features.map((f) => (
                      <li key={f}>
                        <i className="bi bi-check-lg" aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech-group">
                  <span className="project-tech-label">Stack:</span>
                  <ul className="project-card__tech">
                    {featuredProject.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="featured-project__actions">
                  {featuredProject.caseStudy && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setActiveCaseStudy(featuredProject)}
                    >
                      <i className="bi bi-journal-code" aria-hidden="true" /> View Case Study
                    </button>
                  )}

                  <a href={featuredProject.demoUrl} className="btn btn-outline" target="_blank" rel="noreferrer">
                    <i className="bi bi-box-arrow-up-right" aria-hidden="true" /> Live Demo
                  </a>

                  <a href={featuredProject.githubUrl} className="btn btn-outline" target="_blank" rel="noreferrer">
                    <i className="bi bi-github" aria-hidden="true" /> GitHub Code
                  </a>
                </div>
              </div>

              <div className="featured-project__visual">
                <div className="featured-project__image-container">
                  <img
                    src={featuredProject.imageUrl}
                    alt={`${featuredProject.title} dashboard preview`}
                    loading="lazy"
                  />
                  <div className="featured-project__overlay">
                    <span>MERN Stack Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
           SECONDARY PROJECTS GRID
           ============================================================ */}
        <h3 className="section-subheading reveal" style={{ marginTop: "64px" }}>
          Other Notable Projects
        </h3>

        <div className="projects__grid">
          {otherProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* ============================================================
         CASE STUDY MODAL
         ============================================================ */}
      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      )}
    </section>
  );
}

/* Secondary Project Card Component */
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

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

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
      <div className="project-card__image">
        <img src={project.imageUrl} alt={`${project.title} preview`} loading="lazy" />
      </div>

      <div className="project-card__body">
        <h4 className="project-card__title">{project.title}</h4>
        <p className="project-card__summary">{project.summary}</p>

        <div className="project-card__meta">
          <p className="project-card__problem">
            <strong>Problem:</strong> {project.problem}
          </p>
          <p className="project-card__contribution">
            <strong>Contribution:</strong> {project.contribution}
          </p>
        </div>

        <ul className="project-card__features-mini">
          {project.features.slice(0, 3).map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>

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

/* Case Study Modal Component */
function CaseStudyModal({ project, onClose }) {
  const cs = project.caseStudy;
  if (!cs) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-dialog case-study-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close Case Study">
          ×
        </button>

        <div className="case-study__header">
          <span className="case-study__eyebrow">Full-Stack MERN Case Study</span>
          <h3 className="case-study__title">{project.title}</h3>
          <p className="case-study__subtitle">{project.summary}</p>
        </div>

        <div className="case-study__body">
          <div className="case-study__section">
            <h4>
              <i className="bi bi-lightning-charge" aria-hidden="true" /> Challenge & Problem
            </h4>
            <p>{cs.challenge}</p>
          </div>

          <div className="case-study__section">
            <h4>
              <i className="bi bi-compass" aria-hidden="true" /> Technical Approach
            </h4>
            <p>{cs.approach}</p>
          </div>

          <div className="case-study__section">
            <h4>
              <i className="bi bi-cpu" aria-hidden="true" /> MERN Architecture Breakdown
            </h4>
            <ul className="cs-tech-list">
              <li>
                <strong>Frontend:</strong> {cs.techArchitecture.frontend}
              </li>
              <li>
                <strong>Backend:</strong> {cs.techArchitecture.backend}
              </li>
              <li>
                <strong>Database:</strong> {cs.techArchitecture.database}
              </li>
            </ul>
          </div>

          <div className="case-study__section">
            <h4>
              <i className="bi bi-hdd-network" aria-hidden="true" /> Database Schema & REST API
            </h4>
            <p>{cs.databaseApi}</p>
          </div>

          <div className="case-study__section">
            <h4>
              <i className="bi bi-trophy" aria-hidden="true" /> Results & Impact
            </h4>
            <p>{cs.result}</p>
          </div>

          <div className="case-study__section">
            <h4>
              <i className="bi bi-lightbulb" aria-hidden="true" /> Key Engineering Lessons Learned
            </h4>
            <p>{cs.whatILearned}</p>
          </div>
        </div>

        <div className="case-study__footer">
          <a href={project.demoUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
            <i className="bi bi-box-arrow-up-right" aria-hidden="true" /> View Live Demo
          </a>
          <a href={project.githubUrl} className="btn btn-outline" target="_blank" rel="noreferrer">
            <i className="bi bi-github" aria-hidden="true" /> View GitHub Repository
          </a>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
