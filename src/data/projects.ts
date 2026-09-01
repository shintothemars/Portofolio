// src/data/projects.ts
// Single source of truth for all portfolio projects
//
// ═══════════════════════════════════════════════════════════════════
// CARA NAMBAHIN GAMBAR:
//
// 1. Taruh file JPG/PNG ke folder yang sesuai:
//    src/assets/projects/skincure/   → untuk SkinCure
//    src/assets/projects/elogul/     → untuk Elogul
//    src/assets/projects/planet-card/→ untuk Planet Card
//    src/assets/projects/stret/      → untuk STRET
//    src/assets/projects/dermaly/    → untuk DermaLy
//
// 2. Import gambarnya di atas:
//    import skinCover from '../assets/projects/skincure/cover.jpg';
//    import skin1 from '../assets/projects/skincure/screen1.jpg';
//
// 3. Masukkan ke array images:
//    images: [skinCover, skin1],
//    coverImage: skinCover,
//
// ═══════════════════════════════════════════════════════════════════
//
// CONTOH (uncomment kalau udah taruh gambarnya):
//
// import skinCover   from '../assets/projects/skincure/cover.jpg';
// import skin1       from '../assets/projects/skincure/screen1.jpg';
// import skin2       from '../assets/projects/skincure/screen2.jpg';
//
// import elogulCover from '../assets/projects/elogul/cover.jpg';
// import elogul1     from '../assets/projects/elogul/screen1.jpg';
//
// import planetCover from '../assets/projects/planet-card/cover.jpg';
// import planet1     from '../assets/projects/planet-card/screen1.jpg';
//
// import stretCover  from '../assets/projects/stret/cover.jpg';
//
// import dermalyCover from '../assets/projects/dermaly/cover.jpg';
// import dermaly1    from '../assets/projects/dermaly/screen1.jpg';
// import dermaly2    from '../assets/projects/dermaly/screen2.jpg';
// ═══════════════════════════════════════════════════════════════════

export interface Project {
  id: string;
  num: string;
  title: string;
  titleLine2?: string;
  category: string;
  year: string;
  type: string;
  shortDesc: string;
  fullDesc: string;
  role: string[];
  responsibilities: string[];
  impact: string;
  learned?: string;
  tools: string[];
  images: string[];       // array of imported image paths
  coverImage?: string;    // first / main image shown in card
  hasVisualization?: boolean;
}

export const projects: Project[] = [
  {
    id: 'skincure',
    num: '01',
    title: 'SKINCURE',
    category: 'AI · HEALTH TECH · MOBILE',
    year: '2024',
    type: 'Bangkit Academy 2024 Capstone Project',
    shortDesc:
      'A mobile application for early educational awareness of facial skin conditions using CNN-based image classification.',
    fullDesc:
      'SkinCure is a mobile application built as the Bangkit Academy 2024 capstone project. It uses a Convolutional Neural Network (CNN) model to classify facial skin conditions from uploaded images, providing early educational awareness to users about possible skin conditions. The project emphasizes accessible design and a simple prediction flow.',
    role: ['Machine Learning Developer', 'UI/UX Designer'],
    responsibilities: [
      'Built the facial skin condition detection model using CNN',
      'Prepared and curated the image dataset',
      'Trained and evaluated the machine learning model',
      'Designed the mobile application interface in Figma',
      'Designed a simple and user-friendly prediction flow',
    ],
    impact:
      'Helps users gain early educational awareness of possible facial skin conditions through an accessible mobile-based classification system.',
    learned:
      'Deepened understanding of CNN architecture, model evaluation, dataset preparation, and how to design intuitive prediction interfaces for health-related applications.',
    tools: ['Python', 'TensorFlow / Keras', 'CNN', 'Google Colab', 'Figma', 'Android / Mobile UI'],
    images: [],        // ← ganti dengan: [skinCover, skin1, skin2]
    coverImage: '',    // ← ganti dengan: skinCover
  },
  {
    id: 'elogul',
    num: '02',
    title: 'ELOGUL',
    category: 'UI/UX · FLUTTER · HEALTH TECH',
    year: '2025',
    type: 'PIMNAS Group Project',
    shortDesc:
      'A mobile application for recording and monitoring blood sugar levels, combined with an IoT-based monitoring system.',
    fullDesc:
      'Elogul is a health monitoring mobile application developed for PIMNAS. It enables users to record blood sugar levels and visualize their health history through an intuitive interface. The application connects to an IoT-based blood sugar monitoring device and presents data through graphs and status dashboards.',
    role: ['UI/UX Designer', 'Flutter Mobile Developer'],
    responsibilities: [
      'Designed the full mobile application interface',
      'Created user flow for the health monitoring experience',
      'Built application screens using Flutter',
      'Implemented dashboard, user detail page, and blood sugar status display',
      'Developed graph visualization and history page',
    ],
    impact:
      'Presents health information in a simple visual format, helping users understand their blood sugar status and history over time.',
    learned:
      'Gained experience in Flutter mobile development, designing data visualization for health contexts, and developing user-centered interfaces for IoT-connected applications.',
    tools: ['Flutter', 'UI/UX Design', 'Mobile Development'],
    images: [],        // ← ganti dengan: [elogulCover, elogul1]
    coverImage: '',    // ← ganti dengan: elogulCover
  },
  {
    id: 'planet-card',
    num: '03',
    title: 'PLANET CARD',
    titleLine2: 'EDUCATIONAL GAME',
    category: 'GAME · UNITY · EDUCATION',
    year: '2025',
    type: 'Group Project',
    shortDesc:
      'An interactive educational game using drag-and-drop card mechanics to help students recognize and learn about planets.',
    fullDesc:
      'Planet Card Educational Game is an interactive learning experience created as a final semester project. Built in Unity, the game uses drag-and-drop card mechanics to help students recognize planets, understand their characteristics, and match them through visual interaction.',
    role: ['Unity Game Developer'],
    responsibilities: [
      'Arranged UI elements and game layout',
      'Implemented gameplay flow and level structure',
      'Placed and managed game assets',
      'Built drag-and-drop interaction system',
      'Tested and iteratively improved the game experience',
    ],
    impact:
      'Created an interactive learning experience that helps students understand and remember planetary information through simple, engaging game mechanics.',
    learned:
      'Learned Unity game development fundamentals, drag-and-drop interaction design, and how to balance educational objectives with engaging gameplay.',
    tools: ['Unity', 'Drag-and-Drop Mechanics', 'Educational Game Design'],
    images: [],        // ← ganti dengan: [planetCover, planet1]
    coverImage: '',    // ← ganti dengan: planetCover
  },
  {
    id: 'stret',
    num: '04',
    title: 'STRET',
    titleLine2: 'CLUSTERING SYSTEM',
    category: 'MACHINE LEARNING · WEB APPLICATION',
    year: '2026',
    type: 'Freelance Project',
    shortDesc:
      'A web-based machine learning system that enables users to analyze and group datasets using clustering techniques.',
    fullDesc:
      'STRET Clustering System is a freelance web-based project that transforms a data analysis process into an accessible web application. Users can upload and analyze datasets through a clustering interface, making machine learning analysis approachable without deep technical expertise.',
    role: ['Machine Learning Developer', 'Web Developer'],
    responsibilities: [
      'Built the clustering workflow and logic',
      'Prepared the web application structure',
      'Managed GitHub repository and version control',
      'Supported the deployment process',
      'Connected machine learning logic with the web interface',
    ],
    impact:
      'Transformed a technical data analysis process into a more accessible web-based system, making clustering analysis available through a browser interface.',
    learned:
      'Gained experience integrating machine learning models into web applications and managing the full project lifecycle from development to deployment.',
    tools: ['Python', 'Machine Learning', 'Flask / Streamlit', 'GitHub'],
    images: [],        // ← ganti dengan: [stretCover] (kalau ada screenshot)
    coverImage: '',    // ← ganti dengan: stretCover
    hasVisualization: true,  // menampilkan animasi clustering canvas
  },
  {
    id: 'dermaly',
    num: '05',
    title: 'DERMALY',
    titleLine2: 'AI SKIN CONDITION CLASSIFIER',
    category: 'AI · HEALTH TECH · WEB APPLICATION',
    year: '2026',
    type: 'Final Project',
    shortDesc:
      'An AI-powered web application for educational classification of possible facial skin conditions from uploaded images.',
    fullDesc:
      'DermaLy is an AI-powered web application designed to classify possible facial skin conditions from uploaded images. The application provides prediction results, confidence scores, and visual explanations through an accessible web interface. It is intended for educational awareness only — not medical diagnosis.',
    role: ['Machine Learning Developer', 'Web Developer'],
    responsibilities: [
      'Developed and trained the machine learning classification model',
      'Prepared and curated the training dataset',
      'Compared performance across multiple model architectures',
      'Integrated the best-performing model into a Flask-based web application',
      'Designed the image upload → prediction result → visual explanation flow',
    ],
    impact:
      'Demonstrates how artificial intelligence can support accessible educational awareness about possible facial skin conditions through an easy-to-use web interface.',
    learned:
      'Advanced understanding of PyTorch model training and evaluation, model comparison methodology, Flask web integration, and designing interpretable AI outputs for non-technical users.',
    tools: ['Python', 'PyTorch', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Google Colab'],
    images: [],        // ← ganti dengan: [dermalyCover, dermaly1, dermaly2]
    coverImage: '',    // ← ganti dengan: dermalyCover
  },
];
