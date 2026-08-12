import { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Apply theme to <html data-theme="..."> and persist the choice
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // Loading animation: hide once the app has mounted
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer scroll-reveal animations for all .reveal elements
  useEffect(() => {
    if (loading) return;

    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.12,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <>
      <CustomCursor />
      <Loader visible={loading} />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
