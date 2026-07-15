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

export const pipelineStageIds = [
  'process',
  'integration',
  'engineering',
  'platform',
  'analytics',
  'delivery',
] as const

export type PipelineStageId = (typeof pipelineStageIds)[number]

export type PipelineCapabilityStatus = 'applied' | 'prototyped' | 'developing'

export interface NavigationItem {
  id: SectionId
  label: string
}

export interface PipelineStageContent {
  capabilities: {
    label: string
    status: PipelineCapabilityStatus
  }[]
  description: string
  deliverables: string[]
  evidence: string
  evidenceItems: {
    description: string
    organization: string
    title: string
  }[]
  id: PipelineStageId
  relatedProjectIds: ProjectId[]
  shortLabel: string
  title: string
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
  period: string
  tags: string[]
  title: string
}

export interface EducationContent {
  degree: string
  focus: string
  id: string
  institution: string
  period: string
}

export interface LanguageContent {
  id: string
  level: string
  name: string
}

export interface SectionTeaser {
  cta: string
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
    backToHome: string
    closeMenu: string
    education: string
    home: string
    language: string
    languages: string
    mobileNavigation: string
    openMenu: string
    pipelineEvidence: string
    pipelineMethods: string
    pipelineNavigation: string
    pipelineRelatedWork: string
    pipelineStatus: Record<PipelineCapabilityStatus, string>
    pipelineDeliverables: string
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
  education: EducationContent[]
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
    meta: string[]
    name: string
    proofPoints: string[]
    projectsLabel: string
  }
  languages: LanguageContent[]
  navigation: NavigationItem[]
  pipelineIntro: SectionIntro
  pipelineStages: PipelineStageContent[]
  projects: ProjectContent[]
  projectsIntro: SectionIntro
  skills: SkillContent[]
  skillsIntro: SectionIntro
  teasers: {
    experience: SectionTeaser
    pipeline: SectionTeaser
    projects: SectionTeaser
    skills: SectionTeaser
  }
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
      { id: 'pipeline', label: 'Process' },
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
    ],
    controls: {
      backToHome: 'Back to overview',
      education: 'Education',
      home: 'Home',
      language: 'Switch language to German',
      languages: 'Languages',
      theme: 'Toggle color theme',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      primaryNavigation: 'Primary navigation',
      mobileNavigation: 'Mobile navigation',
      pipelineNavigation: 'End-to-end process navigation',
      pipelineEvidence: 'Experience evidence',
      pipelineDeliverables: 'What I deliver',
      pipelineMethods: 'Tools & methods',
      pipelineRelatedWork: 'Related projects',
      pipelineStatus: {
        applied: 'Applied',
        prototyped: 'Prototyped',
        developing: 'Developing',
      },
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
      eyebrow: 'Data & process engineering with an operations perspective',
      name: 'Philipp Stockerl.',
      focus: 'My focus',
      headline: 'Data Engineering for Industrial Operations',
      bio: 'I transform production and logistics processes into reliable data products—from OT data acquisition and ETL pipelines to SQL models, ERP/MES integration, BI applications, and operational optimization.',
      meta: [
        'B.Sc. Business Informatics · University of Passau',
        'Process & Production Excellence · Hatz Components',
        'Passau, Germany',
      ],
      proofPoints: [
        'IT/OT integration',
        'ETL & SQL data models',
        'ERP & MES',
        'BI & operational applications',
      ],
      cvLabel: 'Download my CV',
      cvHref: publicAsset('assets/PhilippStockerlCV.pdf'),
      projectsLabel: 'View my projects',
    },
    pipelineIntro: {
      eyebrow: 'End-to-end focus',
      title: 'From operational signals to better decisions.',
      description:
        'I connect process understanding, industrial data engineering, enterprise systems, and analytics as one continuous delivery chain.',
    },
    pipelineStages: [
      {
        id: 'process',
        shortLabel: 'Understand',
        title: 'Process & Use Case',
        description:
          'Understand production, quality, and logistics workflows before translating operational problems into technical requirements.',
        evidence: 'Siemens · Ensinger · DHL · Grupor',
        deliverables: [
          'Map the operational process, its constraints, and its data-generating steps.',
          'Translate bottlenecks into measurable use cases, requirements, and KPIs.',
          'Align business, production, logistics, and technical perspectives around one problem definition.',
        ],
        capabilities: [
          { label: 'Process analysis', status: 'applied' },
          { label: 'Lean / KVP', status: 'applied' },
          { label: 'Production & logistics', status: 'applied' },
          { label: 'BPMN', status: 'applied' },
        ],
        evidenceItems: [
          {
            organization: 'Siemens',
            title: 'Factory digitalization & continuous improvement',
            description:
              'Connected production-administration workflows with structured improvement and digitalization initiatives.',
          },
          {
            organization: 'Ensinger · DHL · Grupor',
            title: 'Operational grounding',
            description:
              'Built first-hand context for production, quality, and logistics constraints through operational roles.',
          },
        ],
        relatedProjectIds: ['business-processes'],
      },
      {
        id: 'integration',
        shortLabel: 'Connect',
        title: 'IT/OT Integration',
        description:
          'Connect machine, quality, MES, and ERP structures while preserving their operational business context.',
        evidence: 'Hatz · 4process · msg systems',
        deliverables: [
          'Map OT, quality, MES, and ERP sources into a shared integration architecture.',
          'Align interfaces and data hierarchies with ISA-95 and enterprise-system context.',
          'Preserve source, asset, order, and process context across system boundaries.',
        ],
        capabilities: [
          { label: 'ISA-95', status: 'applied' },
          { label: 'MES integration', status: 'applied' },
          { label: 'SAP S/4HANA', status: 'applied' },
          { label: 'MQTT / UNS', status: 'developing' },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Industrial source integration',
            description:
              'Structured machine and quality data around MES/ERP context and an ISA-95-oriented architecture.',
          },
          {
            organization: '4process · msg systems',
            title: 'Enterprise process integration',
            description:
              'Worked with SAP S/4HANA processes, data structures, and application interfaces.',
          },
        ],
        relatedProjectIds: ['sap-fiori', 'business-processes'],
      },
      {
        id: 'engineering',
        shortLabel: 'Engineer',
        title: 'Data Engineering',
        description:
          'Standardize heterogeneous sources and transform operational data through maintainable ETL pipelines.',
        evidence: 'Hatz Components',
        deliverables: [
          'Standardize heterogeneous source formats and interface outputs.',
          'Design extraction, transformation, and loading sequences for industrial data.',
          'Implement reusable transformation logic and explicit data-quality rules.',
        ],
        capabilities: [
          { label: 'Python', status: 'applied' },
          { label: 'ETL pipelines', status: 'applied' },
          { label: 'MS SQL', status: 'applied' },
          { label: 'Monitoring & recovery', status: 'developing' },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Central quality & machine-data pipeline',
            description:
              'Designed the ETL architecture and transformation scripts for standardized acquisition of operational data.',
          },
        ],
        relatedProjectIds: ['robust-path-planning', 'web-engineering'],
      },
      {
        id: 'platform',
        shortLabel: 'Structure',
        title: 'Data Platform & Models',
        description:
          'Build operations-oriented SQL models and data hierarchies that make integrated data usable and maintainable.',
        evidence: 'Hatz Components',
        deliverables: [
          'Design relational models around assets, processes, quality, and production context.',
          'Connect operational records to stable master-data and SAP-aligned hierarchies.',
          'Create reusable datasets for reporting, analytics, and downstream applications.',
        ],
        capabilities: [
          { label: 'Relational modeling', status: 'applied' },
          { label: 'MSSQL / SSMS', status: 'applied' },
          { label: 'SAP data hierarchy', status: 'applied' },
          { label: 'Fabric / Snowflake / Data Vault', status: 'developing' },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Operations-oriented SQL data model',
            description:
              'Modeled centralized quality and machine data in MSSQL and connected it to the enterprise data hierarchy.',
          },
        ],
        relatedProjectIds: ['sap-fiori', 'web-engineering'],
      },
      {
        id: 'analytics',
        shortLabel: 'Analyze',
        title: 'BI, Analytics & AI',
        description:
          'Turn governed data into KPIs, analytical prototypes, and decision models for operational users.',
        evidence: 'Hatz · ZF · University projects',
        deliverables: [
          'Define operational KPIs and the data logic behind them.',
          'Build BI, SPC, and exploratory analytics prototypes for process transparency.',
          'Evaluate predictive and optimization approaches against operational decisions.',
        ],
        capabilities: [
          { label: 'KPI & BI design', status: 'prototyped' },
          { label: 'SPC', status: 'prototyped' },
          { label: 'Python simulation', status: 'applied' },
          { label: 'Power BI', status: 'developing' },
          { label: 'ML / predictive maintenance', status: 'prototyped' },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Industrial analytics concepts',
            description:
              'Developed KPI, SPC, and predictive-maintenance prototypes on integrated production and quality data.',
          },
          {
            organization: 'University of Passau',
            title: 'Robust decision models',
            description:
              'Evaluated optimization algorithms under uncertainty through Python experiments and simulation.',
          },
        ],
        relatedProjectIds: [
          'robust-path-planning',
          'facility-location',
          'operations-research',
        ],
      },
      {
        id: 'delivery',
        shortLabel: 'Deliver',
        title: 'Operational Solutions',
        description:
          'Deliver software interfaces, prototypes, and optimization models that support better operational decisions.',
        evidence: 'msg systems · Portfolio · University projects',
        deliverables: [
          'Turn technical outputs into clear interfaces for operational and business users.',
          'Implement enterprise and web applications around data-driven workflows.',
          'Validate solutions through prototypes, feedback, and measurable decision support.',
        ],
        capabilities: [
          { label: 'SAP Fiori', status: 'applied' },
          { label: 'ABAP RAP', status: 'applied' },
          { label: 'React / TypeScript', status: 'applied' },
          { label: 'Optimization models', status: 'prototyped' },
        ],
        evidenceItems: [
          {
            organization: 'msg systems',
            title: 'ERP application delivery',
            description:
              'Developed SAP Fiori interfaces and backend behavior for data-driven S/4HANA workflows.',
          },
          {
            organization: 'Portfolio · University projects',
            title: 'Interactive decision prototypes',
            description:
              'Built responsive interfaces, experimental frameworks, and optimization models that make complex logic usable.',
          },
        ],
        relatedProjectIds: [
          'sap-fiori',
          'web-engineering',
          'robust-path-planning',
        ],
      },
    ],
    projectsIntro: {
      eyebrow: 'Personal projects',
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
        id: 'hatz',
        title: 'Production Optimization & Factory Digitalization',
        organization: 'Hatz Components · Ruhstorf a. d. Rott',
        period: 'Apr 2026 – today',
        description:
          'Process & Production Excellence internship: centralized machine- and quality-data acquisition, a pilot ETL/ELT system, lakehouse-oriented database design, MES/ERP integration along SAP data hierarchies, and BI/KPI concepts for the smart factory.',
        tags: ['ETL', 'ISA-95', 'MES & ERP', 'BI/KPI'],
      },
      {
        id: 'four-process',
        title: 'Business Process Modeling & ERP Integration',
        organization: '4process AG · Passau',
        period: 'Oct – Nov 2024',
        description:
          'Business process analysis and modeling for manufacturing and logistics; supported ERP integration and data migration in SAP S/4HANA environments.',
        tags: ['BPMN', 'SAP S/4HANA', 'Data migration'],
      },
      {
        id: 'zf',
        title: 'Negotiation Strategies in Procurement Logistics',
        organization: 'ZF Group · Passau',
        period: 'Jun – Aug 2024',
        description:
          'Analyzed procurement and supply-chain processes, built KPI overviews for strategic sourcing, and applied Harvard-concept negotiation strategies.',
        tags: ['Procurement', 'KPI analysis', 'Negotiation'],
      },
      {
        id: 'msg',
        title: 'Software Development SAP Fiori',
        organization: 'msg systems AG · Passau',
        period: 'Mar – Apr 2024',
        description:
          'Developed UI and backend components with SAP Fiori and ABAP RAP, integrating analytics into SAP S/4HANA environments.',
        tags: ['SAP Fiori', 'ABAP RAP', 'Analytics'],
      },
      {
        id: 'siemens',
        title: 'Continuous Improvement & Factory Digitalization',
        organization: 'Siemens AG · Cham',
        period: 'Feb – Jul 2018',
        description:
          'Contributed to process digitalization and the improvement of administrative production processes; supported project organization and stakeholder communication.',
        tags: ['KVP', 'Digitalization', 'Production'],
      },
      {
        id: 'operations',
        title: 'Operational Roles in Production, Quality & Logistics',
        organization: 'Ensinger · Deutsche Post DHL · Grupor',
        period: '2019 – 2025',
        description:
          'Hands-on work in plastics extrusion, quality assurance, logistics, and packaging — the operational grounding behind my data and process engineering focus.',
        tags: ['Production', 'Quality', 'Logistics'],
      },
    ],
    education: [
      {
        id: 'bsc-wi',
        degree: 'B.Sc. Business Informatics',
        focus: 'Business Decisions & Data Science',
        institution: 'University of Passau',
        period: 'Apr 2024 – today',
      },
      {
        id: 'bsc-wiwi',
        degree: 'B.Sc. Economics & Business Administration',
        focus: 'Supply Chain / Operations Management & Information Systems',
        institution: 'University of Passau',
        period: 'Oct 2021 – Apr 2026',
      },
      {
        id: 'abitur',
        degree: 'General University Entrance Qualification',
        focus: 'Economics & Administration',
        institution: 'Staatliche Fachoberschule Cham',
        period: 'Aug 2017 – Oct 2020',
      },
    ],
    languages: [
      { id: 'de', name: 'German', level: 'Native' },
      { id: 'en', name: 'English', level: 'C2' },
      { id: 'es', name: 'Spanish', level: 'B1' },
    ],
    teasers: {
      pipeline: { cta: 'Explore all six stages' },
      projects: { cta: 'View all projects' },
      experience: { cta: 'Full journey & education' },
      skills: { cta: 'All capabilities & languages' },
    },
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
        id: 'data-engineering',
        title: 'Data Engineering & BI',
        subtitle: 'ETL, Airflow & Qlik Sense',
        description:
          'Pipelines, data models, and BI dashboards that turn operational data into decisions.',
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
      { id: 'pipeline', label: 'Prozesskette' },
      { id: 'projects', label: 'Projekte' },
      { id: 'experience', label: 'Erfahrung' },
      { id: 'skills', label: 'Fähigkeiten' },
    ],
    controls: {
      backToHome: 'Zurück zur Übersicht',
      education: 'Bildung',
      home: 'Startseite',
      language: 'Sprache auf Englisch wechseln',
      languages: 'Sprachen',
      theme: 'Farbschema wechseln',
      openMenu: 'Navigation öffnen',
      closeMenu: 'Navigation schließen',
      primaryNavigation: 'Hauptnavigation',
      mobileNavigation: 'Mobile Navigation',
      pipelineNavigation: 'Navigation durch den End-to-End-Prozess',
      pipelineEvidence: 'Erfahrungsnachweis',
      pipelineDeliverables: 'Was ich umsetze',
      pipelineMethods: 'Tools & Methoden',
      pipelineRelatedWork: 'Passende Projekte',
      pipelineStatus: {
        applied: 'Angewendet',
        prototyped: 'Als Prototyp',
        developing: 'Im Aufbau',
      },
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
      eyebrow: 'Data & Process Engineering mit Operations-Perspektive',
      name: 'Philipp Stockerl.',
      focus: 'Mein Fokus',
      headline: 'Data Engineering für industrielle Prozesse',
      bio: 'Ich entwickle den Weg von Produktions- und Logistikdaten zu nutzbaren Datenprodukten – von OT-Quellen und ETL-Pipelines über SQL-Datenmodelle und ERP-/MES-Integration bis zu BI-Anwendungen und operativer Optimierung.',
      meta: [
        'B.Sc. Wirtschaftsinformatik · Universität Passau',
        'Process & Production Excellence · Hatz Components',
        'Passau, Deutschland',
      ],
      proofPoints: [
        'IT/OT-Integration',
        'ETL & SQL-Datenmodelle',
        'ERP & MES',
        'BI & operative Anwendungen',
      ],
      cvLabel: 'Lebenslauf herunterladen',
      cvHref: publicAsset('assets/PhilippStockerlCV_DE.pdf'),
      projectsLabel: 'Projekte ansehen',
    },
    pipelineIntro: {
      eyebrow: 'End-to-End-Fokus',
      title: 'Von operativen Signalen zu besseren Entscheidungen.',
      description:
        'Ich verbinde Prozessverständnis, industrielles Data Engineering, Enterprise-Systeme und Analytics zu einer durchgängigen Umsetzungskette.',
    },
    pipelineStages: [
      {
        id: 'process',
        shortLabel: 'Verstehen',
        title: 'Prozess & Use Case',
        description:
          'Produktions-, Qualitäts- und Logistikabläufe verstehen und operative Probleme in technische Anforderungen übersetzen.',
        evidence: 'Siemens · Ensinger · DHL · Grupor',
        deliverables: [
          'Operative Prozesse, Restriktionen und datenentstehende Schritte strukturiert erfassen.',
          'Engpässe in messbare Use Cases, Anforderungen und KPIs übersetzen.',
          'Business-, Produktions-, Logistik- und IT-Sicht auf ein gemeinsames Problemverständnis ausrichten.',
        ],
        capabilities: [
          { label: 'Prozessanalyse', status: 'applied' },
          { label: 'Lean / KVP', status: 'applied' },
          { label: 'Produktion & Logistik', status: 'applied' },
          { label: 'BPMN', status: 'applied' },
        ],
        evidenceItems: [
          {
            organization: 'Siemens',
            title: 'Fabrikdigitalisierung & kontinuierliche Verbesserung',
            description:
              'Produktionsnahe administrative Abläufe mit strukturierten Verbesserungs- und Digitalisierungsinitiativen verbunden.',
          },
          {
            organization: 'Ensinger · DHL · Grupor',
            title: 'Operatives Prozessverständnis',
            description:
              'Durch operative Tätigkeiten ein praxisnahes Verständnis für Restriktionen in Produktion, Qualität und Logistik aufgebaut.',
          },
        ],
        relatedProjectIds: ['business-processes'],
      },
      {
        id: 'integration',
        shortLabel: 'Verbinden',
        title: 'IT-/OT-Integration',
        description:
          'Maschinen-, Qualitäts-, MES- und ERP-Strukturen verbinden und ihren betrieblichen Kontext erhalten.',
        evidence: 'Hatz · 4process · msg systems',
        deliverables: [
          'OT-, Qualitäts-, MES- und ERP-Quellen in einer gemeinsamen Integrationsarchitektur abbilden.',
          'Schnittstellen und Datenhierarchien an ISA-95 und Enterprise-Systemen ausrichten.',
          'Quell-, Anlagen-, Auftrags- und Prozesskontext über Systemgrenzen hinweg erhalten.',
        ],
        capabilities: [
          { label: 'ISA-95', status: 'applied' },
          { label: 'MES-Integration', status: 'applied' },
          { label: 'SAP S/4HANA', status: 'applied' },
          { label: 'MQTT / UNS', status: 'developing' },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Integration industrieller Datenquellen',
            description:
              'Maschinen- und Qualitätsdaten im MES-/ERP-Kontext und entlang einer ISA-95-orientierten Architektur strukturiert.',
          },
          {
            organization: '4process · msg systems',
            title: 'Integration von Enterprise-Prozessen',
            description:
              'Mit SAP-S/4HANA-Prozessen, Datenstrukturen und Anwendungsschnittstellen gearbeitet.',
          },
        ],
        relatedProjectIds: ['sap-fiori', 'business-processes'],
      },
      {
        id: 'engineering',
        shortLabel: 'Aufbauen',
        title: 'Data Engineering',
        description:
          'Heterogene Quellen standardisieren und operative Daten über wartbare ETL-Pipelines transformieren.',
        evidence: 'Hatz Components',
        deliverables: [
          'Heterogene Quellformate und Schnittstellenausgaben standardisieren.',
          'Extraktions-, Transformations- und Ladeschritte für industrielle Daten konzipieren.',
          'Wiederverwendbare Transformationslogik und explizite Datenqualitätsregeln implementieren.',
        ],
        capabilities: [
          { label: 'Python', status: 'applied' },
          { label: 'ETL-Pipelines', status: 'applied' },
          { label: 'MS SQL', status: 'applied' },
          { label: 'Monitoring & Recovery', status: 'developing' },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Zentrale Qualitäts- & Maschinendatenpipeline',
            description:
              'ETL-Architektur und Transformationsskripte für die standardisierte Erfassung operativer Daten konzipiert.',
          },
        ],
        relatedProjectIds: ['robust-path-planning', 'web-engineering'],
      },
      {
        id: 'platform',
        shortLabel: 'Strukturieren',
        title: 'Datenplattform & Modelle',
        description:
          'Operationsorientierte SQL-Modelle und Datenhierarchien für nutzbare und wartbare integrierte Daten aufbauen.',
        evidence: 'Hatz Components',
        deliverables: [
          'Relationale Modelle für Anlagen-, Prozess-, Qualitäts- und Produktionskontext entwerfen.',
          'Operative Datensätze mit stabilen Stammdaten und SAP-orientierten Hierarchien verbinden.',
          'Wiederverwendbare Datenbestände für Reporting, Analytics und Anwendungen bereitstellen.',
        ],
        capabilities: [
          { label: 'Relationale Modellierung', status: 'applied' },
          { label: 'MSSQL / SSMS', status: 'applied' },
          { label: 'SAP-Datenhierarchie', status: 'applied' },
          {
            label: 'Fabric / Snowflake / Data Vault',
            status: 'developing',
          },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Operationsorientiertes SQL-Datenmodell',
            description:
              'Zentrale Qualitäts- und Maschinendaten in MSSQL modelliert und mit der Enterprise-Datenhierarchie verbunden.',
          },
        ],
        relatedProjectIds: ['sap-fiori', 'web-engineering'],
      },
      {
        id: 'analytics',
        shortLabel: 'Analysieren',
        title: 'BI, Analytics & AI',
        description:
          'Gesteuerte Daten in KPIs, analytische Prototypen und Entscheidungsmodelle für operative Nutzer überführen.',
        evidence: 'Hatz · ZF · Universitätsprojekte',
        deliverables: [
          'Operative KPIs und die dahinterliegende Datenlogik definieren.',
          'BI-, SPC- und explorative Analytics-Prototypen für Prozesstransparenz entwickeln.',
          'Prädiktive und optimierende Ansätze an operativen Entscheidungen bewerten.',
        ],
        capabilities: [
          { label: 'KPI- & BI-Design', status: 'prototyped' },
          { label: 'SPC', status: 'prototyped' },
          { label: 'Python-Simulation', status: 'applied' },
          { label: 'Power BI', status: 'developing' },
          {
            label: 'ML / Predictive Maintenance',
            status: 'prototyped',
          },
        ],
        evidenceItems: [
          {
            organization: 'Hatz Components',
            title: 'Industrielle Analytics-Konzepte',
            description:
              'KPI-, SPC- und Predictive-Maintenance-Prototypen auf integrierten Produktions- und Qualitätsdaten entwickelt.',
          },
          {
            organization: 'Universität Passau',
            title: 'Robuste Entscheidungsmodelle',
            description:
              'Optimierungsalgorithmen unter Unsicherheit durch Python-Experimente und Simulation evaluiert.',
          },
        ],
        relatedProjectIds: [
          'robust-path-planning',
          'facility-location',
          'operations-research',
        ],
      },
      {
        id: 'delivery',
        shortLabel: 'Umsetzen',
        title: 'Operative Lösungen',
        description:
          'Softwareoberflächen, Prototypen und Optimierungsmodelle für bessere operative Entscheidungen umsetzen.',
        evidence: 'msg systems · Portfolio · Universitätsprojekte',
        deliverables: [
          'Technische Ergebnisse in klare Interfaces für operative und fachliche Nutzer überführen.',
          'Enterprise- und Webanwendungen für datengetriebene Workflows implementieren.',
          'Lösungen durch Prototypen, Feedback und messbare Entscheidungsunterstützung validieren.',
        ],
        capabilities: [
          { label: 'SAP Fiori', status: 'applied' },
          { label: 'ABAP RAP', status: 'applied' },
          { label: 'React / TypeScript', status: 'applied' },
          { label: 'Optimierungsmodelle', status: 'prototyped' },
        ],
        evidenceItems: [
          {
            organization: 'msg systems',
            title: 'Umsetzung von ERP-Anwendungen',
            description:
              'SAP-Fiori-Oberflächen und Backend-Verhalten für datengetriebene S/4HANA-Workflows entwickelt.',
          },
          {
            organization: 'Portfolio · Universitätsprojekte',
            title: 'Interaktive Entscheidungsprototypen',
            description:
              'Responsive Interfaces, experimentelle Frameworks und Optimierungsmodelle umgesetzt, die komplexe Logik nutzbar machen.',
          },
        ],
        relatedProjectIds: [
          'sap-fiori',
          'web-engineering',
          'robust-path-planning',
        ],
      },
    ],
    projectsIntro: {
      eyebrow: 'Persönliche Projekte',
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
        id: 'hatz',
        title: 'Produktionsoptimierung & Fabrikdigitalisierung',
        organization: 'Hatz Components · Ruhstorf a. d. Rott',
        period: 'Apr 2026 – heute',
        description:
          'Praktikum Process & Production Excellence: zentrale Erfassung von Maschinen- und Qualitätsdaten, ein Pilot-ETL/ELT-System, Lakehouse-orientiertes Datenbankdesign, MES-/ERP-Verknüpfung über SAP-Datenhierarchien und BI-/KPI-Konzepte für die Smart Factory.',
        tags: ['ETL', 'ISA-95', 'MES & ERP', 'BI/KPI'],
      },
      {
        id: 'four-process',
        title: 'Geschäftsprozessmodellierung & ERP-Integration',
        organization: '4process AG · Passau',
        period: 'Okt – Nov 2024',
        description:
          'Geschäftsprozessanalyse und Modellierung für Fertigung und Logistik; Unterstützung bei ERP-Integration und Datenmigration in SAP-S/4HANA-Umgebungen.',
        tags: ['BPMN', 'SAP S/4HANA', 'Datenmigration'],
      },
      {
        id: 'zf',
        title: 'Verhandlungsstrategien in der Beschaffungslogistik',
        organization: 'ZF Group · Passau',
        period: 'Jun – Aug 2024',
        description:
          'Analyse von Beschaffungs- und Supply-Chain-Prozessen, KPI-Übersichten im strategischen Sourcing und Anwendung von Verhandlungsstrategien nach dem Harvard-Konzept.',
        tags: ['Beschaffung', 'KPI-Analyse', 'Verhandlung'],
      },
      {
        id: 'msg',
        title: 'Softwareentwicklung SAP Fiori',
        organization: 'msg systems AG · Passau',
        period: 'Mrz – Apr 2024',
        description:
          'Entwicklung von UI- und Backend-Komponenten mit SAP Fiori und ABAP RAP sowie Integration von Analytics in SAP-S/4HANA-Umgebungen.',
        tags: ['SAP Fiori', 'ABAP RAP', 'Analytics'],
      },
      {
        id: 'siemens',
        title: 'KVP & Fabrikdigitalisierung',
        organization: 'Siemens AG · Cham',
        period: 'Feb – Jul 2018',
        description:
          'Mitarbeit an Prozessdigitalisierung und Verbesserung administrativer Produktionsprozesse; Unterstützung bei Projektorganisation und Stakeholder-Kommunikation.',
        tags: ['KVP', 'Digitalisierung', 'Produktion'],
      },
      {
        id: 'operations',
        title: 'Operative Rollen in Produktion, Qualität & Logistik',
        organization: 'Ensinger · Deutsche Post DHL · Grupor',
        period: '2019 – 2025',
        description:
          'Praktische Arbeit in Kunststoffextrusion, Qualitätssicherung, Logistik und Verpackung – die operative Basis hinter meinem Fokus auf Data & Process Engineering.',
        tags: ['Produktion', 'Qualität', 'Logistik'],
      },
    ],
    education: [
      {
        id: 'bsc-wi',
        degree: 'B.Sc. Wirtschaftsinformatik',
        focus: 'Business Decisions & Data Science',
        institution: 'Universität Passau',
        period: 'Apr 2024 – heute',
      },
      {
        id: 'bsc-wiwi',
        degree: 'B.Sc. Wirtschaftswissenschaften',
        focus: 'Supply Chain / Operations Management & Information Systems',
        institution: 'Universität Passau',
        period: 'Okt 2021 – Apr 2026',
      },
      {
        id: 'abitur',
        degree: 'Allgemeines Abitur',
        focus: 'Wirtschaft und Verwaltung',
        institution: 'Staatliche Fachoberschule Cham',
        period: 'Aug 2017 – Okt 2020',
      },
    ],
    languages: [
      { id: 'de', name: 'Deutsch', level: 'Muttersprache' },
      { id: 'en', name: 'Englisch', level: 'C2' },
      { id: 'es', name: 'Spanisch', level: 'B1' },
    ],
    teasers: {
      pipeline: { cta: 'Alle sechs Stationen ansehen' },
      projects: { cta: 'Alle Projekte ansehen' },
      experience: { cta: 'Werdegang & Bildung ansehen' },
      skills: { cta: 'Fähigkeiten & Sprachen ansehen' },
    },
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
        id: 'data-engineering',
        title: 'Data Engineering & BI',
        subtitle: 'ETL, Airflow & Qlik Sense',
        description:
          'Pipelines, Datenmodelle und BI-Dashboards, die operative Daten in Entscheidungen überführen.',
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
