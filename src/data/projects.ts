// src/data/projects.ts
// Single source of truth for all portfolio projects.
// Project imagery imported directly from src/assets/projects/ for optimal Vite bundling.

import rekruttaCover from '../assets/projects/rekrutta/Rekrutta.png';
import dermalyCover from '../assets/projects/dermaly/DermaLy.png';
import stretCover from '../assets/projects/stret/Stret.png';
import chronotechCover from '../assets/projects/elogul/Chrono Tech.png';
import skincureCover from '../assets/projects/skincure/Skincure.png';
import planetCover from '../assets/projects/planet-card/Game Planet.png';

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: string;
  shortTitle?: string;
  titleLine2?: string;
  year: number | string;
  type: string;
  categories: string[];
  role: string[];
  description: string;
  impact: string;
  learned?: string;
  tools: string[];
  coverImage?: string;
  images?: string[];
  links?: ProjectLinks;
  featured: boolean;
  published: boolean;
  responsibilities?: string[];
  hasVisualization?: boolean;

  // Optional future-proof fields
  client?: string;
  duration?: string;
  team?: string;
  problem?: string;
  solution?: string;
  process?: string;
  technologies?: string[];
  liveDemo?: string;
  video?: string;
  testimonial?: string;
}

export const projects: Project[] = [
  {
    id: 'rekrutta',
    title: 'REKRUTTA.AI',
    shortTitle: 'REKRUTTA.AI',
    titleLine2: 'AI-POWERED RECRUITMENT PLATFORM',
    year: 2025,
    type: 'Product Project / Web Application',
    categories: ['AI', 'Web Application', 'Full Stack', 'UI/UX', 'HR Tech'],
    role: ['Full Stack Developer', 'UI/UX Designer'],
    description:
      'Website HR berbasis AI yang membantu UKM merekrut kandidat tanpa tim HR khusus, sekaligus membantu job seeker menemukan pekerjaan yang sesuai dengan kemampuan dan potensinya.',
    responsibilities: [
      'Merancang sistem rekrutmen cerdas berbasis AI dengan evaluasi kecocokan kandidat (Match Score)',
      'Membangun alur pemindaian CV (Scan CV) dan ekstraksi keterampilan otomatis',
      'Mengembangkan modul psikotes digital dan latihan wawancara berbasis AI (AI Interview)',
      'Mendesain antarmuka modern yang ramah pengguna untuk pemilik UKM maupun pencari kerja',
    ],
    impact:
      'Memudahkan UKM menemukan talenta yang tepat secara efisien serta membantu pencari kerja memetakan potensi karir mereka.',
    learned:
      'Mendalami perancangan platform pencocokan talenta berbasis AI, arsitektur full-stack dengan React dan Laravel, serta pemetaan kompetensi kandidat yang presisi.',
    tools: [
      'React',
      'Laravel',
      'TypeScript',
      'Figma',
      'AI / NLP Matching',
      'Tailwind CSS',
    ],
    coverImage: rekruttaCover,
    images: [rekruttaCover, '/projects/rekrutta/01.png'],
    links: {
      live: '',
      github: '',
      caseStudy: '',
    },
    featured: true,
    published: true,
  },
  {
    id: 'dermaly',
    title: 'DERMALY',
    shortTitle: 'DERMALY',
    titleLine2: 'FACIAL SKIN DISEASE CLASSIFIER',
    year: 2026,
    type: 'Final Project / Academic Research',
    categories: ['AI', 'Machine Learning', 'HealthTech', 'Web Application'],
    role: ['Machine Learning Developer', 'Web Developer'],
    description:
      'Website AI untuk mengklasifikasikan penyakit kulit pada wajah menggunakan model Swin Transformers V2 dan ResNet50 yang dilengkapi visualisasi heatmap Grad-CAM untuk transparansi analisis medis awal.',
    responsibilities: [
      'Mengembangkan dual model AI (Swin Transformer v2 & ResNet50) untuk klasifikasi 6 kategori penyakit kulit wajah',
      'Mengimplementasikan visualisasi heatmap Grad-CAM untuk interpretasi hasil diagnosis AI yang dapat dijelaskan (Explainable AI)',
      'Mengintegrasikan model terbaik ke dalam aplikasi web berbasis Flask dengan inferensi real-time',
      'Mendesain alur unggah atau ambil foto wajah langsung, analisis skor keyakinan, hingga penjelasan visual interaktif',
    ],
    impact:
      'Membantu pengguna dan edukator memperoleh kesadaran awal mengenai kondisi kulit wajah melalui analisis kecerdasan buatan yang akurat dan transparan.',
    learned:
      'Menguasai pelatihan Vision Transformer (Swin Transformer V2), teknik Explainable AI dengan Grad-CAM, serta deployment model deep learning ke antarmuka web.',
    tools: [
      'Python',
      'PyTorch',
      'Swin Transformer V2',
      'ResNet50',
      'Grad-CAM',
      'Flask',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    coverImage: dermalyCover,
    images: [dermalyCover],
    links: {
      live: '',
      github: '',
      caseStudy: '',
    },
    featured: true,
    published: true,
  },
  {
    id: 'stret',
    title: 'STRET',
    shortTitle: 'STRET',
    titleLine2: 'STREET PHOTOGRAPHY CLUSTERING',
    year: 2026,
    type: 'Freelance Project',
    categories: ['Machine Learning', 'Web Application', 'Data Science'],
    role: ['Machine Learning Developer', 'Web Developer'],
    description:
      'Sistem clustering kepadatan sesi foto pada jasa street photography Sudut Kotalama menggunakan algoritma K-Means dan Fuzzy C-Means untuk optimasi penjadwalan dan distribusi fotografer.',
    responsibilities: [
      'Membangun workflow clustering dengan metode hard clustering (K-Means) dan soft clustering derajat keanggotaan (Fuzzy C-Means)',
      'Menganalisis kepadatan berdasarkan lokasi (Marba, Pringgosewu, Distrik), kategori hari (weekend, hari libur), dan rasio fotografer',
      'Menyediakan fitur evaluasi perbandingan performa algoritma, visualisasi sebaran cluster, dan ekspor data hasil analisis',
      'Mengembangkan dashboard analitik modern dengan antarmuka gelap yang responsif dan mudah dipahami',
    ],
    impact:
      'Mentransformasi proses analisis data manual menjadi sistem digital berbasis web yang mempermudah pengambilan keputusan operasional jasa fotografi.',
    learned:
      'Mengintegrasikan model clustering unsupervised machine learning dengan antarmuka analitik web real-time serta visualisasi data multidimensi.',
    tools: [
      'Python',
      'Machine Learning',
      'K-Means',
      'Fuzzy C-Means',
      'Flask / Streamlit',
      'Sudut Kotalama Dataset',
      'GitHub',
    ],
    coverImage: stretCover,
    images: [stretCover],
    links: {
      live: '',
      github: '',
      caseStudy: '',
    },
    featured: true,
    published: true,
    hasVisualization: true,
  },
  {
    id: 'elogul',
    title: 'CHRONOTECH',
    shortTitle: 'CHRONOTECH',
    titleLine2: 'IOT HEALTH MONITORING',
    year: 2025,
    type: 'PIMNAS Group Project',
    categories: ['UI/UX', 'Flutter', 'HealthTech', 'Mobile', 'IoT'],
    role: ['UI/UX Designer', 'Flutter Mobile Developer'],
    description:
      'Aplikasi mobile IoT untuk memantau dan mendeteksi kadar gula darah serta asam urat tinggi secara otomatis, terhubung langsung dengan perangkat sensor IoT, grafik tren kesehatan, dan modul edukasi.',
    responsibilities: [
      'Mendesain antarmuka pengguna komprehensif di Figma (Dashboard status kesehatan, grafik riwayat, dan profil pengguna)',
      'Membangun aplikasi mobile menggunakan Flutter dengan integrasi pencatatan otomatis kadar gula darah dan asam urat',
      'Mengembangkan visualisasi grafik dinamis untuk mempermudah pemahaman tren status kesehatan (Normal / Tinggi)',
      'Mengintegrasikan alur komunikasi data antara perangkat keras sensor IoT dengan aplikasi mobile',
    ],
    impact:
      'Menyajikan data kesehatan personal dalam format visual yang ramah dan mudah dipahami untuk membantu pencegahan dan monitoring penyakit kronis sejak dini.',
    learned:
      'Mengasah keahlian pengembangan aplikasi Flutter terintegrasi IoT, visualisasi data kesehatan real-time, serta perancangan antarmuka pengguna berbasis empati.',
    tools: [
      'Flutter',
      'UI/UX Design',
      'Figma',
      'IoT Connectivity',
      'Mobile Development',
    ],
    coverImage: chronotechCover,
    images: [chronotechCover],
    links: {
      live: '',
      github: '',
      caseStudy: '',
    },
    featured: true,
    published: true,
  },
  {
    id: 'skincure',
    title: 'SKINCURE',
    shortTitle: 'SKINCURE',
    titleLine2: 'EARLY SKIN HEALTH DETECTION',
    year: 2024,
    type: 'Bangkit Academy 2024 Capstone Project',
    categories: ['AI', 'Machine Learning', 'Mobile', 'UI/UX', 'HealthTech'],
    role: ['Machine Learning Developer', 'UI/UX Designer'],
    description:
      'Aplikasi mobile berbasis AI untuk deteksi awal dan edukasi kesehatan kulit wajah menggunakan model Convolutional Neural Network (CNN), dilengkapi fitur AI Skin Scan, chatbot asisten, dan rekomendasi perawatan personal.',
    responsibilities: [
      'Membangun model deteksi kondisi kulit wajah menggunakan arsitektur Convolutional Neural Network (CNN)',
      'Mengimplementasikan alur AI Skin Scan, visualisasi hasil deteksi, serta rekomendasi perawatan edukatif',
      'Mendesain antarmuka aplikasi mobile modern di Figma (layar beranda Megumin, chatbot asisten, riwayat, dan favorit)',
      'Melatih dan mengevaluasi model pada dataset gambar kondisi kulit wajah (Tim Capstone Bangkit C242)',
    ],
    impact:
      'Membantu pengguna memperoleh kesadaran dan edukasi awal tentang potensi kondisi kulit wajah melalui sistem deteksi mobile yang mudah digunakan.',
    learned:
      'Mendalami arsitektur CNN, persiapan dataset citra medis non-klinis, serta perancangan alur inferensi mobile yang ramah pengguna.',
    tools: [
      'Python',
      'TensorFlow / Keras',
      'CNN',
      'Google Colab',
      'Figma',
      'Android / Mobile UI Design',
    ],
    coverImage: skincureCover,
    images: [skincureCover],
    links: {
      live: '',
      github: '',
      caseStudy: '',
    },
    featured: true,
    published: true,
  },
  {
    id: 'planet-card',
    title: 'PLANET CARD',
    shortTitle: 'PLANET CARD',
    titleLine2: 'EDUCATIONAL GAME',
    year: 2025,
    type: 'Group Project / Final Semester Project',
    categories: ['Game', 'Unity', 'Education'],
    role: ['Unity Game Developer'],
    description:
      'Planet Card Educational Game adalah game edukasi interaktif berbasis Unity yang memanfaatkan mekanik drag-and-drop kartu untuk membantu siswa mengenal, mencocokkan, dan mempelajari karakteristik planet di tata surya.',
    responsibilities: [
      'Merancang tata letak UI dan hierarki visual elemen game edukasi',
      'Mengembangkan alur alur permainan (gameplay flow) dan mekanik drag-and-drop interaktif',
      'Melakukan manajemen dan penempatan aset grafis tata surya di dalam engine Unity',
      'Menguji dan mengoptimalkan responsivitas mekanik drag-and-drop untuk pengalaman belajar yang menyenangkan',
    ],
    impact:
      'Menyajikan media pembelajaran interaktif yang membantu siswa memahami informasi astronomi planet melalui mekanik permainan yang menyenangkan.',
    learned:
      'Menguasai dasar game development Unity, perancangan interaksi drag-and-drop yang intuitif, serta penyeimbangan tujuan edukatif dengan unsur permainan.',
    tools: [
      'Unity',
      'C#',
      'Drag-and-Drop Mechanics',
      'Educational Game Design',
    ],
    coverImage: planetCover,
    images: [planetCover],
    links: {
      live: '',
      github: '',
      caseStudy: '',
    },
    featured: true,
    published: true,
  },
];

// Helper functions for consumption across components & routes
export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published !== false);
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(
    (p) =>
      p.id === id ||
      (id === 'chronotech' && p.id === 'elogul') ||
      (id === 'elogul' && p.id === 'chronotech')
  );
}

export function getAllCategories(
  projectList: Project[] = getPublishedProjects()
): string[] {
  const categorySet = new Set<string>();
  categorySet.add('ALL');

  projectList.forEach((p) => {
    p.categories.forEach((cat) => {
      categorySet.add(cat);
    });
  });

  return Array.from(categorySet);
}
