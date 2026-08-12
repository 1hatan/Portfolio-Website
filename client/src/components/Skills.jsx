import { useEffect, useRef, useState } from "react";
import skills from "../data/skills.js";
import "./Skills.css";

function SkillCard({ skill, animate, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={cardRef}
      className="skill-card reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

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
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills" ref={sectionRef}>
      <div className="container">
        <p className="eyebrow">&lt;Skills /&gt;</p>
        <h2 className="section-heading reveal">What I work with</h2>
        <p className="section-sub reveal">
          Tools and technologies I use to design and build interfaces.
        </p>

        <div className="skills__grid">
          {skills.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} animate={animate} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
