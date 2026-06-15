import React, { useState, useEffect } from "react";
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronDown, Terminal, Database, BrainCircuit, ExternalLink, ArrowRight, Code2, LineChart, Sparkles, Package, Monitor, Briefcase, Sun, Moon, Download, Eye, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

// Global Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const skillsData = [
  {
    category: "RPA & Automation",
    icon: <Code2 className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["UiPath (Studio & Orchestrator)", "VB.NET", "Python Scripting", "JavaScript"]
  },
  {
    category: "Web Development",
    icon: <BrainCircuit className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["React", "TypeScript (Vite)", "FastAPI", "PostgreSQL", "JWT Authentication", "Role-Based Access Control"]
  },
  {
    category: "Integration & APIs",
    icon: <LineChart className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["REST APIs", "Webhooks", "HubSpot", "Shopify", "Outlook & Email Automation", "Google Workspace"]
  },
  {
    category: "Data & Reporting",
    icon: <Package className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Excel VBA Macros", "Excel & Google Sheets Automation", "Power BI", "Data Extraction & Web Scraping"]
  },
  {
    category: "Compliance Systems",
    icon: <Monitor className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Saudization / Nitaqat Frameworks", "Audit Logging", "Predictive Simulation", "Quota & Threshold Modeling"]
  },
  {
    category: "Professional Methodologies",
    icon: <Briefcase className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Process Documentation", "Client Requirement Gathering", "Exception Handling & Error Logging", "Schedule Management"]
  }
];

const caseStudiesData = [
  {
    title: "Nitaqat Saudization Compliance Portal",
    category: "Full Stack Compliance System",
    description: "A full-stack web portal that helps Saudi Arabian companies track HR localization compliance, monitor profession-based quotas, and plan future hiring.",
    problem: "The client's Saudization tracking was managed through a fragile Excel-based tool with no access control, no audit trail, and no way to model the impact of future hiring decisions across 14 profession categories and 5 nationality-based quotas.",
    approach: "Built a React and TypeScript frontend with a Python FastAPI backend and PostgreSQL database. Designed role-based access (SuperAdmin, Admin, HR Manager) with JWT authentication, bcrypt password hashing, 90-day password expiry, and full audit logging of user activity.",
    outcome: "Delivered a production-ready portal with a Nationality Tracker, profession-based Saudization tracker, and a two-way predictive simulator that calculates permissible expat hiring based on Saudi additions and vice versa, aligned with official MHRSD and Qiwa thresholds.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "JWT Auth", "Nitaqat Compliance"],
    icon: <Monitor className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "Saudization Compliance Engine",
    category: "Backend Engineering",
    description: "The calculation core powering the Nitaqat portal — translating raw employee data into accurate compliance bands, quota gaps, and violation flags.",
    problem: "Saudization compliance is calculated across multiple overlapping layers — company-wide, department, profession, and nationality quotas — each with different thresholds, special cases, and government rule updates.",
    approach: "Migrated the data layer from SQLite to PostgreSQL using SQLAlchemy, fixed critical bugs in the Saudization formula, and added handling for GCC nationals, Ajeer workers, students, and other special-case categories with proper division-by-zero guards.",
    outcome: "Produced a reliable compliance engine that correctly classifies companies into Nitaqat bands (Platinum to Red), flags profession-specific shortfalls, and stays aligned with the latest MHRSD and Qiwa rule changes.",
    tags: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Compliance Logic"],
    icon: <Database className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "Business Visa Risk Scoring Automation",
    category: "Excel VBA Automation",
    description: "A multi-module Excel VBA system that automates visa risk scoring and recommends the correct visa category based on job title and applicant profile.",
    problem: "Visa risk assessment was a manual, repetitive process across five separate scoring modules, prone to inconsistency and slow turnaround for client-facing decisions.",
    approach: "Built five interconnected VBA scoring modules covering job title lookups, risk scoring logic, and recommendation rules. Added input validation, descriptive in-line documentation, and a results summary message box for quick review.",
    outcome: "Reduced manual scoring effort significantly and standardized recommendations across Business Visa, Assessment Required, and Temporary Work Permit categories, with file handling adapted for both local and OneDrive environments.",
    tags: ["Excel VBA", "Process Automation", "Risk Scoring", "Client Operations"],
    icon: <Terminal className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "Enterprise RPA Workflow Suite",
    category: "RPA Engineering",
    description: "End-to-end RPA solutions automating sales, logistics, and finance operations across multiple enterprise platforms.",
    problem: "Manual, repetitive workflows across HubSpot, Unleashed, Shopify, MachShip, and Google Workspace created bottlenecks and inconsistent data between systems.",
    approach: "Designed and deployed UiPath bots integrated via REST APIs and webhooks for real-time synchronization. Automated email-driven workflows with Outlook integration for ticket creation, LLM-based categorization, and CRM updates.",
    outcome: "Delivered scalable, maintainable automations with robust exception handling and Orchestrator scheduling, plus Power BI dashboards giving management live visibility into automation performance and KPIs.",
    tags: ["UiPath", "VB.NET", "Python", "API Integration", "Power BI"],
    icon: <BrainCircuit className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "University Admissions Virtual Assistant",
    category: "AI / ML Engineering",
    description: "An intelligent virtual assistant for university admissions, combining retrieval-augmented generation with real-time speech and a 3D avatar.",
    problem: "Prospective students needed a conversational, always-available way to get accurate answers about admissions without sifting through static university pages.",
    approach: "Built a RAG pipeline with a vector database for context-based responses, integrated real-time speech interaction, and connected outputs to Nvidia Audio2Face for a lifelike avatar experience.",
    outcome: "Delivered a working final year project demonstrating an end-to-end conversational system, combining Flask, Mistral 7B, and Nvidia Audio2Face into a single interactive experience.",
    tags: ["Flask", "Mistral 7B", "RAG", "Nvidia Audio2Face", "HTML/CSS/Bootstrap"],
    icon: <BrainCircuit className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "about", "experience", "skills", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -200 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showResume]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = ["About", "Experience", "Skills", "Projects", "Contact"];

  return (
    <div className="min-h-screen font-sans bg-brand-bg dark:bg-dark-bg transition-colors duration-500">
      
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 bg-noise" />
      <div className="fixed inset-0 z-0 bg-grid-pattern opacity-100" />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`fixed top-0 left-1/4 w-[800px] h-[800px] bg-brand-secondary/30 dark:bg-dark-secondary/20 blur-[150px] rounded-full pointer-events-none z-0 transition-all duration-700 ${showResume ? 'opacity-0 scale-90' : 'opacity-100'}`} 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className={`fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-primary/20 dark:bg-dark-primary/10 blur-[150px] rounded-full pointer-events-none z-0 transition-all duration-700 ${showResume ? 'opacity-0 scale-90' : 'opacity-100'}`} 
      />

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${showResume ? 'opacity-0 pointer-events-none' : scrolled ? 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-brand-primary/10 dark:border-dark-highlight/10 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollTo("home")} className="font-semibold text-xl tracking-tighter flex items-center gap-2 group">
            <Terminal className="w-5 h-5 text-brand-secondary dark:text-dark-secondary group-hover:text-brand-primary dark:group-hover:text-dark-primary transition-colors" />
            <span className="text-brand-primary dark:text-dark-primary transition-colors">Hamza<span className="text-brand-secondary dark:text-dark-secondary transition-colors">.</span></span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1 bg-white dark:bg-dark-bg border border-brand-primary/10 dark:border-dark-highlight/20 shadow-sm rounded-full px-2 py-1 backdrop-blur-md transition-colors duration-500">
              {navLinks.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(id)}
                    className={`relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${isActive ? 'text-white dark:text-dark-bg' : 'text-brand-accent dark:text-dark-accent hover:text-brand-primary dark:hover:text-dark-primary'}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-brand-secondary dark:bg-dark-secondary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white dark:bg-dark-surface border border-brand-primary/10 dark:border-dark-highlight/20 text-brand-accent dark:text-dark-accent hover:text-brand-secondary dark:hover:text-dark-secondary transition-colors duration-500 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative group">
              <button 
                onClick={() => setShowResume(true)}
                className="p-2 rounded-full bg-white dark:bg-dark-surface border border-brand-primary/10 dark:border-dark-highlight/20 text-brand-accent dark:text-dark-accent hover:text-brand-secondary dark:hover:text-dark-secondary transition-colors duration-500 shadow-sm flex items-center justify-center"
                aria-label="View Resume"
              >
                <Eye className="w-5 h-5" />
              </button>
              
              {/* Tooltip */}
              <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-brand-primary dark:bg-dark-surface text-white dark:text-dark-secondary text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-brand-primary/10 dark:border-dark-highlight/20">
                view resume
                <div className="absolute -top-1 right-3 w-2 h-2 bg-brand-primary dark:bg-dark-surface rotate-45 border-l border-t border-brand-primary/10 dark:border-dark-highlight/20" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className={`relative z-10 transition-all duration-500 ${showResume ? 'blur-sm grayscale-[0.2] opacity-50' : ''}`}>
        
        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={childVariants} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-surface border border-brand-primary/10 dark:border-dark-highlight/20 text-brand-primary dark:text-dark-primary text-sm font-medium shadow-sm transition-colors duration-500">
              <Sparkles className="w-4 h-4 text-brand-secondary dark:text-dark-secondary" />
              <span>Available for new opportunities</span>
            </motion.div>
            
            <motion.h1 variants={childVariants} className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[1.1] text-brand-primary dark:text-dark-primary transition-colors duration-500">
              Hi I'm Hamza Bin Kashif <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary dark:from-dark-secondary dark:to-dark-primary">
                RPA Developer | Full Stack
              </span>
            </motion.h1>

            <motion.p variants={childVariants} className="text-lg md:text-xl text-brand-accent dark:text-dark-accent max-w-2xl mx-auto mb-10 leading-relaxed font-light transition-colors duration-500">
              Bridging the gap between repetitive workflows and intelligent systems. I build automation pipelines and full-stack platforms that turn manual processes into reliable, scalable solutions.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-4">
              <button onClick={() => scrollTo("projects")} className="group relative px-8 py-3.5 rounded-xl bg-brand-primary dark:bg-dark-secondary text-white dark:text-[#101E2C] font-medium overflow-hidden transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  View Case Studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-brand-secondary dark:bg-white opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity" />
              </button>
              <button onClick={() => scrollTo("contact")} className="px-8 py-3.5 rounded-xl bg-white dark:bg-dark-surface border border-brand-primary/10 dark:border-dark-highlight/20 text-brand-primary dark:text-dark-primary font-medium transition-all shadow-sm hover:shadow-md hover:border-brand-primary/20 dark:hover:border-dark-highlight/40 active:scale-[0.98]">
                Get in Touch
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 animate-bounce cursor-pointer text-brand-accent dark:text-dark-accent hover:text-brand-secondary dark:hover:text-dark-secondary transition-colors p-4"
            onClick={() => scrollTo("about")}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </section>

        {/* SECTION DIVIDER UTILITY */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/10 dark:via-dark-highlight/20 to-transparent transition-colors duration-500" />

        {/* ABOUT */}
        <section id="about" className="py-32 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-16">
              <span className="text-brand-secondary dark:text-dark-secondary font-mono text-sm tracking-wider transition-colors duration-500">01.</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-dark-primary tracking-tight transition-colors duration-500">About Me</h2>
              <div className="h-px bg-brand-primary/10 dark:bg-dark-highlight/20 flex-1 ml-4 hidden md:block transition-colors duration-500"></div>
            </div>

            <div className="space-y-6 text-xl text-brand-accent dark:text-dark-accent leading-relaxed font-light transition-colors duration-500 pl-16 max-w-4xl">
              <p>
                I am passionate about turning manual processes into intelligent systems.
              </p>
              <p>
                With expertise spanning RPA development, full-stack web applications, and API integrations, I build solutions that solve real operational problems. Whether automating end-to-end workflows in UiPath, building a compliance portal in React and FastAPI, or designing Excel-based decision tools, I work at the intersection of automation engineering and practical business needs.
              </p>
              <p className="text-brand-primary dark:text-dark-primary font-medium transition-colors duration-500">
                My core objective is to build reliable, maintainable systems that give organizations back their time and confidence in their data.
              </p>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-32 px-6 bg-white/50 dark:bg-dark-surface/30 transition-colors duration-500">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-16">
              <span className="text-brand-secondary dark:text-dark-secondary font-mono text-sm tracking-wider transition-colors duration-500">02.</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-dark-primary tracking-tight transition-colors duration-500">Professional Experience</h2>
              <div className="h-px bg-brand-primary/10 dark:bg-dark-highlight/20 flex-1 ml-4 hidden md:block transition-colors duration-500"></div>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-brand-primary/10 dark:before:via-dark-highlight/30 before:to-transparent">
              
              {/* Job 1 */}
              <motion.div variants={childVariants} className="relative flex flex-col group pl-16">
                <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-brand-bg dark:border-dark-bg bg-brand-secondary/10 dark:bg-dark-surface text-brand-secondary dark:text-dark-secondary z-10 transition-colors group-hover:bg-brand-secondary dark:group-hover:bg-dark-secondary group-hover:text-white dark:group-hover:text-dark-bg group-hover:shadow-md">
                  <Database className="w-4 h-4" />
                </div>
                
                <div className="w-full glass-card p-8 group-hover:border-brand-secondary/30 dark:group-hover:border-dark-secondary/50 transition-colors">
                   <p className="text-brand-secondary dark:text-dark-secondary font-mono text-base mb-2 transition-colors duration-500">Feb 2026 — Present</p>
                  <h3 className="font-bold text-2xl text-brand-primary dark:text-dark-primary mb-1 transition-colors duration-500">Full Stack Developer / RPA Developer</h3>
                  <p className="text-brand-primary dark:text-dark-primary font-medium mb-6 transition-colors duration-500">Fragomen</p>
                   <ul className="space-y-3 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                    <li>Developed the Nitaqat Saudization Compliance Portal, a full-stack web application for tracking Saudi Arabian HR localization compliance, using React, TypeScript (Vite), Python FastAPI, and PostgreSQL (Neon).</li>
                    <li>Built a profession-based Saudization tracker covering 14 profession categories and 5 nationality-based quota restrictions, including a Nationality Tracker module providing complete nationality-wise headcount breakdowns and visualizations.</li>
                    <li>Implemented a two-way predictive compliance simulator allowing users to calculate permissible expat hiring based on Saudi national additions and vice versa, aligned with official MHRSD and Qiwa Nitaqat thresholds.</li>
                    <li>Designed role-based access control (SuperAdmin, Admin, HR Manager) with JWT authentication, bcrypt password hashing, 90-day password expiration, and full audit logging of user activity.</li>
                    <li>Engineered the backend compliance engine in Python, migrating from SQLite to PostgreSQL and fixing critical Saudization formula logic, including GCC national, Ajeer worker, and special-case headcount handling.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Job 2 */}
              <motion.div variants={childVariants} className="relative flex flex-col group pl-16">
                <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-brand-bg dark:border-dark-bg bg-brand-secondary/10 dark:bg-dark-surface text-brand-secondary dark:text-dark-secondary z-10 transition-colors group-hover:bg-brand-secondary dark:group-hover:bg-dark-secondary group-hover:text-white dark:group-hover:text-dark-bg group-hover:shadow-md">
                  <Terminal className="w-4 h-4" />
                </div>
                
                <div className="w-full glass-card p-8 group-hover:border-brand-secondary/30 dark:group-hover:border-dark-secondary/50 transition-colors">
                   <p className="text-brand-secondary dark:text-dark-secondary font-mono text-base mb-2 transition-colors duration-500">Oct 2024 — Jan 2026</p>
                  <h3 className="font-bold text-2xl text-brand-primary dark:text-dark-primary mb-1 transition-colors duration-500">RPA Developer</h3>
                  <p className="text-brand-primary dark:text-dark-primary font-medium mb-6 transition-colors duration-500">Sybros Tech</p>
                  
                  <div className="mb-4">
                    <h4 className="text-brand-primary dark:text-dark-primary text-sm font-semibold mb-2 flex items-center gap-2 transition-colors duration-500"><Sparkles className="w-3 h-3 text-brand-secondary dark:text-dark-secondary"/> Enterprise RPA Workflows</h4>
                     <ul className="space-y-2 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                      <li>Designed, developed, and deployed end-to-end RPA solutions using UiPath, driving efficiency across sales, logistics, and finance operations.</li>
                      <li>Integrated automations with HubSpot, Unleashed, Shopify, MachShip, and Google Workspace via REST APIs and webhooks for real-time data synchronization.</li>
                      <li>Automated email-driven workflows with Outlook integration, enabling automatic ticket creation, LLM-based categorization, and CRM updates.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-brand-primary dark:text-dark-primary text-sm font-semibold mb-2 flex items-center gap-2 transition-colors duration-500"><Sparkles className="w-3 h-3 text-brand-secondary dark:text-dark-secondary"/> Data Extraction & Reporting</h4>
                     <ul className="space-y-2 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                      <li>Built data extraction and validation bots for websites, portals, and a mobile application interface, feeding structured data into Excel and Google Sheets.</li>
                      <li>Used VB.NET, Python, and JavaScript for advanced scripting and data manipulation within UiPath workflows.</li>
                      <li>Ensured reliability through exception handling, error logging, and Orchestrator schedule management, and built Power BI dashboards to track automation KPIs.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Job 3 */}
              <motion.div variants={childVariants} className="relative flex flex-col group pl-16">
                <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-brand-bg dark:border-dark-bg bg-brand-secondary/10 dark:bg-dark-surface text-brand-secondary dark:text-dark-secondary z-10 transition-colors group-hover:bg-brand-secondary dark:group-hover:bg-dark-secondary group-hover:text-white dark:group-hover:text-dark-bg group-hover:shadow-md">
                  <BrainCircuit className="w-4 h-4" />
                </div>

                <div className="w-full glass-card p-8 group-hover:border-brand-secondary/30 dark:group-hover:border-dark-secondary/50 transition-colors">
                   <p className="text-brand-secondary dark:text-dark-secondary font-mono text-base mb-2 transition-colors duration-500">Mar 2023 — Jul 2024</p>
                  <h3 className="font-bold text-2xl text-brand-primary dark:text-dark-primary mb-1 transition-colors duration-500">Final Year Project</h3>
                  <p className="text-brand-primary dark:text-dark-primary font-medium mb-6 transition-colors duration-500">University of Central Punjab</p>
                   <ul className="space-y-3 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                    <li>Developed an intelligent virtual assistant to streamline university admissions, leveraging retrieval-augmented generation (RAG) for enhanced, context-based interaction.</li>
                    <li>Implemented a real-time speech interaction system followed by a search against a vector database to retrieve relevant admissions information.</li>
                    <li>Integrated generated responses with Nvidia Audio2Face to power a lifelike 3D avatar for an immersive conversational experience.</li>
                    <li>Built using HTML, CSS, and Bootstrap for the frontend, Flask for the backend, and Mistral 7B as the underlying language model.</li>
                  </ul>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-32 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-16">
              <span className="text-brand-secondary dark:text-dark-secondary font-mono text-sm tracking-wider transition-colors duration-500">03.</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-dark-primary tracking-tight transition-colors duration-500">Technical Expertise</h2>
              <div className="h-px bg-brand-primary/10 dark:bg-dark-highlight/20 flex-1 ml-4 hidden md:block transition-colors duration-500"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.map((group) => (
                <motion.div 
                  key={group.category}
                  variants={childVariants}
                  className="glass-card p-8 group hover:border-brand-primary/20 dark:hover:border-dark-highlight/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-brand-bg dark:bg-dark-bg border border-brand-primary/5 dark:border-dark-highlight/10 transition-colors duration-500">
                      {group.icon}
                    </div>
                    <h3 className="text-brand-primary dark:text-dark-primary font-medium transition-colors duration-500">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 text-sm font-light text-brand-accent dark:text-dark-accent bg-brand-bg dark:bg-dark-bg border border-brand-primary/5 dark:border-dark-highlight/10 rounded-md transition-colors hover:bg-white dark:hover:bg-dark-secondary hover:text-brand-primary dark:hover:text-dark-bg hover:border-brand-primary/10 dark:hover:border-dark-secondary hover:shadow-sm cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS (CASE STUDY) */}
        <section id="projects" className="py-32 px-6 bg-white/50 dark:bg-dark-surface/30 transition-colors duration-500">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-16">
              <span className="text-brand-secondary dark:text-dark-secondary font-mono text-sm tracking-wider transition-colors duration-500">04.</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-dark-primary tracking-tight transition-colors duration-500">Featured Case Studies</h2>
              <div className="h-px bg-brand-primary/10 dark:bg-dark-highlight/20 flex-1 ml-4 hidden md:block transition-colors duration-500"></div>
            </div>

            <div className="space-y-12">
              {caseStudiesData.map((project, index) => (
                <motion.div 
                  key={index}
                  variants={childVariants} 
                  className="glass-card overflow-hidden group"
                >
                  <div className="p-10 md:p-14 relative">
                    <div className="absolute top-0 right-0 p-8 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                      <ExternalLink className="w-8 h-8 text-brand-secondary dark:text-dark-secondary" />
                    </div>
                    
                    <div className="mb-8">
                      <div className="inline-block px-3 py-1 bg-brand-secondary/10 dark:bg-dark-secondary/10 border border-brand-secondary/20 dark:border-dark-secondary/20 text-brand-secondary dark:text-dark-secondary text-sm font-mono rounded-full mb-6 transition-colors duration-500">
                        {project.category}
                      </div>
                      <h3 className="text-4xl font-bold text-brand-primary dark:text-dark-primary mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-secondary group-hover:to-brand-primary dark:group-hover:from-dark-secondary dark:group-hover:to-dark-primary transition-all duration-300 w-fit">
                        {project.title}
                      </h3>
                      <p className="text-2xl text-brand-accent dark:text-dark-accent font-light max-w-2xl transition-colors duration-500">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-12 border-t border-brand-primary/10 dark:border-dark-highlight/10 pt-12 transition-colors duration-500">
                      <div>
                        <h4 className="text-brand-primary dark:text-dark-primary font-medium mb-3 flex items-center gap-2 transition-colors duration-500"><BrainCircuit className="w-4 h-4 text-brand-accent dark:text-dark-accent"/> The Problem</h4>
                        <p className="text-base text-brand-accent dark:text-dark-accent font-light leading-relaxed transition-colors duration-500">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-brand-primary dark:text-dark-primary font-medium mb-3 flex items-center gap-2 transition-colors duration-500"><Code2 className="w-4 h-4 text-brand-accent dark:text-dark-accent"/> The Approach</h4>
                        <p className="text-base text-brand-accent dark:text-dark-accent font-light leading-relaxed transition-colors duration-500">
                          {project.approach}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-brand-primary dark:text-dark-primary font-medium mb-3 flex items-center gap-2 transition-colors duration-500"><LineChart className="w-4 h-4 text-brand-accent dark:text-dark-accent"/> The Outcome</h4>
                        <p className="text-base text-brand-accent dark:text-dark-accent font-light leading-relaxed transition-colors duration-500">
                          {project.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-sm font-mono text-brand-secondary dark:text-dark-secondary bg-brand-secondary/10 dark:bg-dark-secondary/10 border border-brand-secondary/20 dark:border-dark-secondary/20 px-3 py-1.5 rounded-full transition-colors duration-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="max-w-3xl mx-auto text-center glass-card p-12 md:p-20 relative overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-secondary/5 dark:bg-dark-secondary/5 blur-[100px] pointer-events-none rounded-full transition-colors duration-500" />
            
            <div className="relative z-10">
              <span className="text-brand-secondary dark:text-dark-secondary font-mono text-sm tracking-wider mb-6 block transition-colors duration-500">05. What's Next?</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-primary dark:text-dark-primary tracking-tight mb-6 transition-colors duration-500">Ready to innovate?</h2>
              <p className="text-brand-accent dark:text-dark-accent mb-12 text-lg md:text-xl font-light max-w-xl mx-auto transition-colors duration-500">
                I'm actively seeking new opportunities in RPA, automation engineering, and full-stack development. Let's discuss how my experience can drive impact for your team.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="mailto:hamzabinnkashif@gmail.com" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-secondary dark:bg-dark-secondary text-white dark:text-dark-bg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send an Email</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/hamzabinkashif/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white dark:bg-dark-surface border border-brand-primary/10 dark:border-dark-highlight/20 text-brand-primary dark:text-dark-primary font-medium transition-all shadow-sm hover:shadow-md hover:border-brand-primary/20 dark:hover:border-dark-highlight/40 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <FaLinkedin className="w-5 h-5 text-brand-secondary dark:text-dark-secondary transition-colors duration-500" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* FOOTER */}
        <footer className="py-10 text-center border-t border-brand-primary/10 dark:border-dark-highlight/10 bg-white dark:bg-dark-bg transition-colors duration-500">
          <p className="text-brand-accent dark:text-dark-accent text-sm font-mono tracking-wider transition-colors duration-500">
            Designed & Engineered by <span className="text-brand-primary dark:text-dark-primary font-medium transition-colors duration-500">Hamza Bin Kashif</span>
          </p>
        </footer>

      </main>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResume(false)}
              className="absolute inset-0 bg-brand-primary/40 dark:bg-dark-bg/90 cursor-pointer [transform:translateZ(0)]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden border border-brand-primary/10 dark:border-dark-highlight/20 flex flex-col isolation-auto [transform:translateZ(0)]"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setShowResume(false)}
                className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/20 hover:bg-black/40 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md text-white transition-all shadow-lg border border-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* PDF Viewer */}
              <div className="flex-1 w-full bg-gray-100 dark:bg-dark-bg overflow-hidden relative">
                <object
                  data="/Hamza Bin Kashif Resume.pdf#toolbar=0&navpanes=0&view=FitH"
                  type="application/pdf"
                  className="w-full h-full border-none"
                >
                  <iframe
                    src="/Hamza Bin Kashif Resume.pdf#toolbar=0&navpanes=0&view=FitH"
                    className="w-full h-full border-none"
                    title="Resume PDF"
                  />
                </object>
                
                {/* Download Button - Bottom Right */}
                <div className="absolute bottom-6 right-8">
                  <a
                    href="/Hamza Bin Kashif Resume.pdf"
                    download="Hamza Bin Kashif Resume.pdf"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-secondary dark:bg-dark-secondary text-white dark:text-dark-bg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all group"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">Download</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}