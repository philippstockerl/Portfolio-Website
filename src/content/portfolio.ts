import type { SectionId } from '../app/navigation'
import { publicAsset } from '../lib/publicAsset'

export type Locale = 'de' | 'en'

export type { SectionId } from '../app/navigation'

export const projectIds = [
  'robust-path-planning',
  'facility-location',
  'operations-research',
  'sap-fiori',
  'business-processes',
  'web-engineering',
] as const

export type ProjectId = (typeof projectIds)[number]

export interface NavigationItem {
  id: SectionId
  label: string
}

export interface ProjectVisualizationContent {
  description: string
  items: string[]
  title: string
}

export interface ProjectContent {
  description: string
  id: ProjectId
  subtitle: string
  tags: string[]
  title: string
  visualization?: ProjectVisualizationContent
}

export interface ExperienceContent {
  description: string
  id: string
  organization: string
  tags: string[]
  title: string
}

export interface SkillContent {
  description: string
  id: string
  subtitle: string
  title: string
}

export interface SectionIntro {
  description: string
  eyebrow: string
  title: string
}

export interface PortfolioContent {
  controls: {
    closeMenu: string
    home: string
    language: string
    mobileNavigation: string
    openMenu: string
    primaryNavigation: string
    hideVisualization: string
    retryVisualization: string
    skipToContent: string
    showVisualization: string
    socialLinks: string
    theme: string
    visualizationError: string
    visualizationLoading: string
    visualizationReducedMotion: string
    visualizationReady: string
  }
  experience: ExperienceContent[]
  experienceIntro: SectionIntro
  footer: {
    closing: string
    copyright: string
    email: string
  }
  hero: {
    bio: string
    cvHref: string
    cvLabel: string
    eyebrow: string
    focus: string
    headline: string
    name: string
    projectsLabel: string
  }
  navigation: NavigationItem[]
  projects: ProjectContent[]
  projectsIntro: SectionIntro
  skills: SkillContent[]
  skillsIntro: SectionIntro
}

export const socialLinks = [
  {
    href: 'https://github.com/philippstockerl',
    icon: publicAsset('assets/github.svg'),
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/philippstockerl',
    icon: publicAsset('assets/linkedin.svg'),
    label: 'LinkedIn',
  },
] as const

export const emailAddress = 'philipp.stockerl@hotmail.de'

export const portfolioContent: Record<Locale, PortfolioContent> = {
  en: {
    navigation: [
      { id: 'hero', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
    ],
    controls: {
      home: 'Home',
      language: 'Switch language to German',
      theme: 'Toggle color theme',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      primaryNavigation: 'Primary navigation',
      mobileNavigation: 'Mobile navigation',
      skipToContent: 'Skip to content',
      socialLinks: 'Social links',
      showVisualization: 'Show visualization',
      hideVisualization: 'Hide visualization',
      retryVisualization: 'Retry visualization',
      visualizationLoading: 'Loading visualization…',
      visualizationReady: 'Visualization active in the background.',
      visualizationError: 'The visualization could not be loaded.',
      visualizationReducedMotion:
        'Animation is paused because reduced motion is enabled.',
    },
    hero: {
      eyebrow: 'Hello, I am',
      name: 'Philipp Stockerl.',
      focus: 'I study',
      headline:
        'Optimization-Based Data Science for Operational Decision Making',
      bio: 'I apply mathematical optimization and data-driven models to operations, supply chains, and ERP-supported business processes.',
      cvLabel: 'Download my CV',
      cvHref: publicAsset('assets/PhilippStockerlCV.pdf'),
      projectsLabel: 'View projects',
    },
    projectsIntro: {
      eyebrow: 'Selected work',
      title: 'From mathematical models to usable systems.',
      description:
        'Projects across optimization, data science, enterprise systems, and interface development.',
    },
    projects: [
      {
        id: 'robust-path-planning',
        title: 'Robust and Adaptive Path Planning',
        subtitle: 'Bachelor thesis · University of Passau',
        description:
          'Designed an experimental Python framework to evaluate shortest-path algorithms under uncertain spatio-temporal cost fields, connecting operations research with autonomous navigation.',
        tags: ['Robust optimization', 'Python', 'Simulation'],
        visualization: {
          title: 'Robust paths under uncertainty',
          description:
            'A mathematical formulation is paired with an animated random cost field from the thesis experiments.',
          items: [
            'Budgeted robust shortest-path formulation',
            'Spatio-temporal cost field',
          ],
        },
      },
      {
        id: 'facility-location',
        title: 'Facility Location Under Uncertainty',
        subtitle: 'Bachelor seminar · University of Passau',
        description:
          'Modeled strategic facility-location decisions under uncertain demand using mixed-integer optimization and scenario analysis.',
        tags: ['Facility location', 'Gurobi', 'Python'],
      },
      {
        id: 'operations-research',
        title: 'Operations Research & Decision Models',
        subtitle: 'Management Science & Data Science',
        description:
          'Solved blending, knapsack, cutting-stock, bin-packing, and traveling-salesman problems with mathematical programming tools.',
        tags: ['Mixed-integer programming', 'IBM CPLEX', 'Gurobi'],
        visualization: {
          title: 'Network-flow structure',
          description:
            'A three-dimensional network model highlights the nodes and arcs behind flow-based optimization problems.',
          items: ['Network nodes', 'Connecting arcs'],
        },
      },
      {
        id: 'sap-fiori',
        title: 'SAP Fiori & ERP Process Integration',
        subtitle: '4process AG · msg systems AG',
        description:
          'Developed SAP Fiori applications and adapted S/4HANA processes with a focus on analytics, workflow quality, and operational integration.',
        tags: ['SAP Fiori', 'S/4HANA', 'ABAP'],
      },
      {
        id: 'business-processes',
        title: 'Business Process Optimization',
        subtitle: 'Operational Information Systems',
        description:
          'Analyzed and redesigned operational processes with BPMN, process-mining concepts, and structured improvement methods.',
        tags: ['BPMN', 'Process mining', 'UML'],
        visualization: {
          title: 'Connected process flow',
          description:
            'An animated process sequence shows how connected operational steps can be analyzed as one system.',
          items: ['Process sequence', 'Operational connections'],
        },
      },
      {
        id: 'web-engineering',
        title: 'Web & Interface Engineering',
        subtitle: 'Portfolio, decision support, and group platforms',
        description:
          'Designed responsive interfaces and implemented front- and back-end elements for data-driven prototypes and a collaborative recipe platform.',
        tags: ['JavaScript', 'SQL', 'Java'],
      },
    ],
    experienceIntro: {
      eyebrow: 'Experience',
      title: 'Operational context behind the models.',
      description:
        'Work across enterprise software, procurement, production, and logistics informs how I approach decision-support systems.',
    },
    experience: [
      {
        id: 'erp-sap',
        title: 'ERP & SAP Intern — Process Integration & Development',
        organization: '4process AG · msg systems AG',
        description:
          'Customized SAP S/4HANA processes, developed SAP Fiori applications, and supported ERP analytics and workflow optimization.',
        tags: ['ERP', 'SAP S/4HANA', 'Development'],
      },
      {
        id: 'procurement',
        title: 'Procurement Logistics — Negotiation & Process Optimization',
        organization: 'ZF Friedrichshafen',
        description:
          'Applied Harvard negotiation strategies and supported process optimization in procurement and supply-chain projects.',
        tags: ['Procurement', 'Negotiation', 'Process optimization'],
      },
      {
        id: 'production-logistics',
        title: 'Production & Logistics Assistant',
        organization:
          'Ensinger Plastics · Kunststoffwerke Katzbach Grupor · Deutsche Post DHL',
        description:
          'Supported production and logistics operations while developing a practical understanding of process constraints and business decisions.',
        tags: ['Production', 'Logistics', 'Operations'],
      },
    ],
    skillsIntro: {
      eyebrow: 'Capabilities',
      title: 'A toolkit for operational decisions.',
      description:
        'Technical depth in optimization and software, grounded in business processes and interdisciplinary collaboration.',
    },
    skills: [
      {
        id: 'optimization',
        title: 'Optimization Modeling',
        subtitle: 'Linear & integer programming',
        description:
          'Models for facility location, network flows, allocation, and scheduling.',
      },
      {
        id: 'programming',
        title: 'Programming',
        subtitle: 'Python, Java, R',
        description:
          'Algorithms, experiments, automation, and maintainable application logic.',
      },
      {
        id: 'data-science',
        title: 'Data Science',
        subtitle: 'Analysis & visualization',
        description:
          'Data preparation and modeling for decision support and evaluation.',
      },
      {
        id: 'web-development',
        title: 'Web Development',
        subtitle: 'Front end & back end',
        description: 'Responsive interfaces and interactive web applications.',
      },
      {
        id: 'erp',
        title: 'ERP & Business Processes',
        subtitle: 'SAP & process management',
        description:
          'Enterprise workflows, integration, and operational process improvement.',
      },
      {
        id: 'collaboration',
        title: 'Collaboration',
        subtitle: 'Communication & teamwork',
        description:
          'Clear communication across international and interdisciplinary teams.',
      },
    ],
    footer: {
      closing: 'Built around optimization, data, and operational reality.',
      copyright: '© 2026 Philipp Stockerl',
      email: 'Email',
    },
  },
  de: {
    navigation: [
      { id: 'hero', label: 'Über mich' },
      { id: 'projects', label: 'Projekte' },
      { id: 'experience', label: 'Erfahrung' },
      { id: 'skills', label: 'Fähigkeiten' },
    ],
    controls: {
      home: 'Startseite',
      language: 'Sprache auf Englisch wechseln',
      theme: 'Farbschema wechseln',
      openMenu: 'Navigation öffnen',
      closeMenu: 'Navigation schließen',
      primaryNavigation: 'Hauptnavigation',
      mobileNavigation: 'Mobile Navigation',
      skipToContent: 'Zum Inhalt springen',
      socialLinks: 'Soziale Profile',
      showVisualization: 'Visualisierung anzeigen',
      hideVisualization: 'Visualisierung ausblenden',
      retryVisualization: 'Visualisierung erneut laden',
      visualizationLoading: 'Visualisierung wird geladen…',
      visualizationReady: 'Visualisierung ist im Hintergrund aktiv.',
      visualizationError: 'Die Visualisierung konnte nicht geladen werden.',
      visualizationReducedMotion:
        'Die Animation ist aufgrund der Einstellung für reduzierte Bewegung pausiert.',
    },
    hero: {
      eyebrow: 'Hi, ich bin',
      name: 'Philipp Stockerl.',
      focus: 'Student mit Fokus auf',
      headline:
        'Optimierungsgestützte Data Science für operative Entscheidungen',
      bio: 'Ich verbinde mathematische Optimierung und datengetriebene Modelle mit Operations, Supply Chains und ERP-gestützten Geschäftsprozessen.',
      cvLabel: 'Lebenslauf herunterladen',
      cvHref: publicAsset('assets/PhilippStockerlCV_DE.pdf'),
      projectsLabel: 'Projekte ansehen',
    },
    projectsIntro: {
      eyebrow: 'Ausgewählte Arbeiten',
      title: 'Von mathematischen Modellen zu nutzbaren Systemen.',
      description:
        'Projekte aus Optimierung, Data Science, Enterprise Systems und Interface-Entwicklung.',
    },
    projects: [
      {
        id: 'robust-path-planning',
        title: 'Robuste und adaptive Pfadplanung',
        subtitle: 'Bachelorarbeit · Universität Passau',
        description:
          'Entwicklung eines experimentellen Python-Frameworks zur Evaluation von Kürzeste-Wege-Algorithmen unter unsicheren raumzeitlichen Kostenfeldern.',
        tags: ['Robuste Optimierung', 'Python', 'Simulation'],
        visualization: {
          title: 'Robuste Pfade unter Unsicherheit',
          description:
            'Eine mathematische Formulierung wird mit einem animierten zufälligen Kostenfeld aus den Experimenten der Bachelorarbeit kombiniert.',
          items: [
            'Budgetrobuste Kürzeste-Wege-Formulierung',
            'Raumzeitliches Kostenfeld',
          ],
        },
      },
      {
        id: 'facility-location',
        title: 'Facility Location unter Unsicherheit',
        subtitle: 'Bachelorseminar · Universität Passau',
        description:
          'Modellierung strategischer Standortentscheidungen bei unsicherer Nachfrage mit gemischt-ganzzahliger Optimierung und Szenarioanalyse.',
        tags: ['Facility Location', 'Gurobi', 'Python'],
      },
      {
        id: 'operations-research',
        title: 'Operations Research & Entscheidungsmodelle',
        subtitle: 'Management Science & Data Science',
        description:
          'Lösung von Blending-, Knapsack-, Cutting-Stock-, Bin-Packing- und Traveling-Salesman-Problemen mit mathematischer Optimierungssoftware.',
        tags: ['Ganzzahlige Optimierung', 'IBM CPLEX', 'Gurobi'],
        visualization: {
          title: 'Netzwerkfluss-Struktur',
          description:
            'Ein dreidimensionales Netzwerkmodell zeigt die Knoten und Kanten hinter flussbasierten Optimierungsproblemen.',
          items: ['Netzwerkknoten', 'Verbindende Kanten'],
        },
      },
      {
        id: 'sap-fiori',
        title: 'SAP Fiori & ERP-Prozessintegration',
        subtitle: '4process AG · msg systems AG',
        description:
          'Entwicklung von SAP-Fiori-Anwendungen und Anpassung von S/4HANA-Prozessen mit Fokus auf Analytics, Workflow-Qualität und operative Integration.',
        tags: ['SAP Fiori', 'S/4HANA', 'ABAP'],
      },
      {
        id: 'business-processes',
        title: 'Geschäftsprozessoptimierung',
        subtitle: 'Operational Information Systems',
        description:
          'Analyse und Neugestaltung operativer Prozesse mit BPMN, Process-Mining-Konzepten und strukturierten Verbesserungsmethoden.',
        tags: ['BPMN', 'Process Mining', 'UML'],
        visualization: {
          title: 'Verbundener Prozessablauf',
          description:
            'Eine animierte Prozessfolge zeigt, wie verbundene operative Schritte als Gesamtsystem analysiert werden können.',
          items: ['Prozessfolge', 'Operative Verbindungen'],
        },
      },
      {
        id: 'web-engineering',
        title: 'Web- & Interface-Entwicklung',
        subtitle: 'Portfolio, Decision Support und Gruppenplattformen',
        description:
          'Gestaltung responsiver Interfaces und Umsetzung von Front- und Backend-Elementen für datengetriebene Prototypen und eine kollaborative Rezeptplattform.',
        tags: ['JavaScript', 'SQL', 'Java'],
      },
    ],
    experienceIntro: {
      eyebrow: 'Erfahrung',
      title: 'Operativer Kontext hinter den Modellen.',
      description:
        'Erfahrung in Enterprise Software, Beschaffung, Produktion und Logistik prägt meinen Blick auf Entscheidungsunterstützung.',
    },
    experience: [
      {
        id: 'erp-sap',
        title: 'ERP & SAP Praktikant — Prozessintegration & Entwicklung',
        organization: '4process AG · msg systems AG',
        description:
          'Anpassung von SAP-S/4HANA-Prozessen, Entwicklung von SAP-Fiori-Anwendungen und Unterstützung von ERP-Analysen und Workflow-Optimierung.',
        tags: ['ERP', 'SAP S/4HANA', 'Entwicklung'],
      },
      {
        id: 'procurement',
        title: 'Beschaffungslogistik — Verhandlung & Prozessoptimierung',
        organization: 'ZF Friedrichshafen',
        description:
          'Anwendung von Harvard-Verhandlungsstrategien und Unterstützung von Prozessoptimierungen in Einkauf und Supply Chain.',
        tags: ['Beschaffung', 'Verhandlung', 'Prozessoptimierung'],
      },
      {
        id: 'production-logistics',
        title: 'Produktions- & Logistikassistent',
        organization:
          'Ensinger Plastics · Kunststoffwerke Katzbach Grupor · Deutsche Post DHL',
        description:
          'Unterstützung in Produktion und Logistik mit einem praxisnahen Verständnis für Prozessrestriktionen und betriebliche Entscheidungen.',
        tags: ['Produktion', 'Logistik', 'Operations'],
      },
    ],
    skillsIntro: {
      eyebrow: 'Fähigkeiten',
      title: 'Ein Werkzeugkasten für operative Entscheidungen.',
      description:
        'Technische Tiefe in Optimierung und Software, verbunden mit Geschäftsprozessen und interdisziplinärer Zusammenarbeit.',
    },
    skills: [
      {
        id: 'optimization',
        title: 'Optimierungsmodellierung',
        subtitle: 'Lineare & ganzzahlige Optimierung',
        description:
          'Modelle für Standortplanung, Netzwerkflüsse, Allokation und Scheduling.',
      },
      {
        id: 'programming',
        title: 'Programmierung',
        subtitle: 'Python, Java, R',
        description:
          'Algorithmen, Experimente, Automatisierung und wartbare Anwendungslogik.',
      },
      {
        id: 'data-science',
        title: 'Data Science',
        subtitle: 'Analyse & Visualisierung',
        description:
          'Datenaufbereitung und Modellierung für Entscheidungsunterstützung und Evaluation.',
      },
      {
        id: 'web-development',
        title: 'Webentwicklung',
        subtitle: 'Frontend & Backend',
        description: 'Responsive Interfaces und interaktive Webanwendungen.',
      },
      {
        id: 'erp',
        title: 'ERP & Geschäftsprozesse',
        subtitle: 'SAP & Prozessmanagement',
        description:
          'Enterprise Workflows, Integration und operative Prozessverbesserung.',
      },
      {
        id: 'collaboration',
        title: 'Zusammenarbeit',
        subtitle: 'Kommunikation & Teamwork',
        description:
          'Klare Kommunikation in internationalen und interdisziplinären Teams.',
      },
    ],
    footer: {
      closing: 'Entwickelt rund um Optimierung, Daten und operative Realität.',
      copyright: '© 2026 Philipp Stockerl',
      email: 'E-Mail',
    },
  },
}
