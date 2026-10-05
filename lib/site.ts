export const RESUME_URL = '/resume.pdf'

export const SITE = {
  name: 'Mahalakshmi S',
  title: 'AI & Data Science Student | Full-Stack Developer | AI/ML',
  location: 'Coimbatore, Tamil Nadu, India',
  email: 'mahalakshmi70867@gmail.com',
  github: 'https://github.com/mahalakshmi2007-dot',
  linkedin: 'https://www.linkedin.com/in/mahalakshmi-s-7aa78b36b/',
} as const

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export const SKILL_GROUPS = [
  { name: 'Programming', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'Frontend', items: ['HTML5', 'CSS3', 'React', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', items: ['FastAPI', 'REST APIs'] },
  { name: 'Database', items: ['SQLite', 'SQL'] },
  {
    name: 'AI / ML',
    items: [
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'TF-IDF',
      'Logistic Regression',
      'Linear Regression',
      'Isolation Forest',
    ],
  },
  {
    name: 'Data Analytics',
    items: ['Data Cleaning', 'Data Analysis', 'Statistics', 'Data Visualization'],
  },
  { name: 'Tools & Deployment', items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Render'] },
] as const

export const EXPERIENCE = [
  {
    role: 'Python Developer Intern',
    company: 'Alfido Tech',
    points: [
      'Gained practical experience in Python development and programming workflows.',
      'Worked on Python-based coding and problem-solving tasks.',
    ],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'CodeTech',
    points: [
      'Gained practical exposure to frontend and backend web development.',
      'Worked with web application development workflows and full-stack concepts.',
    ],
  },
] as const

export type ProjectLink = {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
}

export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string[]
  highlights?: { label: string; items: string[] }[]
  tech: string[]
  links: ProjectLink[]
  visual: 'expense' | 'route' | 'table'
}

export const PROJECTS: Project[] = [
  {
    id: 'spendwise',
    number: '01',
    title: 'SpendWise AI',
    category: 'AI-Powered Expense Management & Analytics',
    description: [
      'Developed a full-stack expense management application with expense tracking, budget monitoring, analytics, forecasting, and spending insights.',
    ],
    highlights: [
      {
        label: 'Features',
        items: [
          'Expense tracking',
          'Budget monitoring',
          'Analytics & spending insights',
          'ML-based category prediction',
          'Spending forecasting',
          'Anomaly detection',
        ],
      },
      {
        label: 'ML techniques',
        items: ['TF-IDF + Logistic Regression', 'Linear Regression', 'Isolation Forest'],
      },
    ],
    tech: ['React', 'FastAPI', 'Python', 'SQLite', 'Scikit-learn', 'Pandas'],
    links: [
      { label: 'Live Demo', href: 'https://spendwise-ai-lake.vercel.app/', variant: 'primary' },
      { label: 'GitHub Profile', href: SITE.github, variant: 'secondary' },
      { label: 'Backend API', href: 'https://spendwise-ai-daj4.onrender.com/', variant: 'ghost' },
    ],
    visual: 'expense',
  },
  {
    id: 'movemate',
    number: '02',
    title: 'MoveMate',
    category: 'Relocation Affordability & Decision Platform',
    description: [
      'Developed a web application to help users analyze the affordability of relocating for education or employment.',
      'Built a responsive frontend for entering relocation and financial information and presenting analysis in a user-friendly dashboard.',
      'Developed backend APIs using FastAPI to process user inputs and support application functionality.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python'],
    links: [
      {
        label: 'GitHub Repository',
        href: 'https://github.com/mahalakshmi2007-dot/movemate',
        variant: 'primary',
      },
    ],
    visual: 'route',
  },
  {
    id: 'sales-sql',
    number: '03',
    title: 'Customer Sales SQL Analysis',
    category: 'SQL · Data Analysis',
    description: [
      'Performed customer, product, and sales analysis using SQL queries.',
      'Used filtering, aggregation, grouping, and analytical queries to extract business insights from sales data.',
      'Organized SQL analysis into a structured project repository for reproducible data exploration.',
    ],
    tech: ['SQL', 'Data Analysis'],
    links: [],
    visual: 'table',
  },
]

export const CERTIFICATIONS = [
  { title: 'Cloud Computing', issuer: 'NPTEL' },
  { title: 'Internet of Things', issuer: 'NPTEL' },
  { title: 'Python', issuer: 'Infosys' },
  { title: 'Data Analytics', issuer: 'Infosys' },
] as const

export const EDUCATION = {
  institution: 'V.S.B College of Engineering & Technical Campus, Coimbatore',
  degree: 'B.Tech — Artificial Intelligence & Data Science',
  cgpa: 8.6,
} as const
