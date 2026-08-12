import { useState } from "react";
import "./Contact.css";

const INITIAL_FORM = { name: "", email: "", message: "" };

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.message.trim()) {
    errors.message = "Please add a short message.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section section-alt contact">
      <div className="container contact__grid">
        <div className="reveal">
          <p className="eyebrow">&lt;Get In Touch / Recruiter Contact&gt;</p>
          <h2 className="section-heading">Let&apos;s Connect</h2>
          <p className="section-sub">
            Actively open for <strong>Fresher / Junior Frontend Developer & MERN Stack Developer</strong> positions. Feel free to reach out via email, LinkedIn, or send a direct message.
          </p>

          <ul className="contact__info">
            <li>
              <span className="contact__info-label">Direct Email</span>
              <a href="mailto:gayathri.dev2317@gmail.com">
                <i className="bi bi-envelope-at" aria-hidden="true" /> gayathri.dev2317@gmail.com
              </a>
            </li>
            <li>
              <span className="contact__info-label">LinkedIn Profile</span>
              <a href="https://www.linkedin.com/in/haranigayathri008/" target="_blank" rel="noreferrer">
                <i className="bi bi-linkedin" aria-hidden="true" /> linkedin.com/in/haranigayathri008
              </a>
            </li>
            <li>
              <span className="contact__info-label">GitHub Repositories</span>
              <a href="https://github.com/1hatan" target="_blank" rel="noreferrer">
                <i className="bi bi-github" aria-hidden="true" /> github.com/1hatan
              </a>
            </li>
            <li>
              <span className="contact__info-label">Resume PDF</span>
              <a href="/Harani Gayathri Resume.pdf" download="Harani Gayathri Resume.pdf">
                <i className="bi bi-file-earmark-arrow-down" aria-hidden="true" /> Download Harani Gayathri Resume.pdf
              </a>
            </li>
            <li>
              <span className="contact__info-label">Location</span>
              <span>
                <i className="bi bi-geo-alt" aria-hidden="true" /> Tamil Nadu, India (Open to Remote & Relocation)
              </span>
            </li>
          </ul>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
          <h3 className="contact-form__title">Send a Direct Message</h3>

          <div className="form-field">
            <label htmlFor="name">Your Name / Organization</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. HR Recruiter / Hiring Manager"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span className="form-error" id="name-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">Your Work Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="recruiter@company.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span className="form-error" id="email-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message / Opportunity Details</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Hi Harani, we have an opening for a Frontend Developer role..."
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span className="form-error" id="message-error">
                {errors.message}
              </span>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <span className="spinner" /> Sending...
              </>
            ) : (
              <>
                <i className="bi bi-send" aria-hidden="true" /> Send Message
              </>
            )}
          </button>

          {status === "success" && (
            <p className="form-status form-status--success" role="status">
              ✨ Thank you! Your message has been submitted. I will respond to your email promptly.
            </p>
          )}
          {status === "error" && (
            <p className="form-status form-status--error" role="alert">
              ⚠️ Message delivery failed. Please email me directly at gayathri.dev2317@gmail.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
