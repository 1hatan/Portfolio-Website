import "./About.css";

const HIGHLIGHTS = [
  { label: "Focus", value: "Responsive, user-friendly UI", icon: "bi-layout-sidebar-inset" },
  { label: "Stack", value: "HTML, CSS, JavaScript, React", icon: "bi-code-slash" },
  { label: "Currently", value: "Seeking Frontend roles", icon: "bi-briefcase" },
];

export default function About() {
  return (
    <section id="about" className="section section-alt about">
      <div className="container">
        <p className="eyebrow">&lt;About/&gt;</p>
        <h2 className="section-heading reveal">Who I am</h2>

        <div className="about__grid">
          <div className="about__text-container reveal">
            <p className="about__text">
              I&apos;m Harani Gayathri, a frontend web developer at the start of my career and
              genuinely excited about building for the web. I care about the details that make a
              site feel good to use — clear layouts, fast load times, and interfaces that work
              just as well on a small phone screen as they do on a desktop monitor.
            </p>
            <p className="about__text">
              As a fresher, I&apos;ve focused on building a strong foundation in HTML, CSS, and
              JavaScript, and I use React to build reusable, component-driven interfaces. Git and
              GitHub are part of my everyday workflow, so my code stays organized and easy to
              collaborate on. I&apos;m looking for a Frontend Web Developer role where I can keep
              learning, contribute from day one, and grow alongside a team that values good craft.
            </p>
          </div>

          <ul className="about__highlights">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h.label} className="about__highlight-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
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
