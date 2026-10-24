/*
  Portfolio content. Every fact here is taken from the project source code,
  reports or commit history. Edit this file to update the site; the pages
  render from it.
*/

window.PROFILE = {
  name: "Osama Abutaha",
  fullName: "Osama Raed Abutaha",
  role: "Computer Science Senior · AI Track",
  school: "Effat University, Jeddah",
  email: "osamaabutaha1@gmail.com",
  phone: "+966 50 466 5952",
  phoneHref: "tel:+966504665952",
  github: "https://github.com/Osvr7",
  linkedin: "https://www.linkedin.com/in/osama-abutaha",
  site: "https://osvr7.github.io/"
};

/*
  repo: a verified GitHub URL, or null when the repository is not published yet
  (the site then shows "Repository coming soon" instead of a broken link).
*/
window.PROJECTS = [
  {
    slug: "hajjsim",
    featured: true,
    title: "HajjSim Agent Studio",
    tagline: "A multi-agent digital twin that simulates pilgrim movement, stress and crowd risk across the Hajj rituals.",
    summary: "Each pilgrim is an autonomous agent with vitals, memory and a perceive–decide–act loop. Operators can inject hazards, deploy responders and watch risk build up on a live map before it happens in reality.",
    categories: ["ai", "software"],
    categoryLabel: "AI · Multi-Agent Simulation",
    course: "Artificial Intelligence (CS3081)",
    semester: "Spring 2026",
    type: "Team project · 4 members",
    status: "Working prototype",
    team: ["Osama Abutaha", "Ahmad Baabod", "Joman Alsharbini", "Sara Bin Shayhun"],
    supervisor: "Dr. Naila Marir",
    stack: ["Python", "JavaScript", "Leaflet", "Chart.js", "REST API", "LLM API", "HTML/CSS"],
    cover: "images/projects/hajjsim/dashboard.webp",
    coverAlt: "HajjSim dashboard showing the ritual summary, operational snapshot and live map",
    frame: "browser",
    stats: [
      { value: "12k+", label: "lines of Python & JS" },
      { value: "4-layer", label: "agent architecture" },
      { value: "0", label: "third-party Python deps" }
    ],
    repo: "https://github.com/Osvr7/HajjSim",
    links: [
      { label: "Research paper (PDF)", url: "https://github.com/Osvr7/HajjSim/blob/main/Documents/CS3081-Paper.pdf" },
      { label: "Poster (PDF)", url: "https://github.com/Osvr7/HajjSim/blob/main/Documents/Hajjsim_poster.pdf" }
    ],
    problem: "Over two million pilgrims move through the same holy sites on a fixed ritual schedule. Crowd management is still largely reactive: overcrowding is usually noticed only once it appears on cameras, when the only option left is to respond.",
    solution: "HajjSim models every pilgrim as an individual agent instead of treating the crowd as one fluid mass. A ritual-driven clock moves agents from arrival at Jeddah airport through Tawaf, Mina, Arafat, Muzdalifah and the Jamarat. Their stress, fatigue and hydration change with heat, density and hazards, so operators can rehearse a plan and see where risk accumulates.",
    features: [
      "Four-layer pilgrim agents: static profile, dynamic vitals, memory and a behaviour engine running a perceive → decide → act loop.",
      "Event-driven tick engine where one tick is one ritual stage, following the real Hajj schedule.",
      "Live Leaflet map with status-coloured pilgrim icons, buses, hotels, routes and a density heatmap.",
      "Hazard injection (blocked paths, heat spikes) and click-to-deploy police, marshals and ambulances.",
      "Operational graph and severity index updated every tick, plus a searchable, sortable agent roster.",
      "Optional language-model decisions: agents describe their situation to an LLM and choose from the engine's valid actions, with the rule-based answer as a safe fallback.",
      "Generated after-action analytics report listing bottlenecks, smooth-flow areas and suggestions."
    ],
    architecture: [
      { name: "Simulation engine", detail: "hajj_agents.py and hajj_units.py: agents, ritual schedule, risk dynamics and responder units." },
      { name: "HTTP server", detail: "app.py: standard-library Python server exposing a JSON REST API (agents, simulate/step, environment, units, analytics)." },
      { name: "Decision layer", detail: "llm_decision.py: provider-agnostic LLM client with caching, rate limiting, a circuit breaker and rule-based fallback." },
      { name: "Dashboard", detail: "Vanilla JavaScript single-page app with Leaflet, Leaflet.heat and Chart.js." },
      { name: "Data", detail: "JSON seed files for pilgrims, hamlahs (campaign groups) and hotels." }
    ],
    challenges: [
      "Making the crowd behave believably: risk and status thresholds were rebalanced several times so runs produce a realistic mix of stable, support-needed, high-risk and panicking pilgrims, with recovery.",
      "Representing time: a fixed-interval clock did not match how Hajj works, so the tick process was reworked so each tick advances one ritual stage.",
      "Keeping the AI-model layer safe: a failing or rate-limited provider must never freeze the simulation, so every model call can fall back to the rule engine instantly."
    ],
    results: [
      "Runs locally with one command (python app.py) and no third-party Python packages.",
      "Simulates a configurable population across the full ritual sequence with live risk metrics.",
      "Documented in a course research paper, poster and slide deck."
    ],
    role: "Co-lead developer, with 24 of the repository's 42 commits. I wrote the first version of the engine and dashboard, built the map-driven interface (status-coloured pilgrim icons, legend and tooltips), rebalanced the risk and status dynamics, reworked the ritual tick process and its animation, added the intelligence layer and refined the dashboard layout. I also co-authored the paper and prepared the README, poster and slides. Ahmad Baabod built the LLM decision layer and the demand-driven bus logic.",
    gallery: [
      { src: "images/projects/hajjsim/mina-map.webp", caption: "Agents at Mina Camps with status tooltips (stress, nationality, risk)", frame: "browser" },
      { src: "images/projects/hajjsim/live-map.webp", caption: "Live GPS map from Jeddah to the holy sites, with layers and environment controls", frame: "browser" },
      { src: "images/projects/hajjsim/ops-graph.webp", caption: "Operational graph: stress and support needs rising tick by tick", frame: "browser" },
      { src: "images/projects/hajjsim/agent-architecture.webp", caption: "Pilgrim agent architecture: four layers around a perceive–decide–act loop" },
      { src: "images/projects/hajjsim/poster.webp", caption: "Course research poster" }
    ]
  },
  {
    slug: "health-risk",
    featured: true,
    title: "Multi-Disease Health Risk Prediction",
    tagline: "Machine-learning models that estimate the risk of sleep disorders, diabetes and heart disease from lifestyle and clinical data.",
    summary: "Built in the Data Science course, then extended into a research paper and poster presented at Effat's Undergraduate Research Forum (UGRF 2026).",
    categories: ["ai", "data", "research"],
    categoryLabel: "Machine Learning · Research",
    course: "Data Science · UGRF 2026",
    semester: "Fall 2025 – Spring 2026",
    type: "Team project · 4 members",
    status: "Completed · presented at UGRF 2026",
    team: ["Ahmad Baabod", "Osama Abutaha", "Albaraa Mashaab", "Omar Abdulkarim"],
    supervisor: "Dr. Passent Elkafrawy",
    stack: ["Python", "scikit-learn", "pandas", "seaborn", "Matplotlib", "Jupyter"],
    cover: "images/projects/health-risk/poster-ugrf.webp",
    coverAlt: "UGRF 2026 research poster for the multi-disease health risk prediction system",
    coverFit: "poster",
    frame: "none",
    stats: [
      { value: "3", label: "real-world datasets" },
      { value: "7", label: "classifiers compared per disease" },
      { value: "90.7%", label: "best test accuracy (sleep, SVM)" }
    ],
    repo: "https://github.com/Osvr7/health-risk-prediction",
    links: [
      { label: "Research paper (PDF)", url: "https://github.com/Osvr7/health-risk-prediction/blob/main/docs/Final%20Paper.pdf" },
      { label: "UGRF 2026 poster (PDF)", url: "https://github.com/Osvr7/health-risk-prediction/blob/main/docs/UGRF-2026-poster.pdf" }
    ],
    problem: "Diabetes, sleep disorders and heart disease often go unnoticed until they are advanced. Most prediction tools look at one condition at a time and ignore lifestyle factors such as sleep, stress and activity.",
    solution: "One notebook-based system that cleans three public datasets, explores them, trains and tunes seven classifiers for each condition, keeps the best model per disease, and then asks the user a short questionnaire to produce a combined health report with probabilities and recommendations.",
    features: [
      "Data cleaning: duplicates removed, label encoding and scaling, and invalid zero values in the diabetes data (glucose, blood pressure and more) replaced with column means.",
      "Exploratory analysis: correlation heatmaps, histograms, age KDE plots and cholesterol boxplots.",
      "Seven classifiers per disease (Logistic Regression, KNN, SVM, Gaussian Naive Bayes, Decision Tree, Random Forest, Extra Trees), each tuned with 5-fold GridSearchCV.",
      "Automatic best-model selection on held-out test accuracy.",
      "Interactive console questionnaire that combines all three models into one personalised health report."
    ],
    resultsTable: {
      caption: "Best test accuracy per condition, taken from the project notebook's outputs (single train/test split).",
      head: ["Condition", "Dataset size", "Best model", "Test accuracy"],
      rows: [
        ["Sleep disorder", "374 records", "SVM (linear)", "90.7%"],
        ["Heart disease", "303 records", "Gaussian Naive Bayes", "89.5%"],
        ["Diabetes", "768 records", "Random Forest", "73.8%"]
      ]
    },
    challenges: [
      "The diabetes data had physiologically impossible zeros in several columns; treating them as missing and imputing them was needed before models could learn anything useful.",
      "Each dataset has a different schema, so the final system had to map one questionnaire onto three separate feature sets."
    ],
    results: [
      "Working end-to-end pipeline from raw CSVs to a personalised report.",
      "Research paper and poster presented at UGRF 2026 (certificate of participation)."
    ],
    role: "I owned the heart-disease model: data cleaning, encoding and scaling, the exploratory visualisations (age distribution, cholesterol boxplots, feature histograms) and the comparison of all seven classifiers. I co-authored the research paper and poster. Teammates led the sleep-disorder (Ahmad Baabod) and diabetes (Albaraa Mashaab, Omar Abdulkarim) models.",
    gallery: [
      { src: "images/projects/health-risk/heart-age-kde.webp", caption: "Age distribution with and without heart disease (notebook output)" },
      { src: "images/projects/health-risk/heart-chol-box.webp", caption: "Cholesterol levels by heart-disease outcome" },
      { src: "images/projects/health-risk/sleep-heatmap.webp", caption: "Feature correlation with sleep disorder" },
      { src: "images/projects/health-risk/console-input.webp", caption: "User questionnaire in the final system", frame: "terminal" },
      { src: "images/projects/health-risk/console-report.webp", caption: "Generated health report with recommendations", frame: "terminal" },
      { src: "images/projects/health-risk/poster-ds.webp", caption: "Data Science course poster" }
    ]
  },
  {
    slug: "cognitive-health",
    featured: true,
    title: "Cognitive Health Monitoring System",
    tagline: "The full software design for a system that passively screens seniors for early signs of cognitive decline, from market study to architecture and clickable prototypes.",
    summary: "A 34-page specification covering requirements, five detailed use cases, C4 architecture, UML and ER models, plus HTML prototypes of the clinician dashboard and caregiver app.",
    categories: ["software", "design"],
    categoryLabel: "Software Engineering · System Design",
    course: "Software Engineering (CS3151)",
    semester: "Spring 2026",
    type: "Team project · 3 members",
    status: "Design & prototype (no backend)",
    team: ["Osama Abutaha", "Hanan Idris", "Talh Hossin"],
    supervisor: "Dr. Passent Elkafrawy",
    stack: ["Requirements engineering", "UML", "C4 model", "ER modeling", "HTML/CSS prototypes", "LaTeX"],
    cover: "images/projects/cognitive-health/clinician-dashboard.webp",
    coverAlt: "Clinician dashboard prototype with cohort trend chart and critical alerts",
    frame: "browser",
    extraCover: "images/projects/cognitive-health/caregiver-app.webp",
    stats: [
      { value: "34", label: "page specification" },
      { value: "5", label: "detailed use cases" },
      { value: "10+", label: "UML, C4 & ER diagrams" }
    ],
    repo: "https://github.com/Osvr7/cognitive-health-monitoring-system",
    links: [
      { label: "Full specification (PDF)", url: "https://github.com/Osvr7/cognitive-health-monitoring-system/blob/main/docs/software-requirements-and-design-specification.pdf" }
    ],
    problem: "Dementia is often diagnosed late because clinical memory tests are stressful, costly and infrequent. Families and doctors lack a continuous, non-invasive signal between appointments.",
    solution: "A system design that, with the senior's consent, analyses their social-media writing over time for semantic signs of decline. The design anonymises personal data before analysis, scores risk over time, shows trends to clinicians, and alerts caregivers when a score drops sharply. The model choices in the design (NER-based anonymisation, a ClinicalBERT scorer) are proposals; this project delivered the specification and prototypes, not a trained model.",
    features: [
      "Market study, Business Model Canvas and competitor analysis.",
      "Personas, user stories, functional and non-functional requirements, and a traceability matrix.",
      "Five detailed use cases (consent and accounts, daily passive sync, clinical dashboard, automated risk alerts, security and compliance), each with diagrams.",
      "C4 context and container diagrams, activity, class and entity-relationship models.",
      "High-fidelity HTML prototypes for the clinician dashboard (desktop) and caregiver companion app (mobile).",
      "Validation and acceptance criteria and a project Gantt chart."
    ],
    challenges: [
      "Designing for privacy first: health data and personal text require consent flows, anonymisation before storage and audit logging, all specified as first-class requirements.",
      "Keeping five use cases, the class model and the database schema consistent with each other through the traceability matrix."
    ],
    results: [
      "Complete requirements and design specification written in LaTeX.",
      "Two clickable HTML prototypes demonstrating the main user journeys."
    ],
    role: "Co-author in a team of three: requirements, use cases, architecture models and interface prototypes were produced together for the final specification.",
    gallery: [
      { src: "images/projects/cognitive-health/caregiver-app.webp", caption: "Caregiver companion app prototype (mobile)", frame: "phone" },
      { src: "images/projects/cognitive-health/c4-context.webp", caption: "C4 level 1: system context" },
      { src: "images/projects/cognitive-health/c4-container.webp", caption: "C4 level 2: containers" },
      { src: "images/projects/cognitive-health/use-case.webp", caption: "Use case 2: automated data ingestion and scoring pipeline" },
      { src: "images/projects/cognitive-health/class-diagram.webp", caption: "UML class diagram" },
      { src: "images/projects/cognitive-health/er-diagram.webp", caption: "Entity-relationship model" },
      { src: "images/projects/cognitive-health/business-canvas.webp", caption: "Business Model Canvas" }
    ]
  },
  {
    slug: "jeddah-horizons",
    featured: false,
    title: "Jeddah Horizons",
    tagline: "A database-driven tourism website for Jeddah with user accounts and a landmarks catalogue.",
    summary: "PHP and MySQL web app: visitors browse landmarks loaded from the database, register with hashed passwords, and log in to a session.",
    categories: ["software", "web"],
    categoryLabel: "Full-Stack Web",
    course: "Web Development (CS2111)",
    semester: "Fall 2025",
    type: "Team project · 3 members",
    status: "Completed",
    team: ["Osama Abutaha", "Joman Alsharbini", "Ahmad Baabod"],
    stack: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    cover: "images/projects/jeddah-horizons/home.webp",
    coverAlt: "Jeddah Horizons home page with a hero video of the Jeddah skyline",
    frame: "browser",
    repo: "https://github.com/Osvr7/jeddah-horizons",
    links: [],
    problem: "Visitors to Jeddah have no single, simple place to discover the city's historic and modern landmarks.",
    solution: "A dark-themed website backed by a MySQL database: landmarks are stored with descriptions and images and rendered dynamically, while users can create accounts and sign in.",
    features: [
      "Landmarks catalogue rendered from a MySQL table (Al-Balad, Al-Rahmah Mosque, the Corniche, King Fahd's Fountain and more).",
      "Registration with server-side validation and password hashing (password_hash).",
      "Login and logout with PHP sessions; navigation changes when signed in.",
      "Shared header and footer templates and a database schema with users, landmarks and reviews tables.",
      "Full-screen video hero on the home page."
    ],
    role: "Team of three. We built the PHP pages, database schema and styling together and documented every file in the project report.",
    gallery: [
      { src: "images/projects/jeddah-horizons/landmarks-top.webp", caption: "Landmarks loaded from the MySQL database", frame: "browser" },
      { src: "images/projects/jeddah-horizons/register.webp", caption: "Registration form with validation", frame: "browser" }
    ]
  },
  {
    slug: "event-db",
    featured: false,
    title: "Campus Event Management Database",
    tagline: "A relational database for Effat University events: students, organisers, venues, resources and registrations.",
    summary: "From an EER model with organiser specialisation to a normalised MariaDB schema with sample data and six reporting views.",
    categories: ["data", "software"],
    categoryLabel: "Database Design",
    course: "Database Systems (CS2071)",
    semester: "Spring 2025",
    type: "Team project · 3 members",
    status: "Completed",
    team: ["Osama Abutaha", "Joman Alsharbini", "Ahmad Baabod"],
    stack: ["SQL", "MariaDB", "EER modeling", "Relational design"],
    cover: "images/projects/event-db/eer-1.webp",
    coverAlt: "EER diagram with Student, Organizer and Register relationship",
    frame: "none",
    repo: "https://github.com/Osvr7/campus-event-management-db",
    links: [],
    problem: "Campus events are coordinated through scattered messages and spreadsheets, so tracking venues, equipment and who registered is error-prone.",
    solution: "A Campus Event Management System database that links events to venues, organisers, required resources and student registrations, with views that answer common questions directly.",
    features: [
      "EER model with a disjoint specialisation of organisers into faculty and student organisers.",
      "Mapped relational schema: Student, Organizer, Venue, Event, Resource, Register and Needs, with primary and foreign keys.",
      "Sample data for events, venues, resources and registrations.",
      "Six views: students and their events, event resources, event organisers, most-used resources, registrations per event, and event counts per organiser."
    ],
    role: "Team of three: conceptual model, relational mapping, SQL implementation and report.",
    gallery: [
      { src: "images/projects/event-db/eer-2.webp", caption: "EER diagram: venues, events and resources" },
      { src: "images/projects/event-db/relational-model.webp", caption: "Relational model with foreign keys" },
      { src: "images/projects/event-db/query-registrations.webp", caption: "View: total registrations per event", frame: "terminal" },
      { src: "images/projects/event-db/query-organizers.webp", caption: "View: events per organiser", frame: "terminal" }
    ]
  },
  {
    slug: "university-network",
    featured: false,
    title: "Scalable Inter-University Network",
    tagline: "A Cisco Packet Tracer design connecting two universities over a redundant WAN with shared DNS, DHCP and web servers.",
    summary: "Hierarchical star LANs, a triangular RIP-routed WAN, subnetting per institution and centrally shared services, tested end to end.",
    categories: ["systems"],
    categoryLabel: "Computer Networks",
    course: "Computer Networks (CS2091)",
    semester: "Spring 2025",
    type: "Team project · 4 members",
    status: "Completed",
    team: ["Osama Abutaha", "Joman Alsharbini", "Al-Baraa Mashaab", "Ahmad Baabod"],
    stack: ["Cisco Packet Tracer", "RIP", "DHCP", "DNS", "Subnetting"],
    cover: "images/projects/university-network/servers.webp",
    coverAlt: "Shared web, DNS and DHCP servers between Effat and Alfaisal universities",
    frame: "none",
    repo: "https://github.com/Osvr7/inter-university-network",
    links: [],
    problem: "Two separate organisations need to collaborate and share IT services without duplicating infrastructure.",
    solution: "Each university gets a hierarchical LAN (departmental switches into a core switch and router). Three routers in a triangle form the WAN, so traffic has an alternative path if one link fails. Shared DNS, DHCP and web servers sit in the middle and serve both campuses.",
    features: [
      "Hierarchical star topology per university with departmental switches.",
      "Triangular WAN of three routers running RIP for dynamic routing and redundancy.",
      "Separate /24 subnets per institution.",
      "Central DHCP pool, DNS records for both university domains, and a shared web server.",
      "Connectivity verified with ping and packet-level simulation (ARP and Ethernet frames)."
    ],
    challenges: [
      "The report also documents the design's limits honestly: RIP's 15-hop limit and slow convergence, and the shared servers being a single point of failure."
    ],
    role: "Team of four: topology design, device configuration, testing, report and demo video.",
    gallery: [
      { src: "images/projects/university-network/topology.webp", caption: "Full topology of both campuses and the WAN" },
      { src: "images/projects/university-network/dns.webp", caption: "DNS server records for both university domains" },
      { src: "images/projects/university-network/dhcp.webp", caption: "DHCP pool configuration" },
      { src: "images/projects/university-network/ping-test.webp", caption: "End-to-end ping test" }
    ]
  },
  {
    slug: "java-atm",
    featured: false,
    title: "ATM Banking System",
    tagline: "A Java Swing desktop ATM with login, deposits, withdrawals and transaction history persisted to files.",
    summary: "Object-oriented design with an abstract Account class, checking and savings subclasses, users, transactions and file-based storage.",
    categories: ["software"],
    categoryLabel: "Object-Oriented Programming",
    course: "Object-Oriented Programming (CS2132)",
    semester: "Spring 2025",
    type: "Team project · 2 members",
    status: "Completed",
    team: ["Osama Abutaha", "Joman Alsharbini"],
    stack: ["Java", "Swing", "OOP", "File I/O"],
    cover: "images/projects/java-atm/cover.webp",
    coverAlt: "The ATM login and main menu windows captured from the running Java application",
    coverFit: "cover",
    frame: "none",
    repo: "https://github.com/Osvr7/java-swing-atm",
    links: [],
    problem: "Demonstrate core OOP principles (abstraction, inheritance and encapsulation) in a realistic, interactive application.",
    solution: "A Swing GUI on top of a small domain model: users own accounts, accounts record transactions, and an ATM service loads and saves everything to text files.",
    features: [
      "Login screen with user ID and PIN validation.",
      "Balance inquiry, deposit, withdrawal (with input validation) and transaction history.",
      "Abstract Account class with CheckAccount and SavingsAccount subclasses.",
      "Accounts and transactions persisted to and reloaded from text files."
    ],
    role: "Pair project: domain model, GUI and file persistence, plus the report and demo video.",
    gallery: [
      { src: "images/projects/java-atm/main-menu.webp", caption: "Main menu window (captured from the running application)", frame: "window" },
      { src: "images/projects/java-atm/login.webp", caption: "Login window (captured from the running application)", frame: "window" },
      { src: "images/projects/java-atm/code-main.webp", caption: "Application entry point and login screen code" }
    ]
  },
  {
    slug: "svd-compression",
    featured: false,
    title: "SVD Image Compression",
    tagline: "Using singular value decomposition to show how linear algebra powers data compression in AI and ML.",
    summary: "An image is factorised into U, Σ and Vᵀ and rebuilt from its top k singular values, trading storage for detail.",
    categories: ["ai", "data"],
    categoryLabel: "Linear Algebra for ML",
    course: "Linear Algebra (MATH307)",
    semester: "Spring 2026",
    type: "Individual project",
    status: "Completed",
    team: ["Osama Abutaha"],
    stack: ["Python", "NumPy", "Matplotlib", "Pillow"],
    cover: "images/projects/svd-compression/results.webp",
    coverAlt: "The same portrait reconstructed with k = 5, 20, 50 and 100 singular values",
    frame: "none",
    repo: "https://github.com/Osvr7/svd-image-compression",
    links: [],
    problem: "Images are large matrices, and most of their information is concentrated in a few dominant patterns.",
    solution: "Compute the SVD of a grayscale image and reconstruct it with only the top k singular values, then compare visual quality against the storage needed for each k.",
    features: [
      "Grayscale conversion and full SVD with NumPy.",
      "Low-rank reconstructions for k = 5, 20, 50 and 100 shown side by side.",
      "Storage comparison for k = 100: 149,100 stored numbers instead of 549,096, a 72.85% reduction on the sample image.",
      "Report connecting low-rank approximation to PCA and matrix factorisation in ML."
    ],
    role: "Individual project: code, analysis, report and video presentation.",
    gallery: [
      { src: "images/projects/svd-compression/code.webp", caption: "Full implementation" }
    ]
  },
  {
    slug: "postfix-evaluator",
    featured: false,
    title: "Postfix Expression Evaluator",
    tagline: "A C++ console program that evaluates Reverse Polish Notation using hand-built stack and queue classes.",
    summary: "Expressions are tokenised into a queue and evaluated with a stack, with clear errors for malformed input.",
    categories: ["software"],
    categoryLabel: "Data Structures",
    course: "Data Structures (CS2011)",
    semester: "Fall 2025",
    type: "Team project · 3 members",
    status: "Completed",
    team: ["Osama Abutaha", "Joman Alsharbini", "Ahmad Baabod"],
    stack: ["C++", "Stacks", "Queues"],
    cover: "images/projects/postfix-evaluator/stack-class.webp",
    coverAlt: "C++ stack class implementation",
    coverFit: "code",
    frame: "none",
    repo: "https://github.com/Osvr7/postfix-evaluator-cpp",
    links: [],
    problem: "Evaluate arithmetic expressions without parentheses or precedence rules.",
    solution: "Tokenise the input into a queue, then process tokens with a stack: operands are pushed, and operators pop two values and push the result.",
    features: [
      "Custom Stack and Queue classes, with no STL containers for the core logic.",
      "Tokenizer that separates numbers and operators.",
      "Error handling for division by zero, insufficient operands and malformed expressions."
    ],
    role: "Team of three: implementation, testing and documentation.",
    gallery: [
      { src: "images/projects/postfix-evaluator/evaluate-postfix.webp", caption: "evaluatePostfix(): the stack-based evaluation loop" }
    ]
  }
];

window.CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & ML" },
  { id: "software", label: "Software" },
  { id: "data", label: "Data" },
  { id: "web", label: "Web" },
  { id: "systems", label: "Systems & Networks" },
  { id: "research", label: "Research" }
];

/*
  Certificates from the شهاداتي folder. "verify" is the issuer's own verification
  link (Coursera) where one exists; "image" is a preview of certificates that
  contain no ID numbers. Volunteering certificates show a national ID, so they
  are summarised in the Experience section instead of shown here.
*/
window.CERT_GROUPS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI, Data & Programming" },
  { id: "events", label: "Research & Workshops" },
  { id: "pro", label: "Communication" },
  { id: "member", label: "Memberships" }
];

window.CERTIFICATES = [
  { group: "ai", title: "Mathematics for Machine Learning and Data Science", kind: "Specialization · 3 courses", issuer: "DeepLearning.AI", date: "Dec 2025", verify: "https://coursera.org/verify/specialization/L3EQF7FKZVE6", image: "images/certs/math-ml-specialization.webp", featured: true },
  { group: "ai", title: "Python for Data Science, AI & Development", kind: "Course", issuer: "IBM", date: "Nov 2025", verify: "https://coursera.org/verify/4SDE5U377HZB", image: "images/certs/ibm-python-ds.webp", featured: true },
  { group: "ai", title: "Python Data Structures", kind: "Course", issuer: "University of Michigan", date: "Apr 2024", verify: "https://coursera.org/verify/JL8WGFMZ6BKA", image: "images/certs/python-data-structures.webp" },
  { group: "ai", title: "Programming for Everybody (Getting Started with Python)", kind: "Course", issuer: "University of Michigan", date: "Mar 2024", verify: "https://coursera.org/verify/J8LNZZD42ZFX", image: "images/certs/programming-for-everybody.webp" },
  { group: "ai", title: "Applications of AI in Improving Safety Systems", kind: "Training course", issuer: "Sindal", date: "Oct 2025", image: "images/certs/ai-safety-systems.webp" },
  { group: "pro", title: "Successful Presentation", kind: "Course · with honors", issuer: "University of Colorado Boulder", date: "Mar 2025", verify: "https://coursera.org/verify/ONFS8PKL0JYX", image: "images/certs/successful-presentation.webp", featured: true },
  { group: "ai", title: "Digital Safety and Security", kind: "Course", issuer: "Arizona State University", date: "Oct 2024", verify: "https://coursera.org/verify/CGFUBLOAL3Y4", image: "images/certs/digital-safety.webp" },
  { group: "events", title: "7th Undergraduate Research Forum: Research Poster", kind: "Certificate of participation", issuer: "Effat University", date: "Feb 2026", image: "images/certs/ugrf-2026.webp", featured: true },
  { group: "events", title: "Generating Videos using AI Workshop", kind: "Certificate of attendance", issuer: "Effat College of Engineering", date: "Mar 2024", image: "images/certs/ai-video-workshop.webp" },
  { group: "member", title: "IEEE Computer Society Student Member", kind: "Membership", issuer: "IEEE Computer Society", date: "2026", image: "images/certs/ieee-cs-membership.webp" },
  { group: "member", title: "IEEE Student Member, Western Saudi Arabia Section", kind: "Membership", issuer: "IEEE", date: "2026", image: "images/certs/ieee-membership.webp" }
];
