import "./Footer.css";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/1hatan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/haranigayathri008/" },
  { label: "Email", href: "mailto:gayathri.dev2317@gmail.com" },
  { label: "Resume PDF", href: "/Harani Gayathri Resume.pdf", download: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {year} Harani Gayathri. All rights reserved. | Frontend & MERN Stack Developer</p>

        <ul className="footer__socials">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.download ? "_blank" : "_blank"}
                rel="noreferrer"
                download={s.download ? "Harani Gayathri Resume.pdf" : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
