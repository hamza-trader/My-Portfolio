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
    category: "Programming & Database",
    icon: <Code2 className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Python", "SQL", "R"]
  },
  {
    category: "Machine Learning & AI",
    icon: <BrainCircuit className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["LLMs", "Deep Learning (RetinaNet)", "Random Forest", "Regression Modeling", "Sentiment Classification", "NLP", "OCR", "Feature Engineering", "Hyperparameter Tuning", "Data Augmentation"]
  },
  {
    category: "Statistical Analysis",
    icon: <LineChart className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Multivariate Analysis", "PCA", "PLSR", "Ideal Profiling", "Hypothesis Testing", "Statistical Modeling & Driver Analysis"]
  },
  {
    category: "Frameworks & Libraries",
    icon: <Package className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Scikit-learn", "PyTorch", "Transformers", "Bitsandbytes", "Flask"]
  },
  {
    category: "Visualization & Tools",
    icon: <Monitor className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Power BI", "SPSS", "Advanced Excel", "NVIDIA Omniverse", "COCO JSON"]
  },
  {
    category: "Professional Methodologies",
    icon: <Briefcase className="w-5 h-5 text-brand-secondary dark:text-dark-secondary" />,
    skills: ["Survey Analytics", "Predictive Modeling", "Consumer Research", "Financial Data Analysis", "Data Preprocessing"]
  }
];

const caseStudiesData = [
  {
    title: "Consumer Preference Driver Analysis",
    category: "Consumer Analytics",
    description: "Identifying the key product attributes that drive consumer liking and purchase intent through advanced statistical modeling and predictive analytics.",
    problem: "Consumer research datasets contained multiple sensory and behavioral attributes, but stakeholders lacked clarity on which product characteristics most strongly influenced consumer liking and purchase decisions.",
    approach: "Developed analytical pipelines in Python and R to preprocess survey data and apply techniques such as PLSR, Random Forest, and correlation analysis. Evaluated attribute importance, quantified the impact of individual product features, and validated findings across statistical methods.",
    outcome: "Revealed the most influential drivers of consumer preference and purchase intent, enabling stakeholders to prioritize product improvements based on data-backed consumer insights.",
    tags: ["Python", "R", "PLSR", "Random Forest", "Excel", "Consumer Analytics"],
    icon: <LineChart className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "Ideal Profiling Analysis",
    category: "Sensory Analytics",
    description: "Determining the optimal sensory attribute ranges that maximize consumer liking by comparing perceived product characteristics against ideal consumer expectations.",
    problem: "Product teams needed to understand how current sensory attributes differed from ideal consumer expectations in order to improve overall liking and product acceptance.",
    approach: "Built an Ideal Profiling framework in Python and R to model relationships between sensory attributes and liking scores. Applied regression-based analysis to estimate ideal attribute levels and identify gaps between current and target sensory profiles.",
    outcome: "Delivered actionable recommendations on optimal sensory attribute ranges, allowing teams to focus product reformulation efforts on the characteristics most likely to improve consumer satisfaction.",
    tags: ["Python", "R", "Regression Analysis", "Ideal Profiling", "Sensory Analytics"],
    icon: <BrainCircuit className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "Consumer Segmentation & Preference Mapping",
    category: "Segmentation Analysis",
    description: "Using multivariate analysis to identify consumer preference segments and visualize product positioning within competitive categories.",
    problem: "Consumer preference data showed varying patterns across respondents, making it difficult to identify meaningful audience segments and understand how products were positioned relative to competitors.",
    approach: "Applied PCA and clustering techniques to reduce dimensionality and uncover consumer segments based on preference behavior. Generated visual preference maps to highlight relationships between consumer groups and product attributes.",
    outcome: "Identified distinct consumer segments and provided clear product positioning insights, helping stakeholders align product strategies with target audience preferences.",
    tags: ["Python", "R", "PCA", "Clustering", "Power BI", "Segmentation Analysis"],
    icon: <LineChart className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "Survey Analytics Workflow Automation",
    category: "Data Automation",
    description: "Automating repetitive survey data cleaning, preprocessing, and reporting workflows to improve efficiency and ensure reliable analytics outputs.",
    problem: "Manual handling of large survey datasets created bottlenecks in preprocessing, increased the likelihood of reporting errors, and slowed the delivery of actionable insights.",
    approach: "Designed automated workflows in Python to clean, validate, and structure survey data for downstream analysis. Integrated preprocessing pipelines with Excel-based reporting and validation processes to streamline recurring analytics tasks.",
    outcome: "Significantly reduced manual processing effort, improved consistency across survey analytics projects, and accelerated the turnaround time for delivering consumer insights.",
    tags: ["Python", "Excel", "Data Automation", "Survey Analytics", "Data Validation"],
    icon: <Terminal className="w-4 h-4 text-brand-accent dark:text-dark-accent" />
  },
  {
    title: "LibraBot",
    category: "AI / ML Engineering",
    description: "An entirely offline, intelligent virtual library assistant leveraging Local LLMs and NVIDIA Omniverse for hyper-realistic interaction.",
    problem: "Traditional library systems lack intuitive, conversational interfaces. Cloud-based LLMs pose privacy concerns and latency issues for local institutional deployments.",
    approach: "Engineered a completely offline solution utilizing Hugging Face Transformers. Integrated OCR for real-time image text extraction and utilized NVIDIA Audio2Face for lifelike avatar lip-syncing.",
    outcome: "Successfully deployed a highly responsive, locally hosted Flask application that securely processes user NLP queries while providing an immersive, interactive 3D avatar experience.",
    tags: ["Python", "PyTorch", "Transformers", "NLP", "Flask", "NVIDIA Omniverse", "OCR"],
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
            <span className="text-brand-primary dark:text-dark-primary transition-colors">Ehab<span className="text-brand-secondary dark:text-dark-secondary transition-colors">.</span></span>
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
              Hi I'm Ehab Sikandar <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary dark:from-dark-secondary dark:to-dark-primary">
                Data Scientist.
              </span>
            </motion.h1>

            <motion.p variants={childVariants} className="text-lg md:text-xl text-brand-accent dark:text-dark-accent max-w-2xl mx-auto mb-10 leading-relaxed font-light transition-colors duration-500">
              Bridging the gap between complex raw data and AI solutions. I build machine learning systems that drive measurable strategic impact.
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
                I am passionate about transforming datasets into intelligence.
              </p>
              <p>
                With expertise spanning advanced analytics, traditional machine learning, and deep learning architecture, I build solutions that solve real-world problems. Whether engineering predictive models, developing LLM-powered applications, or extracting strategic insights from unstructured data, I work at the intersection of technical innovation and business strategy.
              </p>
              <p className="text-brand-primary dark:text-dark-primary font-medium transition-colors duration-500">
                My core objective is to build intelligent systems that empower organizations to make precision, data-driven decisions.
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
                   <p className="text-brand-secondary dark:text-dark-secondary font-mono text-base mb-2 transition-colors duration-500">Apr 2025 — Present</p>
                  <h3 className="font-bold text-2xl text-brand-primary dark:text-dark-primary mb-1 transition-colors duration-500">AI Research Assistant</h3>
                  <p className="text-brand-primary dark:text-dark-primary font-medium mb-6 transition-colors duration-500">CodeBricks Global</p>
                   <ul className="space-y-3 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                    <li>Conducted survey analytics on consumer research datasets to extract actionable insights on product preferences, flavor trends, and category performance.</li>
                    <li>Supported end-to-end survey analytics projects, handling data cleaning, preprocessing, analysis.</li>
                    <li>Performed statistical analysis and multivariate techniques (including PLSR, PCA, and Ideal Profiling) in R and Python to identify key drivers of liking and purchase intent, comparing results across tools for robustness.</li>
                    <li>Built predictive models and Random Forest analyses to support business decision-making and highlight influential factors in consumer behavior.</li>
                    <li>Automated survey data workflows, including preprocessing, cleaning, and structuring of numeric and free-text responses, improving efficiency and data reliability.</li>
                    <li>Applied advanced Excel skills to handle large-scale datasets, including formulas, pivot tables, and validation checks for accurate reporting.</li>
                    <li>Created charts and visualizations in Power BI, including scatter plots and PCA coordinate plots, to communicate survey trends and insights effectively.</li>
                    <li>Utilized SPSS for additional statistical analysis and hypothesis testing as needed for survey data.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Job 2 */}
              <motion.div variants={childVariants} className="relative flex flex-col group pl-16">
                <div className="absolute left-0 flex items-center justify-center w-12 h-12 rounded-full border-[6px] border-brand-bg dark:border-dark-bg bg-brand-secondary/10 dark:bg-dark-surface text-brand-secondary dark:text-dark-secondary z-10 transition-colors group-hover:bg-brand-secondary dark:group-hover:bg-dark-secondary group-hover:text-white dark:group-hover:text-dark-bg group-hover:shadow-md">
                  <Terminal className="w-4 h-4" />
                </div>
                
                <div className="w-full glass-card p-8 group-hover:border-brand-secondary/30 dark:group-hover:border-dark-secondary/50 transition-colors">
                   <p className="text-brand-secondary dark:text-dark-secondary font-mono text-base mb-2 transition-colors duration-500">Jan 2025 — Mar 2025</p>
                  <h3 className="font-bold text-2xl text-brand-primary dark:text-dark-primary mb-1 transition-colors duration-500">Data Science Intern</h3>
                  <p className="text-brand-primary dark:text-dark-primary font-medium mb-6 transition-colors duration-500">VentureDive</p>
                  
                  <div className="mb-4">
                    <h4 className="text-brand-primary dark:text-dark-primary text-sm font-semibold mb-2 flex items-center gap-2 transition-colors duration-500"><Sparkles className="w-3 h-3 text-brand-secondary dark:text-dark-secondary"/> FinLLM Project</h4>
                     <ul className="space-y-2 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                      <li>Contributed to the development of a system enabling a language model (LLM) to query tabular CSV data and extract financial insights.</li>
                      <li>Implemented SQL-like querying using Pandas, allowing comparisons, aggregations, and trend analysis on structured financial datasets.</li>
                      <li>Designed a dataframe-based query workflow for retrieving financial trends directly from CSV files without vector search.</li>
                      <li>Ensured outputs included interpretable reasoning, improving transparency and trust in AI-driven insights.</li>
                      <li>Supported data cleaning, preprocessing, and structuring to ensure accuracy and usability of financial datasets.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-brand-primary dark:text-dark-primary text-sm font-semibold mb-2 flex items-center gap-2 transition-colors duration-500"><Sparkles className="w-3 h-3 text-brand-secondary dark:text-dark-secondary"/> Shelf Sight Project</h4>
                     <ul className="space-y-2 text-brand-accent dark:text-dark-accent text-base font-light leading-relaxed list-disc list-inside marker:text-brand-secondary/50 dark:marker:text-dark-secondary/70 transition-colors duration-500">
                      <li>Contributed to a retail analytics project by supporting the development of a deep learning-based object detection system using RetinaNet.</li>
                      <li>Prepared and structured 1,200+ labeled images in COCO JSON format, ensuring data quality and consistency for model training.</li>
                      <li>Assisted in model fine-tuning by adjusting hyperparameters, learning rates, batch sizes, and data augmentation techniques.</li>
                      <li>Evaluated model performance using standard classification metrics, supporting model validation and comparison across experiments.</li>
                    </ul>
                  </div>
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
                I'm actively seeking new opportunities in Data Science and AI Engineering. Let's discuss how my analytical expertise can drive impact for your team.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="mailto:ehab.sikandar@yahoo.com" 
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand-secondary dark:bg-dark-secondary text-white dark:text-dark-bg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send an Email</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/muhammad-ehab-sikandar" 
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
            Designed & Engineered by <span className="text-brand-primary dark:text-dark-primary font-medium transition-colors duration-500">Muhammad Ehab Sikandar</span>
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
                  data="/resume.pdf#toolbar=0&navpanes=0&view=FitH"
                  type="application/pdf"
                  className="w-full h-full border-none"
                >
                  <iframe
                    src="/resume.pdf#toolbar=0&navpanes=0&view=FitH"
                    className="w-full h-full border-none"
                    title="Resume PDF"
                  />
                </object>
                
                {/* Download Button - Bottom Right */}
                <div className="absolute bottom-6 right-8">
                  <a
                    href="/Ehab's Resume.pdf"
                    download="Muhammad Ehab Sikandar Resume.pdf"
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