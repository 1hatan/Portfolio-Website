const projects = [
  {
    id: "marathon-app",
    title: "Infinity Run — Marathon Platform",
    featured: true,
    badge: "Featured MERN Project",
    summary:
      "A full-stack event management and participant registration web application built for marathon organizers and runners with real-time admin monitoring.",
    problem:
      "Marathon organizers faced manual paper registrations, lack of entry validation, and difficulty tracking attendee metrics and t-shirt inventory in real time.",
    contribution:
      "Engineered the responsive React frontend interface, built RESTful Express.js API endpoints, and designed MongoDB schemas with Mongoose for automated participant data handling.",
    features: [
      "Participant registration form with client & server-side validation",
      "Real-time Admin Dashboard with registration statistics & charts",
      "Participant management system with t-shirt size tracking",
      "Contact query messaging & backend API integration",
      "Fully responsive mobile-friendly event interface",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "CSS3"],
    demoUrl: "https://portfolio-website-one-olive-10.vercel.app/",
    githubUrl: "https://github.com/1hatan/Portfolio-website.git",
    imageUrl: "https://s.wordpress.com/mshots/v1/https://portfolio-website-one-olive-10.vercel.app/?w=720",
    caseStudy: {
      challenge:
        "Streamlining marathon attendee registrations while eliminating data errors and providing event admins with immediate headcount and t-shirt sizing stats.",
      approach:
        "Built a decoupled MERN stack architecture. React powers the interactive registration UI with instant validation, while Express.js endpoints process submissions and query MongoDB via Mongoose.",
      keyFeatures: [
        "Participant Registration & Data Validation",
        "Admin Dashboard for Live Attendee Oversight",
        "Registration Statistics & T-Shirt Size Aggregation",
        "Contact Messaging & Inquiry Management",
        "Mobile-First Responsive UI Layout",
      ],
      techArchitecture: {
        frontend: "React 18, Custom CSS Tokens, Modular Components",
        backend: "Node.js, Express.js REST Controllers",
        database: "MongoDB Atlas, Mongoose Data Schemas",
      },
      databaseApi:
        "REST API Controllers (`POST /api/register`, `GET /api/admin/stats`, `GET /api/admin/participants`) handling data sanitization and schema queries.",
      result:
        "Automated 100% of participant registrations, reduced administrative oversight effort, and delivered sub-second response times for live admin dashboards.",
      whatILearned:
        "Deepened full-stack MERN integration knowledge, RESTful controller architecture, client-server validation patterns, and Mongoose schema modeling.",
    },
  },
  {
    id: "todo-app",
    title: "TaskFlow — To-Do Application",
    featured: false,
    summary:
      "A fast, modern task manager with state persistence, status filtering, and edit flows for daily productivity.",
    problem:
      "Users needed a lightweight, clutter-free task management interface with local state retention to track daily coding tasks.",
    contribution:
      "Built the full React application using modular component architecture, custom hooks, and persistent localStorage state management.",
    features: [
      "Task creation, inline editing, completion toggles, and deletion",
      "Status filtering (All, Active, Completed)",
      "Local storage state persistence across browser sessions",
      "Keyboard-accessible clean UI layout",
    ],
    tech: ["React", "JavaScript (ES6+)", "CSS3", "Vite"],
    demoUrl: "https://premium-to-do.vercel.app/",
    githubUrl: "https://github.com/1hatan/To-do-Website.git",
    imageUrl: "https://s.wordpress.com/mshots/v1/https://premium-to-do.vercel.app/?w=720",
  },
  {
    id: "expense-tracker",
    title: "SpendSmart — Expense Tracker",
    featured: false,
    summary:
      "A personal finance tracking application for logging income/expenses, calculating net balance, and visualizing budget categories.",
    problem:
      "Simple budget tracking often suffers from clunky interfaces that make logging quick daily expenses frustrating.",
    contribution:
      "Designed and implemented the React UI layout, state calculations for dynamic totals, and visual budget category badges.",
    features: [
      "Dynamic balance and total expense calculation",
      "Income vs. Expense category tagging",
      "Transaction history list with instant item removal",
      "Responsive financial dashboard grid",
    ],
    tech: ["React", "JavaScript", "HTML5", "CSS3"],
    demoUrl: "https://expense-tracker-swart-phi-37.vercel.app/",
    githubUrl: "https://github.com/1hatan/Expense-tracker.git",
    imageUrl: "https://s.wordpress.com/mshots/v1/https://expense-tracker-swart-phi-37.vercel.app/?w=720",
  },
  {
    id: "calculator-app",
    title: "QuickCalc — Web Calculator",
    featured: false,
    summary:
      "A responsive web calculator supporting standard arithmetic, decimal operations, keyboard listeners, and instant calculation feedback.",
    problem:
      "Many basic web calculators break on small mobile displays or lack keyboard shortcut accessibility.",
    contribution:
      "Developed the math parsing logic using pure JavaScript and created a responsive grid layout using CSS Flexbox/Grid.",
    features: [
      "Standard arithmetic (+, -, *, /) and decimal operations",
      "Full physical keyboard keypress support",
      "Clear & delete entry management",
      "Adaptable display layout from mobile to desktop",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    demoUrl: "https://premium-calculator-one.vercel.app/",
    githubUrl: "https://github.com/1hatan/Calculator-Website.git",
    imageUrl: "https://s.wordpress.com/mshots/v1/https://premium-calculator-one.vercel.app/?w=720",
  },
];

export default projects;
