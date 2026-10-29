"use client";

import React, { useState, useMemo } from "react";
import FlatIcon from "./FlatIcon";

export interface PathStep {
  stepNumber: number;
  title: string;
  durationHours: number;
  level: "Pemula" | "Menengah" | "Mahir" | "Profesional";
  type: "Gratis" | "Premium";
  description: string;
}

export interface LearningPathGroup {
  id: string;
  roleTitle: string;
  badge: string;
  badgeColor: string;
  category: "AI & Data Science" | "Software Engineering" | "Cloud & Security" | "Mobile Development";
  careerGoal: string;
  overview: string;
  targetSalary: string;
  totalCourses: number;
  totalHours: number;
  enrolledStudents: number;
  skills: string[];
  image: string;
  steps: PathStep[];
}

const LEARNING_PATHS: LearningPathGroup[] = [
  {
    id: "lp-ai-engineer",
    roleTitle: "AI Engineer",
    badge: "Most Popular",
    badgeColor: "#10B981",
    category: "AI & Data Science",
    image: "/paths/ai-engineer.jpg",
    careerGoal: "Sebagai AI Engineer yang menguasai seluruh lifecycle machine learning: eksplorasi data komputasi numerik, pelatihan arsitektur neural networks dengan PyTorch, fine-tuning LLM, teknik RAG (Retrieval Augmented Generation), dan serving model berkinerja tinggi di cloud.",
    overview: "Alur belajar komprehensif untuk menjadi praktisi AI Engineer profesional berstandar industri. Lulusan dipersiapkan merancang arsitektur kecerdasan buatan, deep learning, dan integrasi LLM skala produksi.",
    targetSalary: "Rp 16.000.000 - Rp 32.000.000 / bln",
    totalCourses: 6,
    totalHours: 350,
    enrolledStudents: 246200,
    skills: ["Python", "PyTorch", "Scikit-Learn", "Deep Learning", "CNN/RNN", "Transformer", "FastAPI"],
    steps: [
      {
        stepNumber: 1,
        title: "Belajar Dasar AI & Etika Kecerdasan Buatan",
        durationHours: 10,
        level: "Pemula",
        type: "Gratis",
        description: "Fondasi esensial kecerdasan buatan: Narrow vs General AI, machine learning vs deep learning, serta tata kelola etika AI standar global.",
      },
      {
        stepNumber: 2,
        title: "Memulai Pemrograman dengan Python & Manipulasi Data",
        durationHours: 60,
        level: "Pemula",
        type: "Gratis",
        description: "Sintaks Python 3.12 modern, struktur data, kontrol alur logika, OOP, manipulasi array multidimensi NumPy, dan dataframe Pandas.",
      },
      {
        stepNumber: 3,
        title: "Belajar Machine Learning untuk Pemula",
        durationHours: 90,
        level: "Pemula",
        type: "Premium",
        description: "Supervised learning (regresi & klasifikasi), unsupervised clustering, evaluasi matriks performa model, dan submission dataset nyata.",
      },
      {
        stepNumber: 4,
        title: "Belajar Fundamental Deep Learning dengan TensorFlow & PyTorch",
        durationHours: 110,
        level: "Menengah",
        type: "Premium",
        description: "Artificial Neural Networks (ANN), backpropagation matematis, Convolutional Neural Networks (CNN) untuk citra, dan RNN/LSTM untuk teks.",
      },
      {
        stepNumber: 5,
        title: "Machine Learning Terapan Skala Industri",
        durationHours: 80,
        level: "Mahir",
        type: "Premium",
        description: "End-to-end machine learning pada studi kasus industri: recommendation system, deteksi anomali, dan feature engineering pipeline.",
      },
      {
        stepNumber: 6,
        title: "Membangun Proyek Deep Learning Tingkat Mahir & Model Serving",
        durationHours: 90,
        level: "Mahir",
        type: "Premium",
        description: "Transformer architecture, Attention Mechanism, fine-tuning LLM, akselerasi ONNX runtime, serta serving REST API menggunakan FastAPI & Docker.",
      },
    ],
  },
  {
    id: "lp-data-scientist",
    roleTitle: "Data Scientist",
    badge: "High Demand",
    badgeColor: "#06B6D4",
    category: "AI & Data Science",
    image: "/paths/data-science.jpg",
    careerGoal: "Sebagai Data Scientist yang mahir analisis statistik lanjutan, visualisasi wawasan bisnis strategis, predictive modeling, machine learning pipelines, dan pengujian hipotesis berbasis data skala besar.",
    overview: "Kuasai seni mengubah raw data menjadi keputusan bisnis bernilai tinggi melalui statistika inferensial, eksplorasi data mendalam, dan predictive analytics.",
    targetSalary: "Rp 15.000.000 - Rp 28.000.000 / bln",
    totalCourses: 5,
    totalHours: 240,
    enrolledStudents: 184500,
    skills: ["Python", "Pandas", "Statistical Modeling", "Feature Engineering", "Data Viz", "SQL", "A/B Testing"],
    steps: [
      {
        stepNumber: 1,
        title: "Memulai Pemrograman dengan Python untuk Data Science",
        durationHours: 60,
        level: "Pemula",
        type: "Gratis",
        description: "Penguasaan dasar komputasi data saintifik dengan Python, manipulasi matriks, dan penanganan missing values.",
      },
      {
        stepNumber: 2,
        title: "Belajar Dasar Visualisasi Data & Storytelling",
        durationHours: 25,
        level: "Pemula",
        type: "Gratis",
        description: "Membuat visualisasi data interaktif menggunakan Matplotlib, Seaborn, dan dashboard analitik untuk komunikasi stakeholder.",
      },
      {
        stepNumber: 3,
        title: "Belajar Analisis Data dengan Python & SQL Lanjutan",
        durationHours: 50,
        level: "Menengah",
        type: "Premium",
        description: "Query database relasional kompleks, teknik data aggregation, transformasi data terstruktur, dan analisa tren pasar.",
      },
      {
        stepNumber: 4,
        title: "Belajar Penerapan Machine Learning untuk Predictive Modeling",
        durationHours: 65,
        level: "Menengah",
        type: "Premium",
        description: "Pemodelan prediktif klasifikasi dan regresi untuk churn prediction, lead scoring, serta segmentasi pelanggan RFM.",
      },
      {
        stepNumber: 5,
        title: "Menjadi Data Scientist Profesional & Capstone Portofolio",
        durationHours: 70,
        level: "Mahir",
        type: "Premium",
        description: "Proyek capstone analisis data end-to-end yang diuji langsung oleh dewan reviewer kurikulum dengan SLA review ketat.",
      },
    ],
  },
  {
    id: "lp-gen-ai",
    roleTitle: "Gen AI Engineer",
    badge: "Emerging Tech",
    badgeColor: "#8B5CF6",
    category: "AI & Data Science",
    image: "/paths/gen-ai.jpg",
    careerGoal: "Sebagai Generative AI Engineer yang merancang sistem LLM mutakhir, Prompt Engineering terstruktur, arsitektur RAG enterprise berbasis vector database, fine-tuning open-source LLM, dan orchestrasi autonomous multi-agent systems.",
    overview: "Kurikulum terdepan yang dirancang khusus untuk memenuhi lonjakan kebutuhan industri akan arsitek Generative AI, asisten penalaran enterprise, dan autonomous agent.",
    targetSalary: "Rp 18.000.000 - Rp 35.000.000 / bln",
    totalCourses: 5,
    totalHours: 280,
    enrolledStudents: 142000,
    skills: ["Generative AI", "LangChain", "Vector DB (Chroma/Pinecone)", "RAG", "Llama/Mistral", "Autonomous Agents"],
    steps: [
      {
        stepNumber: 1,
        title: "Dasar Generative AI, Tokenisasi & Large Language Models",
        durationHours: 30,
        level: "Pemula",
        type: "Gratis",
        description: "Memahami cara kerja Transformer, attention mechanism, token embedding, temperature, top_p, dan parameter decoding LLM.",
      },
      {
        stepNumber: 2,
        title: "Advanced Prompt Engineering & Structured JSON Outputs",
        durationHours: 35,
        level: "Menengah",
        type: "Gratis",
        description: "Teknik Few-Shot, Chain-of-Thought (CoT), ReAct prompting, function calling, dan integrasi skema JSON presisi.",
      },
      {
        stepNumber: 3,
        title: "Enterprise RAG Architecture & Vector Indexing",
        durationHours: 65,
        level: "Menengah",
        type: "Premium",
        description: "Membangun sistem Retrieval-Augmented Generation: document chunking, semantic vector embeddings, hybrid search, dan reranking.",
      },
      {
        stepNumber: 4,
        title: "Fine-Tuning Open Source LLM & Parameter-Efficient LoRA/QLoRA",
        durationHours: 75,
        level: "Mahir",
        type: "Premium",
        description: "Fine-tuning model open-source (Llama 3, Mistral) dengan dataset domain privat, optimasi memori 4-bit, dan quantisasi GGUF.",
      },
      {
        stepNumber: 5,
        title: "Multi-Agent Systems & Autonomous Reasoning Pipelines",
        durationHours: 75,
        level: "Profesional",
        type: "Premium",
        description: "Mengorkestrasi multi-agent AI kolaboratif dengan memory persistence, tool execution, dan automated eval framework.",
      },
    ],
  },
  {
    id: "lp-mlops",
    roleTitle: "MLOps Engineer",
    badge: "Critical Role",
    badgeColor: "#F59E0B",
    category: "AI & Data Science",
    image: "/paths/mlops.jpg",
    careerGoal: "Sebagai MLOps Engineer yang menjembatani machine learning research dan sistem software engineering produksi, mengotomasi CI/CD for ML, feature store, data drift monitoring, automated retraining, dan serving model skala jutaan request.",
    overview: "Pahami otomasi deployment model kecerdasan buatan, validasi performa berulang, monitoring latency inferensi, dan orkestrasi kluster produksi.",
    targetSalary: "Rp 17.000.000 - Rp 33.000.000 / bln",
    totalCourses: 5,
    totalHours: 250,
    enrolledStudents: 98400,
    skills: ["MLflow", "Docker", "Kubernetes", "KubeFlow", "CI/CD Pipeline", "Data Drift", "FastAPI Serving"],
    steps: [
      {
        stepNumber: 1,
        title: "Fondasi Software Engineering untuk Praktisi ML",
        durationHours: 35,
        level: "Pemula",
        type: "Gratis",
        description: "Best practices clean code, modularisasi arsitektur kode ML, Git workflow, dan unit testing pipeline data.",
      },
      {
        stepNumber: 2,
        title: "Containerization Model ML dengan Docker & FastAPI",
        durationHours: 45,
        level: "Menengah",
        type: "Gratis",
        description: "Membungkus model inference ke dalam lightweight container Docker, multi-stage builds, dan async REST API endpoints.",
      },
      {
        stepNumber: 3,
        title: "Pipeline CI/CD Otomatis untuk ML dengan GitHub Actions",
        durationHours: 50,
        level: "Menengah",
        type: "Premium",
        description: "Otomasi testing integritas model, security check, automated linting, dan trigger build container otomatis saat PR dimerge.",
      },
      {
        stepNumber: 4,
        title: "Model Tracking, Experiment Logging & Registry dengan MLflow",
        durationHours: 55,
        level: "Mahir",
        type: "Premium",
        description: "Pelacakan hyperparameter, versioning bobot model, model lineage tracking, dan transisi lifecycle staging ke production.",
      },
      {
        stepNumber: 5,
        title: "Monitoring Drift, Retraining Otomatis & Kubernetes Deployment",
        durationHours: 65,
        level: "Profesional",
        type: "Premium",
        description: "Deteksi concept drift dan data drift pada live traffic, auto-retraining pipeline, dan deployment auto-scaling di Kubernetes cluster.",
      },
    ],
  },
  {
    id: "lp-fullstack-ai",
    roleTitle: "Fullstack Web & AI Systems Architect",
    badge: "Enterprise Grade",
    badgeColor: "#3B82F6",
    category: "Software Engineering",
    image: "/paths/fullstack.jpg",
    careerGoal: "Sebagai Software Engineer & System Architect yang mampu merancang dan mendeploy aplikasi web modern skala enterprise dari nol hingga produksi, terintegrasi penuh dengan model inference AI, in-browser container, dan arsitektur database terdistribusi berkecepatan tinggi.",
    overview: "Jalur belajar terlengkap yang memadukan arsitektur web modern Next.js 15+, TypeScript rigorous type, backend microservices, caching terdistribusi Redis, dan kapabilitas AI generatif mutakhir.",
    targetSalary: "Rp 18.000.000 - Rp 35.000.000 / bln",
    totalCourses: 5,
    totalHours: 180,
    enrolledStudents: 142500,
    skills: ["Next.js 15+", "TypeScript", "PostgreSQL", "Redis", "GenAI Inference", "WebContainers", "Microservices"],
    steps: [
      {
        stepNumber: 1,
        title: "Fondasi Arsitektur Web, HTML5 Semantics & Modern CSS",
        durationHours: 30,
        level: "Pemula",
        type: "Gratis",
        description: "Membangun pemahaman mendalam tentang standar W3C, DOM tree, aksesibilitas WAI-ARIA, serta tata letak modern CSS Grid & Flexbox.",
      },
      {
        stepNumber: 2,
        title: "Modern JavaScript (ES2024) & TypeScript Rigorous Types",
        durationHours: 35,
        level: "Pemula",
        type: "Gratis",
        description: "Kuasai ekosistem TypeScript end-to-end, asynchronous programming, functional programming patterns, dan static type safety.",
      },
      {
        stepNumber: 3,
        title: "Next.js 15+ App Router, React Server Components & Server Actions",
        durationHours: 40,
        level: "Menengah",
        type: "Premium",
        description: "Arsitektur frontend modern dengan dynamic routing, streaming SSR, Suspense boundary, dan integrasi backend tanpa overhead API REST manual.",
      },
      {
        stepNumber: 4,
        title: "Backend Microservices, Redis Caching & PostgreSQL Audit Security",
        durationHours: 40,
        level: "Mahir",
        type: "Premium",
        description: "Merancang database relasional berkinerja tinggi, index tuning, locking transaction ACID, dan distributed task queue.",
      },
      {
        stepNumber: 5,
        title: "In-Browser Cloud Containers & Socratic AI Copilot Playground",
        durationHours: 35,
        level: "Profesional",
        type: "Premium",
        description: "Menghubungkan WebContainers in-browser, eksekusi kode terisolasi, dan asisten penalaran AI berbasis konteks kurikulum.",
      },
    ],
  },
  {
    id: "lp-devops-cloud",
    roleTitle: "Cloud Solutions Architect & DevOps Engineer",
    badge: "Enterprise Ready",
    badgeColor: "#0EA5E9",
    category: "Cloud & Security",
    image: "/paths/devops.jpg",
    careerGoal: "Sebagai Cloud Engineer & SRE (Site Reliability Engineer) yang bertanggung jawab atas ketersediaan infrastruktur 99.99%, otomatisasi pipeline CI/CD zero-downtime, orkestrasi ribuan container Kubernetes, serta pengamanan arsitektur cloud sesuai standar ISO 27001.",
    overview: "Dirancang bersama praktisi enterprise untuk membekali Anda keahlian otomasi cloud modern, GitOps, Kubernetes kluster, dan Infrastructure as Code.",
    targetSalary: "Rp 17.000.000 - Rp 34.000.000 / bln",
    totalCourses: 5,
    totalHours: 175,
    enrolledStudents: 84000,
    skills: ["Linux CLI", "Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Prometheus"],
    steps: [
      {
        stepNumber: 1,
        title: "Linux System Administration & Automated Shell Scripting",
        durationHours: 25,
        level: "Pemula",
        type: "Gratis",
        description: "Penguasaan terminal Linux, manajemen hak akses, network socket monitoring, dan bash automation.",
      },
      {
        stepNumber: 2,
        title: "Containerization dengan Docker & Keamanan Image Multi-Stage",
        durationHours: 30,
        level: "Menengah",
        type: "Gratis",
        description: "Packaging aplikasi ke dalam container ringan, isolasi proses, layer caching, dan pemindaian kerentanan image.",
      },
      {
        stepNumber: 3,
        title: "Kubernetes Cluster Management, Pod Scheduling & Helm Charts",
        durationHours: 45,
        level: "Mahir",
        type: "Premium",
        description: "Deployment microservices skala besar di kluster Kubernetes, Ingress routing, auto-scaling HPA, dan persistent volume.",
      },
      {
        stepNumber: 4,
        title: "Infrastructure as Code (IaC) dengan Terraform di Amazon Web Services",
        durationHours: 40,
        level: "Mahir",
        type: "Premium",
        description: "Mendefinisikan arsitektur VPC, subnet, load balancer, dan database multi-AZ secara deklaratif via kode Terraform.",
      },
      {
        stepNumber: 5,
        title: "Automated Enterprise CI/CD Pipeline & Site Reliability Engineering",
        durationHours: 35,
        level: "Profesional",
        type: "Premium",
        description: "Otomasi testing, blue-green deployment, pemantauan metrik Prometheus & Grafana, serta penanganan insiden otomatis.",
      },
    ],
  },
  {
    id: "lp-cyber-security",
    roleTitle: "Cyber Defense Specialist & Security Engineer",
    badge: "Critical Role",
    badgeColor: "#EF4444",
    category: "Cloud & Security",
    image: "/paths/cybersecurity.jpg",
    careerGoal: "Sebagai Cybersecurity Analyst & Penetrasi Tester yang bertugas mendeteksi celah keamanan, mengamankan pipeline DevSecOps, menangkal serangan siber DDoS dan injeksi kode, serta merumuskan protokol tanggap insiden (Incident Response).",
    overview: "Pelajari metode pertahanan siber terstandar industri dari ethical hacking, audit OWASP Top 10, security governance cloud, hingga digital forensic.",
    targetSalary: "Rp 15.000.000 - Rp 30.000.000 / bln",
    totalCourses: 5,
    totalHours: 155,
    enrolledStudents: 61000,
    skills: ["Ethical Hacking", "OWASP Top 10", "Network Security", "Cloud IAM", "Cryptography", "DevSecOps"],
    steps: [
      {
        stepNumber: 1,
        title: "Fondasi Keamanan Jaringan, Protokol TCP/IP & Kriptografi",
        durationHours: 25,
        level: "Pemula",
        type: "Gratis",
        description: "Memahami model OSI, enkripsi simetrik & asimetrik, TLS/SSL handshake, dan analisis paket jaringan dengan Wireshark.",
      },
      {
        stepNumber: 2,
        title: "Web Application Security & Audit Mitigasi OWASP Top 10",
        durationHours: 35,
        level: "Menengah",
        type: "Gratis",
        description: "Eksplorasi kerentanan SQL Injection, XSS, CSRF, SSRF, broken authentication, dan perbaikan kode sumber secara aman.",
      },
      {
        stepNumber: 3,
        title: "Ethical Hacking, Penetration Testing & Vulnerability Assessment",
        durationHours: 35,
        level: "Mahir",
        type: "Premium",
        description: "Simulasi serangan legal menggunakan Kali Linux, Metasploit, Nmap, dan penyusunan laporan audit keamanan resmi.",
      },
      {
        stepNumber: 4,
        title: "Cloud Security Architecture & Hardening Kebijakan IAM",
        durationHours: 30,
        level: "Mahir",
        type: "Premium",
        description: "Penerapan prinsip least privilege, audit konfigurasi AWS GuardDuty, cloud storage security, dan secret rotation.",
      },
      {
        stepNumber: 5,
        title: "Automated DevSecOps Pipeline & Incident Response Forensics",
        durationHours: 30,
        level: "Profesional",
        type: "Premium",
        description: "Integrasi SAST & DAST di CI/CD runner, analisis log forensik pasca insiden, dan pemulihan sistem darurat.",
      },
    ],
  },
  {
    id: "lp-frontend-web",
    roleTitle: "Front-End Web Specialist",
    badge: "High Demand",
    badgeColor: "#10B981",
    category: "Software Engineering",
    image: "/paths/frontend.jpg",
    careerGoal: "Sebagai Front-End Engineer yang menguasai arsitektur antarmuka web modern, component design system, accessibility WAI-ARIA, state management reaktif, dan optimasi performa Core Web Vitals (LCP, INP, CLS).",
    overview: "Kuasai ekosistem antarmuka web interaktif dari fondasi HTML5/CSS modern hingga arsitektur aplikasi React skala enterprise.",
    targetSalary: "Rp 12.000.000 - Rp 24.000.000 / bln",
    totalCourses: 5,
    totalHours: 165,
    enrolledStudents: 178000,
    skills: ["HTML5/CSS3", "JavaScript ES6+", "React", "Next.js", "Tailwind/Vanilla CSS", "A11y", "Core Web Vitals"],
    steps: [
      {
        stepNumber: 1,
        title: "Dasar Pemrograman Web & HTML5 Semantics",
        durationHours: 35,
        level: "Pemula",
        type: "Gratis",
        description: "Struktur semantik HTML5, aksesibilitas screen reader WAI-ARIA, dan styling modern menggunakan CSS Flexbox & Grid.",
      },
      {
        stepNumber: 2,
        title: "Membuat Front-End Web untuk Pemula",
        durationHours: 40,
        level: "Pemula",
        type: "Gratis",
        description: "Manipulasi DOM dinamis dengan JavaScript native, event handling, storage browser, dan responsive design mobile-first.",
      },
      {
        stepNumber: 3,
        title: "Fundamental Front-End Web Development & API Fetch",
        durationHours: 45,
        level: "Menengah",
        type: "Premium",
        description: "Asynchronous JavaScript, Promise/async-await, REST API integration, modularisasi ES6 modules, dan Webpack build tools.",
      },
      {
        stepNumber: 4,
        title: "Membangun Aplikasi Web dengan React & State Management",
        durationHours: 45,
        level: "Mahir",
        type: "Premium",
        description: "Komponen berbasis fungsi, React Hooks (useState, useEffect, useMemo), Context API, dan navigasi single-page app.",
      },
      {
        stepNumber: 5,
        title: "Menjadi Front-End Web Developer Expert & Performance Audit",
        durationHours: 60,
        level: "Mahir",
        type: "Premium",
        description: "Progressive Web Apps (PWA), optimasi Core Web Vitals (LCP < 2.5s), code splitting, dan automated testing Jest.",
      },
    ],
  },
  {
    id: "lp-backend-dev",
    roleTitle: "Back-End Engineering Specialist",
    badge: "Enterprise Core",
    badgeColor: "#F59E0B",
    category: "Software Engineering",
    image: "/paths/backend.jpg",
    careerGoal: "Sebagai Back-End Developer yang membangun layanan API handal, database relasional terstruktur ACID, concurrency handling, caching strategi Redis, messaging queue Kafka/RabbitMQ, dan arsitektur microservices berskala tinggi.",
    overview: "Fokus pada arsitektur server-side berkecepatan tinggi, keamanan otentikasi JWT/OAuth2, integritas data relasional, dan microservices.",
    targetSalary: "Rp 14.000.000 - Rp 27.000.000 / bln",
    totalCourses: 5,
    totalHours: 170,
    enrolledStudents: 152000,
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "REST/gRPC", "Docker", "Microservices"],
    steps: [
      {
        stepNumber: 1,
        title: "Memulai Pemrograman dengan JavaScript & Node.js Runtime",
        durationHours: 40,
        level: "Pemula",
        type: "Gratis",
        description: "Arsitektur event loop Node.js, asynchronous I/O non-blocking, manipulasi modul file sistem, dan npm package management.",
      },
      {
        stepNumber: 2,
        title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
        durationHours: 45,
        level: "Pemula",
        type: "Gratis",
        description: "Membangun REST API pertama menggunakan framework Hapi/Express, routing dinamis, request validation, dan error handling.",
      },
      {
        stepNumber: 3,
        title: "Fundamental Aplikasi Back-End & Database Relasional PostgreSQL",
        durationHours: 45,
        level: "Menengah",
        type: "Premium",
        description: "Desain database 3NF, query join efisien, indexing strategy, transaction isolation levels, dan otentikasi JWT tokens.",
      },
      {
        stepNumber: 4,
        title: "Arsitektur Microservices, Redis Caching & Message Broker",
        durationHours: 40,
        level: "Mahir",
        type: "Premium",
        description: "Memecah monolit menjadi microservices, caching data hot di Redis, dan komunikasi asynchronous via RabbitMQ/Kafka.",
      },
      {
        stepNumber: 5,
        title: "Menjadi Back-End Developer Expert & Security Hardening",
        durationHours: 55,
        level: "Mahir",
        type: "Premium",
        description: "Rate limiting, perlindungan DoS, monitoring APM, database connection pooling, serta deployment container produksi.",
      },
    ],
  },
  {
    id: "lp-mobile-dev",
    roleTitle: "Multi-Platform Mobile App Developer",
    badge: "Mobile Specialist",
    badgeColor: "#6366F1",
    category: "Mobile Development",
    image: "/paths/mobile.jpg",
    careerGoal: "Sebagai Mobile App Developer yang mampu membangun aplikasi mobile iOS dan Android berskala produksi menggunakan Flutter dan React Native, mengintegrasikan offline storage, push notifications, dan performa 60 FPS yang halus.",
    overview: "Kuasai pembuatan aplikasi mobile modern untuk Android & iOS dengan satu basis kode menggunakan Dart & Flutter serta integrasi native device APIs.",
    targetSalary: "Rp 13.000.000 - Rp 26.000.000 / bln",
    totalCourses: 5,
    totalHours: 160,
    enrolledStudents: 114000,
    skills: ["Dart", "Flutter", "React Native", "REST API", "Local DB SQLite", "State Management (Bloc/Redux)"],
    steps: [
      {
        stepNumber: 1,
        title: "Memulai Pemrograman dengan Dart",
        durationHours: 30,
        level: "Pemula",
        type: "Gratis",
        description: "Sintaks bahasa Dart, Object-Oriented Programming (OOP), null safety, collection, dan asynchronous programming.",
      },
      {
        stepNumber: 2,
        title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
        durationHours: 40,
        level: "Pemula",
        type: "Gratis",
        description: "Widget tree Flutter, StatelessWidget vs StatefulWidget, tata letak antarmuka responsif, dan navigasi multi-layar.",
      },
      {
        stepNumber: 3,
        title: "Fundamental Aplikasi Flutter & Reactive State Management",
        durationHours: 45,
        level: "Menengah",
        type: "Premium",
        description: "Pola arsitektur BLoC / Provider, integrasi HTTP client, parsing JSON kompleks, dan penanganan status koneksi.",
      },
      {
        stepNumber: 4,
        title: "Integrasi Local Storage SQLite & Sensor Perangkat Native",
        durationHours: 40,
        level: "Mahir",
        type: "Premium",
        description: "Penyimpanan data lokal offline dengan SQLite/Hive, akses kamera & GPS, push notifications Firebase Cloud Messaging.",
      },
      {
        stepNumber: 5,
        title: "Menjadi Flutter Developer Expert & CI/CD Fastlane",
        durationHours: 55,
        level: "Mahir",
        type: "Premium",
        description: "Clean architecture modular, automated widget & integration testing, optimasi frame rate 60 FPS, dan rilis ke Google Play Store & Apple App Store.",
      },
    ],
  },
];

interface PortalLearningPathPageProps {
  onNavigateNav?: (navId: string) => void;
}

export default function PortalLearningPathPage({ onNavigateNav }: PortalLearningPathPageProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPathId, setExpandedPathId] = useState<string>("lp-ai-engineer");
  const [enrollToast, setEnrollToast] = useState<string | null>(null);

  const filteredPaths = useMemo(() => {
    return LEARNING_PATHS.filter((path) => {
      const matchRole = selectedRoleId === "all" || path.id === selectedRoleId;
      const matchSearch =
        searchQuery.trim() === "" ||
        path.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.careerGoal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchRole && matchSearch;
    });
  }, [selectedRoleId, searchQuery]);

  const handleStartPath = (path: LearningPathGroup) => {
    setEnrollToast(`Pendaftaran Learning Path "${path.roleTitle}" berhasil! Anda diarahkan ke Modul 1.`);
    setTimeout(() => setEnrollToast(null), 5000);
  };

  return (
    <div className="portal-content-fluid" style={{ paddingBottom: "100px" }}>
      {/* Toast Notification */}
      {enrollToast && (
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10B981",
            color: "#10B981",
            padding: "12px 18px",
            borderRadius: "8px",
            marginBottom: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FlatIcon type="check-circle" size={16} color="#10B981" />
            <span>{enrollToast}</span>
          </span>
          <button
            type="button"
            onClick={() => setEnrollToast(null)}
            style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer" }}
          >
            <FlatIcon type="close" size={14} color="#10B981" />
          </button>
        </div>
      )}

      {/* Header Halaman */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "var(--bx-ink-bright)",
            margin: "0 0 6px",
          }}
        >
          Learning Path (Jalur Belajar Karir)
        </h1>
        <p style={{ fontSize: "0.84375rem", color: "var(--bx-muted)", margin: 0, maxWidth: "780px", lineHeight: 1.5 }}>
          Kurikulum terstruktur yang dikelompokkan berdasarkan target profesi industri: ketahui <strong>sebagai apa</strong> Anda dipersiapkan dan <strong>urutan materi apa saja yang harus diambil</strong> dari tingkat pemula hingga tingkat mahir.
        </p>
      </div>

      {/* =========================================================================
          PILIHAN TARGET KARIR (SEBAGAI APA AJA - SAMA SEPERTI HALAMAN UTAMA)
          ========================================================================= */}
      <div
        className="portal-dash-card"
        style={{
          padding: "16px 20px",
          marginBottom: "24px",
          background: "var(--bx-surface)",
          border: "1px solid var(--bx-border)",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <span style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--gold)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              TARGET PROFESI INDUSTRI (SEBAGAI APA)
            </span>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--bx-ink-bright)", margin: "2px 0 0" }}>
              Pilih Target Profesi: Ingin Belajar Menjadi Sebagai Apa?
            </h2>
          </div>

          {/* Quick Search */}
          <div style={{ minWidth: "240px", flex: "0 1 320px" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari profesi, skill, atau kata kunci..."
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "0.8125rem",
                borderRadius: "6px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-bg)",
                color: "var(--bx-ink-bright)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Scrollable Track / Role Buttons ("Sebagai apa saja") */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "6px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Option: Semua Target Karier */}
          <button
            type="button"
            onClick={() => setSelectedRoleId("all")}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: selectedRoleId === "all" ? "1px solid var(--gold)" : "1px solid var(--bx-border)",
              background: selectedRoleId === "all" ? "rgba(201, 150, 46, 0.15)" : "var(--bx-bg)",
              color: selectedRoleId === "all" ? "var(--gold)" : "var(--bx-ink)",
              fontSize: "0.8125rem",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
          >
            <FlatIcon type="layers" size={13} color={selectedRoleId === "all" ? "var(--gold)" : "currentColor"} />
            <span>Semua Target Karier ({LEARNING_PATHS.length})</span>
          </button>

          {/* Role Choice Buttons */}
          {LEARNING_PATHS.map((path) => {
            const isSelected = selectedRoleId === path.id;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => {
                  setSelectedRoleId(path.id);
                  setExpandedPathId(path.id);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: isSelected ? `1px solid ${path.badgeColor}` : "1px solid var(--bx-border)",
                  background: isSelected ? `${path.badgeColor}18` : "var(--bx-bg)",
                  color: isSelected ? path.badgeColor : "var(--bx-ink)",
                  fontSize: "0.8125rem",
                  fontWeight: isSelected ? 800 : 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
              >
                <span>Sebagai {path.roleTitle}</span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    padding: "1px 5px",
                    borderRadius: "4px",
                    background: isSelected ? path.badgeColor : "var(--bx-surface)",
                    color: isSelected ? "#FFFFFF" : "var(--bx-muted)",
                    fontWeight: 700,
                  }}
                >
                  {path.totalCourses} Kelas
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER ACTIVE STATUS NOTICE (If filtered) */}
      {selectedRoleId !== "all" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(201, 150, 46, 0.08)",
            border: "1px solid rgba(201, 150, 46, 0.25)",
            padding: "8px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "var(--bx-ink-bright)" }}>
            Menampilkan kurikulum terfokus untuk target profesi: <strong style={{ color: "var(--gold)" }}>Sebagai {LEARNING_PATHS.find(p => p.id === selectedRoleId)?.roleTitle}</strong>
          </span>
          <button
            type="button"
            onClick={() => setSelectedRoleId("all")}
            style={{
              background: "none",
              border: "none",
              color: "var(--gold)",
              fontSize: "0.78125rem",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Tampilkan Semua Target Karier ({LEARNING_PATHS.length})
          </button>
        </div>
      )}

      {/* LIST OF LEARNING PATH GROUPS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {filteredPaths.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", background: "var(--bx-surface)", borderRadius: "8px", border: "1px solid var(--bx-border)" }}>
            <p style={{ color: "var(--bx-muted)", fontSize: "0.875rem", margin: "0 0 12px" }}>
              Tidak ditemukan target karir yang sesuai dengan &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedRoleId("all");
              }}
              style={{
                background: "var(--gold)",
                color: "#0A0A0C",
                border: "none",
                padding: "8px 18px",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.8125rem",
                cursor: "pointer",
              }}
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          filteredPaths.map((path) => {
            const isExpanded = expandedPathId === path.id;

            return (
              <div
                key={path.id}
                className="portal-dash-card"
                style={{
                  padding: "24px",
                  border: isExpanded ? `1px solid ${path.badgeColor}` : "1px solid var(--bx-border)",
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                {/* Two Column Layout: Main Content + Card Image */}
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
                  {/* Left Main Content */}
                  <div style={{ flex: "1 1 500px", minWidth: 0 }}>
                    {/* Top Row: Path Title, Role, & Meta */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <FlatIcon type="layers" size={12} color="var(--bx-muted)" />
                            <span>{path.totalCourses} Kelas Kurikulum</span>
                          </span>

                          <span style={{ color: "var(--bx-border)" }}>·</span>

                          <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <FlatIcon type="clock" size={12} color="var(--bx-muted)" />
                            <span>{path.totalHours} Jam Belajar</span>
                          </span>

                          <span style={{ color: "var(--bx-border)" }}>·</span>

                          <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <FlatIcon type="users" size={12} color="var(--bx-muted)" />
                            <span>{path.enrolledStudents.toLocaleString("id-ID")} Siswa</span>
                          </span>

                          {/* Role Badge */}
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.6875rem",
                              fontWeight: 800,
                              color: path.badgeColor,
                              background: `${path.badgeColor}18`,
                              border: `1px solid ${path.badgeColor}40`,
                              padding: "2px 8px",
                              borderRadius: "4px",
                            }}
                          >
                            {path.badge.toUpperCase()}
                          </span>
                        </div>

                        <h2
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.375rem",
                            fontWeight: 800,
                            color: "var(--bx-ink-bright)",
                            margin: "0 0 6px",
                          }}
                        >
                          {path.roleTitle}
                        </h2>

                        <p style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", margin: 0, lineHeight: 1.5 }}>
                          {path.overview}
                        </p>
                      </div>
                    </div>

                    {/* TARGET KARIR: SEBAGAI APA */}
                    <div
                      style={{
                        background: "var(--bx-bg)",
                        border: "1px solid var(--bx-border)",
                        borderRadius: "8px",
                        padding: "14px 18px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ fontSize: "0.71875rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                        Fokus Peran Karir (Sebagai Apa):
                      </div>
                      <div style={{ fontSize: "0.84375rem", color: "var(--bx-ink-bright)", lineHeight: 1.55 }}>
                        {path.careerGoal}
                      </div>
                      <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                        Estimasi Rentang Penghasilan Industri: <strong style={{ color: "#10B981" }}>{path.targetSalary}</strong>
                      </div>
                    </div>

                    {/* Skills Tag List */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                      {path.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: "0.6875rem",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: "var(--bx-surface)",
                            border: "1px solid var(--bx-border)",
                            color: "var(--bx-ink)",
                          }}
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>

                    {/* Actions: Mulai Jalur Belajar & Toggle Roadmap */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => handleStartPath(path)}
                        style={{
                          background: "var(--gold)",
                          color: "#0A0A0C",
                          border: "none",
                          padding: "9px 18px",
                          borderRadius: "6px",
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 2px 8px rgba(201, 150, 46, 0.25)",
                        }}
                      >
                        <FlatIcon type="play" size={13} color="#0A0A0C" />
                        <span>Mulai Jalur Belajar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedPathId(isExpanded ? "" : path.id)}
                        style={{
                          background: "var(--bx-bg)",
                          border: "1px solid var(--bx-border)",
                          color: "var(--bx-ink-bright)",
                          padding: "9px 16px",
                          borderRadius: "6px",
                          fontSize: "0.8125rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{isExpanded ? "Tutup Roadmap" : "Lihat Urutan Materi"}</span>
                        <FlatIcon type={isExpanded ? "chevron-up" : "chevron-down"} size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Right Card Image: Visual Learning Path */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "200px",
                      height: "170px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid var(--bx-border)",
                      position: "relative",
                      background: "#0d1017",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    <img
                      src={path.image}
                      alt={path.roleTitle}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        left: "8px",
                        background: "rgba(10, 10, 12, 0.85)",
                        backdropFilter: "blur(6px)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.625rem",
                        fontWeight: 800,
                        color: path.badgeColor,
                        border: `1px solid ${path.badgeColor}40`,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {path.category}
                    </div>
                  </div>
                </div>

                {/* EXPANDABLE SECTION: MATERI APA SAJA YANG HARUS DIAMBIL */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid var(--bx-border)", paddingTop: "20px", marginTop: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ fontSize: "0.78125rem", fontWeight: 800, color: "var(--bx-ink-bright)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Urutan Materi &amp; Kelas yang Harus Diambil:
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--bx-muted)" }}>
                        {path.steps.length} Tahap Pembelajaran Terstruktur
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {path.steps.map((step) => (
                        <div
                          key={step.stepNumber}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "14px",
                            padding: "12px 16px",
                            background: "var(--bx-bg)",
                            border: "1px solid var(--bx-border)",
                            borderRadius: "6px",
                          }}
                        >
                          {/* Step Number Circle */}
                          <div
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              background: "rgba(201, 150, 46, 0.12)",
                              border: "1px solid rgba(201, 150, 46, 0.35)",
                              color: "var(--gold)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.8125rem",
                              flexShrink: 0,
                            }}
                          >
                            {step.stepNumber}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
                              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--bx-ink-bright)" }}>
                                {step.title}
                              </span>

                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <span style={{ fontSize: "0.6875rem", color: "var(--bx-muted)" }}>
                                  {step.durationHours} Jam
                                </span>
                                {step.type === "Gratis" ? (
                                  <span title="Materi Terbuka / Gratis" style={{ display: "inline-flex", alignItems: "center" }}>
                                    <FlatIcon type="check-circle" size={14} color="#10B981" />
                                  </span>
                                ) : (
                                  <span title="Materi Terkunci" style={{ display: "inline-flex", alignItems: "center" }}>
                                    <FlatIcon type="lock" size={13} color="#EF4444" />
                                  </span>
                                )}
                              </div>
                            </div>

                            <p style={{ fontSize: "0.78125rem", color: "var(--bx-muted)", margin: 0, lineHeight: 1.45 }}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* STICKY FOOTER NAVIGATION (DI SEBELAH KANAN/KONTEN, TIDAK MENUTUPI SIDEBAR) */}
      {/* ========================================================================= */}
      <div className="portal-courses-bottom-nav">
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Left Summary */}
          <div style={{ fontSize: "0.8125rem", color: "var(--bx-muted)", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: 700, color: "var(--bx-ink-bright)" }}>
              Menampilkan {filteredPaths.length} dari {LEARNING_PATHS.length} Learning Path Industri
            </span>
            {selectedRoleId !== "all" && (
              <span style={{ fontSize: "0.75rem", color: "var(--gold)" }}>
                (Filter Aktif)
              </span>
            )}
          </div>

          {/* Right Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={() => {
                setSelectedRoleId("all");
                setSearchQuery("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "5px",
                border: "1px solid var(--bx-border)",
                background: "var(--bx-surface)",
                color: "var(--bx-ink-bright)",
                fontSize: "0.78125rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Tampilkan Semua Target</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateNav && onNavigateNav("kelas")}
              style={{
                padding: "6px 14px",
                borderRadius: "5px",
                border: "1px solid var(--gold)",
                background: "var(--gold)",
                color: "#0A0A0C",
                fontSize: "0.78125rem",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Katalog Semua Kelas →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
