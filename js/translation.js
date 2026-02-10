const translations = {
  en: {
    // Navigation
    navAbout: "About",
    navProjects: "Projects",
    navExperience: "Experience",
    navSkills: "Skills",

    // Hero
    introText: "Hello, I am",
    name: "Philipp!",
    introText2: "I study",
    headline: "Optimization-Based Data Science<br>for Operational Decision Making",
    bio: "by applying mathematical optimization and data-driven models to operations, supply chains, and ERP-supported business processes.",
    downloadCV: "Download my CV",
    downloadCVHref: "assets/PhilippStockerlCV.pdf",

    // Projects
    proj1Title: "Bachelor Thesis",
    proj1Subtitle: "'Robust and Adaptive Path Planning for Autonomous Vehicles in Spatio-Temporal Cost Fields'",
    proj1Desc: "Implementation of different algorithms for solving the shortest-path problem under cost uncertainty. Bridging operations research and robotics to establish algorithmic differences and logic of terrain traversal.",
    
    proj2Title: "Web Design",
    proj2Subtitle: "Projects: WebPortfolio, Decision-Support-Interface Prototype, Group Project Recipe Platform",
    proj2Desc: "Experience in designing web-interfaces.",
    
    proj3Title: "Operations Research & Decision Models",
    proj3Subtitle: "Management Science & Data Science, University of Passau",
    proj3Desc: "Solved real-world optimization cases: blending, knapsack, cutting stock, bin packing, and travelling salesman problems. Used Python (Gurobi), IBM CPLEX, and R for model development.",
    
    proj4Title: "SAP Fiori & ERP Process Integration",
    proj4Subtitle: "Internships at 4process AG & msg systems AG",
    proj4Desc: "Developed SAP Fiori apps and customized S/4HANA business processes. Focused on integrating analytics and workflow optimization within ERP environments.",
    
    proj5Title: "Robust and Adaptive Path Planning for Autonomous Vehicles in Spatio-Temporal Cost Fields",
    proj5Subtitle: "Bachelor Thesis, Chair of Business Decisions and Data Sience, University of Passau",
    proj5Desc: "Designed and implemented an experimental framework in Python to evaluate different algorithms for the shortest-path problem under cost uncertainty.",

    proj6Title: "Web Design",
    proj6Subtitle: "Web and Data Engineering, University of Passau",
    proj6Desc: "Designed and implemented front- and back-end elements for a conceptual food recipe platform with SQL databank.",
    projView3D: "View 3D",

    // Experience
    exp1Title: "ERP & SAP Intern — Business Process Integration & Development",
    exp1Subtitle: "4process AG, msg systems AG",
    exp1Desc: "Customized SAP S/4HANA processes, developed SAP Fiori applications, and supported ERP analytics and workflow optimization.",
    exp2Title: "Procurement Logistics — Negotiation & Process Optimization",
    exp2Subtitle: "ZF Friedrichshafen",
    exp2Desc: "Applied Harvard negotiation strategies and supported process optimization in procurement and supply chain projects.",
    exp3Title: "Production & Logistics Assistant",
    exp3Subtitle: "Ensinger Plastics GmbH, Kunststoffwerke Katzbach Grupor, Deutsche Post DHL",
    exp3Desc: "Supported production and logistics operations. Developed data-driven solutions for process improvement and business decision support.",

    // Skills
    skill1Title: "Optimization Modeling",
    skill1Subtitle: "Linear & Integer Programming",
    skill1Desc: "Building models for facility location, flows, and scheduling.",
    skill2Title: "Programming",
    skill2Subtitle: "Python, Java, R",
    skill2Desc: "Implementing algorithms and automation scripts.",
    skill3Title: "Data Science",
    skill3Subtitle: "Analysis & Visualization",
    skill3Desc: "Using data to support decision-making and predictive models.",
    skill4Title: "Web Development",
    skill4Subtitle: "Front-end & Back-end",
    skill4Desc: "Developing responsive and interactive web applications.",
    skill5Title: "ERP & Business Processes",
    skill5Subtitle: "SAP & Process Management",
    skill5Desc: "Optimizing enterprise workflows and customizing ERP solutions.",
    skill6Title: "Soft Skills",
    skill6Subtitle: "Communication & Teamwork",
    skill6Desc: "Effective collaboration in international and interdisciplinary teams.",

    // Footer
    footer: "© 2026 Philipp Stockerl"
  },
  de: {
    // Navigation
    navAbout: "Über mich",
    navProjects: "Projekte",
    navExperience: "Erfahrung",
    navSkills: "Fähigkeiten",

    // Hero
    introText: "Hi, ich bin",
    name: "Philipp Stockerl.",
    introText2: "Student mit Fokus auf",
    headline: "Optimierungs­gestützter Data Science<br>für operative Entscheidungen",
    bio: "Anwendung mathematischer Optimierung und datengetriebener Modelle für Operations, Supply Chains und ERP-gestützte Geschäftsprozesse.",
    downloadCV: "Lebenslauf herunterladen",
    downloadCVHref: "assets/PhilippStockerlCV_DE.pdf",

    // Projects
    proj1Title: "Minimum-Cost-Flow Optimierung",
    proj1Subtitle: "Lehrstuhl für Supply Chain & Operations Management, Universität Passau",
    proj1Desc: "Entwicklung und Implementierung eines Minimum-Cost-Network-Flow-Modells zur Optimierung von Logistik- und Lieferkettenkosten. Vergleich von Lösungsansätzen und wissenschaftliche Dokumentation.",
    proj2Title: "Facility Location unter Unsicherheit",
    proj2Subtitle: "Bachelorseminar, Lehrstuhl für Supply Chain & Operations Management, Universität Passau",
    proj2Desc: "Entwurf und Lösung von Standortplanungsproblemen unter unsicherer Nachfrage. Einsatz von ganzzahliger Programmierung und Szenarioanalyse für strategische Entscheidungen.",
    proj3Title: "Operations Research & Entscheidungsmodelle",
    proj3Subtitle: "Management Science & Data Science, Universität Passau",
    proj3Desc: "Bearbeitung praxisnaher Optimierungsfälle: Blending, Knapsack, Cutting Stock, Bin Packing und Traveling Salesman. Modellierung mit Python (Gurobi), IBM CPLEX und R.",
    proj4Title: "SAP Fiori & ERP-Prozessintegration",
    proj4Subtitle: "Praktika bei 4process AG & msg systems AG",
    proj4Desc: "Entwicklung von SAP Fiori Apps und Anpassung von S/4HANA Geschäftsprozessen. Integration von Analytics und Workflow-Optimierung im ERP-Umfeld.",
    proj5Title: "Geschäftsprozessoptimierung (BPMN)",
    proj5Subtitle: "Operational Information Systems, Universität Passau",
    proj5Desc: "Analyse und Neugestaltung von Geschäftsprozessen mit BPMN zur Verbesserung von Durchlaufzeiten und Effizienz. Einsatz von Process Mining und digitalen Transformationstechniken.",
    projView3D: "3D Ansicht",

    // Experience
    exp1Title: "ERP & SAP Praktikant — Prozessintegration & Entwicklung",
    exp1Subtitle: "4process AG, msg systems AG",
    exp1Desc: "Anpassung von SAP S/4HANA Prozessen, Entwicklung von SAP Fiori-Anwendungen und Unterstützung der ERP-Analyse und Workflow-Optimierung.",
    exp2Title: "Beschaffungslogistik — Verhandlung & Prozessoptimierung",
    exp2Subtitle: "ZF Friedrichshafen",
    exp2Desc: "Anwendung von Harvard-Verhandlungsstrategien und Unterstützung von Prozessoptimierungen in Einkauf und Supply Chain.",
    exp3Title: "Produktions- & Logistikassistent",
    exp3Subtitle: "Ensinger Plastics GmbH, Kunststoffwerke Katzbach Grupor, Deutsche Post DHL",
    exp3Desc: "Unterstützung in Produktion und Logistik. Entwicklung datenbasierter Lösungen zur Prozessverbesserung und Entscheidungsunterstützung.",

    // Skills
    skill1Title: "Optimierungsmodellierung",
    skill1Subtitle: "Lineare & ganzzahlige Programmierung",
    skill1Desc: "Erstellung von Modellen für Standortzuweisung, Flüsse und Planung.",
    skill2Title: "Programmierung",
    skill2Subtitle: "Python, Java, R",
    skill2Desc: "Implementierung von Algorithmen und Automatisierungsskripten.",
    skill3Title: "Data Science",
    skill3Subtitle: "Analyse & Visualisierung",
    skill3Desc: "Nutzung von Daten zur Entscheidungsunterstützung und prädiktiven Modellierung.",
    skill4Title: "Webentwicklung",
    skill4Subtitle: "Front-end & Back-end",
    skill4Desc: "Entwicklung responsiver und interaktiver Webanwendungen.",
    skill5Title: "ERP & Geschäftsprozesse",
    skill5Subtitle: "SAP & Prozessmanagement",
    skill5Desc: "Optimierung von Unternehmensabläufen und Anpassung von ERP-Lösungen.",
    skill6Title: "Soft Skills",
    skill6Subtitle: "Kommunikation & Teamarbeit",
    skill6Desc: "Effektive Zusammenarbeit in internationalen und interdisziplinären Teams.",

    // Footer
    footer: "© 2026 Philipp Stockerl"
  }
};

function switchLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
    const hrefKey = el.getAttribute("data-i18n-href");
    if (hrefKey && translations[lang][hrefKey]) {
      el.setAttribute("href", translations[lang][hrefKey]);
    }
  });
  localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
switchLanguage(savedLang);
