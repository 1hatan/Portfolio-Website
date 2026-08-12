import { useEffect, useState, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices / small mobile screens
    if (window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      // Smooth lerp for ring movement
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleHoverEvents = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, .btn, .project-card, .skill-card, .hero__avatar-container, [role='button']"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    handleHoverEvents();

    const observer = new MutationObserver(handleHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className={`cursor-container ${isVisible ? "cursor--visible" : ""}`}>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovered ? "cursor-dot--hover" : ""} ${
          isClicking ? "cursor-dot--click" : ""
        }`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? "cursor-ring--hover" : ""} ${
          isClicking ? "cursor-ring--click" : ""
        }`}
      />
    </div>
  );
}
