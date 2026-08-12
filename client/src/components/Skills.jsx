import { useEffect, useRef, useState } from "react";
import skills from "../data/skills.js";
import "./Skills.css";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

export default function Skills() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="container">
        <p className="eyebrow">&lt;Skills & Technologies /&gt;</p>
        <h2 className="section-heading reveal">Technical Stack</h2>
        <p className="section-sub reveal">
          Categorized technical skills and tools used in my project implementations.
        </p>

        {/* Recruiter Category Filter Tabs */}
        <div className="skills__tabs reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`skills__tab ${selectedCategory === cat ? "is-active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills__grid">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className="skill-card reveal"
              style={{ transitionDelay: `${(idx % 4) * 0.08}s` }}
            >
              <div className="skill-card__top">
                <span className="skill-card__name">{skill.name}</span>
                <span className="skill-card__level">{skill.level}%</span>
              </div>

              <div className="skill-card__track">
                <div
                  className="skill-card__fill"
                  style={{ width: animate ? `${skill.level}%` : "0%" }}
                >
                  <span className="skill-card__handle" />
                </div>
              </div>

              <span className="skill-card__category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
