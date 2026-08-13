import "./About.css";

const HIGHLIGHTS = [
  { label: "Education", value: "B.Sc in Computer Science", icon: "bi-mortarboard" },
  { label: "Role Target", value: "Junior Frontend / MERN Developer", icon: "bi-briefcase" },
  { label: "Core Stack", value: "React, JS, Node, Express, MongoDB", icon: "bi-code-slash" },
  { label: "Focus", value: "Responsive UI & REST API Integration", icon: "bi-layout-sidebar-inset" },
];

export default function About() {
  return (
    <section id="about" className="section section-alt about">
      <div className="container">
        <p className="eyebrow">&lt;About / HR Overview&gt;</p>
        <h2 className="section-heading reveal">Professional Summary</h2>

        <div className="about__grid">
          <div className="about__text-container reveal">
            <p className="about__text">
              I am a <strong>B.Sc in Computer Science graduate</strong> actively seeking an entry-level{" "}
              <strong>Frontend Web Developer or MERN Stack Developer</strong> position. With a strong academic foundation in computer applications and hands-on experience building real-world web projects, I focus on creating clean, accessible user interfaces backed by solid server logic.
            </p>

            <p className="about__text">
              My technical core includes <strong>HTML5, CSS3, JavaScript (ES6+), and React</strong> for frontend architecture, combined with <strong>Node.js, Express.js, MongoDB, and RESTful APIs</strong> for backend data flows. I maintain clean version control with Git/GitHub and prioritize responsive, mobile-first design across every build.
            </p>

            <p className="about__text">
              As a fresher, I bring strong problem-solving dedication, high learnability, and a commitment to writing clean, maintainable code that adds immediate value to engineering teams.
            </p>
          </div>

          <ul className="about__highlights">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h.label} className="about__highlight-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="about__highlight-icon">
                  <i className={`bi ${h.icon}`} aria-hidden="true" />
                </div>
                <div className="about__highlight-info">
                  <span className="about__highlight-label">{h.label}</span>
                  <span className="about__highlight-value">{h.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
