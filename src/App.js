import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, animate, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SuccessModal from "./SuccessModal";

// Import icons from lucide-react
import {
  ChevronDown,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  Building,
  Wrench,
  Truck,
  Lightbulb,
  Users,
  Target,
  Award,
  TrendingUp,
  CheckCircle,
  Dot,
  Globe,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Gem,
  Scaling,
  Handshake,
  ShieldCheck,
  PlusCircle,
  XCircle,
} from "lucide-react";

import values1 from "./assets/values1_rdc.jpg";
import values2 from "./assets/values2_rdc.jpg";
import values3 from "./assets/values3_rdc.jpg";
import values4 from "./assets/values4_rdc.jpg";
import values5 from "./assets/values5_rdc.jpg";


// Component to handle scroll-triggered animations for sections
const AnimatedSection = ({ children, threshold = 0.2 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

// Updated SectionTitle with animation
const SectionTitle = ({ title, icon: Icon }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary-400 mb-12 flex items-center justify-center gap-3">
    {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10" />}
    <span>{title}</span>
  </h2>
);

// --- Language Switcher Component ---
const LanguageSwitcher = ({ i18n }) => {
  const languages = [
    { code: "fr", name: "FR" },
    { code: "en", name: "EN" },
  ];

  return (
    <div className="flex items-center bg-secondary-700/50 rounded-full border border-secondary-700">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
            i18n.language.startsWith(lang.code)
              ? "bg-primary-500 text-secondary-900"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

// --- Image Carousel Component ---
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 md:left-4 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 md:right-4 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image Slider */}
      <div className="relative w-full h-full">
        <AnimatePresence custom={currentIndex}>
          {images.map((imgSrc, index) => {
            const offset = index - currentIndex;
            let x, scale, opacity, zIndex;

            if (offset === 0) {
              // Active slide
              scale = 1;
              opacity = 1;
              zIndex = 3;
              x = "0%";
            } else if (offset === 1) {
              // Right neighbour
              scale = 0.7;
              opacity = 0.6;
              zIndex = 2;
              x = "40%";
            } else if (offset === -1) {
              // Left neighbour
              scale = 0.7;
              opacity = 0.6;
              zIndex = 2;
              x = "-40%";
            } else if (offset === 2) {
              // Right outer neighbour
              scale = 0.5;
              opacity = 0.3;
              zIndex = 1;
              x = "70%";
            } else if (offset === -2) {
              // Left outer neighbour
              scale = 0.5;
              opacity = 0.3;
              zIndex = 1;
              x = "-70%";
            } else {
              // Hidden slides
              scale = 0.3;
              opacity = 0;
              zIndex = 0;
              x = `${offset * 30}%`;
            }

            // Handle wrapping for a seamless loop
            const total = images.length;
            if (currentIndex === 0 && index === total - 1) {
              // prev from first
              scale = 0.7;
              opacity = 0.6;
              zIndex = 2;
              x = "-40%";
            } else if (currentIndex === total - 1 && index === 0) {
              // next from last
              scale = 0.7;
              opacity = 0.6;
              zIndex = 2;
              x = "40%";
            }
            if (currentIndex <= 1 && index >= total - 2 + currentIndex) {
              const effectiveIndex = index - total;
              const newOffset = effectiveIndex - currentIndex;
              if (newOffset === -1) {
                scale = 0.7;
                opacity = 0.6;
                zIndex = 2;
                x = "-40%";
              }
              if (newOffset === -2) {
                scale = 0.5;
                opacity = 0.3;
                zIndex = 1;
                x = "-70%";
              }
            }
            if (
              currentIndex >= total - 2 &&
              index <= 1 + (currentIndex - (total - 1))
            ) {
              const effectiveIndex = index + total;
              const newOffset = effectiveIndex - currentIndex;
              if (newOffset === 1) {
                scale = 0.7;
                opacity = 0.6;
                zIndex = 2;
                x = "40%";
              }
              if (newOffset === 2) {
                scale = 0.5;
                opacity = 0.3;
                zIndex = 1;
                x = "70%";
              }
            }

            return (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                initial={false}
                animate={{ x, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{ transformOrigin: "center center" }}
              >
                <img
                  src={imgSrc}
                  alt={`Gallery image ${index + 1}`}
                  className="h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "EN" ? "FR" : "EN";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation Links Data
  const navLinks = [
    { href: "#about", text: t("nav_about") },
    { href: "#products", text: t("nav_products") },
    { href: "#services", text: t("nav_workshop") },
    { href: "#values", text: t("nav_values") },
    { href: "#clients", text: t("nav_clients") },
    { href: "#achievements", text: t("nav_achievements") },
    { href: "#goals", text: t("nav_goals") },
    { href: "#contact", text: t("nav_contact") },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); // ⛔️ prevent default navigation

    const formData = new FormData(e.target);

    try {
      await fetch("https://formsubmit.co/contact@hamilcar.tn", {
        method: "POST",
        body: formData,
      });

      setIsModalOpen(true); // ✅ open modal on success
      e.target.reset(); // optionally clear form after submit
    } catch (err) {
      console.error("Form submission error", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLink = ({ href, children, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className="block sm:inline-block px-4 py-2 rounded-lg text-sm font-semibold text-white hover:text-white hover:bg-primary-500/80 transition-all duration-300"
    >
      {children}
    </a>
  );

  // Placeholder image URL generator
  const placeholderImg = (
    width,
    height,
    text,
    bgColor = "104c5a",
    textColor = "FBBF24"
  ) =>
    `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
      text
    )}&font=Poppins`;

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedValuesIndex, setExpandedValuesIndex] = useState(null);

  const [connectorStyle, setConnectorStyle] = useState({});
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  const values = [
    {
      title: t("fiability.title"),
      desc: t("fiability.desc"),
      icon: ShieldCheck,
      img: values1
    },
    {
      title: t("efficacity.title"),
      desc: t("efficacity.desc"),
      icon: Lightbulb,
      img: values2
    },
    {
      title: t("innovation_continue.title"),
      desc: t("innovation_continue.desc"),
      icon: Scaling,
      img: values3
    },
    {
      title: t("customer_engagement.title"),
      desc: t("customer_engagement.desc"),
      icon: Handshake,
      img: values4
    },
    {
      title: t("responsability.title"),
      desc: t("responsability.desc"),
      icon: Gem,
      img: values5
    },
    
  ];

  const achievements = [
    {
      title: t("plateau_bache.title"),
      desc: t("plateau_bache.desc"),
      imgText: t("plateau_bache.imgText"),
      gallery: [
        placeholderImg(400, 300, "Flatbed Side View"),
        placeholderImg(400, 300, "Loading Cargo"),
        placeholderImg(400, 300, "Covered Transport"),
        placeholderImg(400, 300, "On The Road"),
      ],
    },
    {
      title: t("benne_gravats.title"),
      desc: t("benne_gravats.desc"),
      imgText: t("benne_gravats.imgText"),
      gallery: [
        placeholderImg(400, 300, "Skip Full"),
        placeholderImg(400, 300, "Tipping Action"),
        placeholderImg(400, 300, "Construction Site"),
        placeholderImg(400, 300, "Empty Skip"),
      ],
    },
    {
      title: t("citerne_15000.title"),
      desc: t("citerne_15000.desc"),
      imgText: t("citerne_15000.imgText"),
      gallery: [
        placeholderImg(600, 300, "Tanker Rear"),
        placeholderImg(600, 300, "Filling Valve"),
        placeholderImg(600, 300, "Polished Steel"),
        placeholderImg(600, 300, "Liquid Transport"),
      ],
    },
  ];

  cardRefs.current = achievements.map(
    (_, i) => cardRefs.current[i] ?? React.createRef()
  );

  const handleCardClick = (index) => {
    const newIndex = expandedIndex === index ? null : index;
    setExpandedIndex(newIndex);

    if (
      newIndex !== null &&
      cardRefs.current[newIndex]?.current &&
      gridRef.current
    ) {
      const cardEl = cardRefs.current[newIndex].current;
      const gridEl = gridRef.current;

      const cardRect = cardEl.getBoundingClientRect();
      const gridRect = gridEl.getBoundingClientRect();

      setConnectorStyle({
        left: `${cardRect.left - gridRect.left}px`,
        width: `${cardRect.width}px`,
      });
    }
  };

  const handleValuesCardClick = (index) => {
    const newIndex = expandedValuesIndex === index ? null : index;
    setExpandedValuesIndex(newIndex);

    if (
      newIndex !== null &&
      cardRefs.current[newIndex]?.current &&
      gridRef.current
    ) {
      const cardEl = cardRefs.current[newIndex].current;
      const gridEl = gridRef.current;

      const cardRect = cardEl.getBoundingClientRect();
      const gridRect = gridEl.getBoundingClientRect();

      setConnectorStyle({
        left: `${cardRect.left - gridRect.left}px`,
        width: `${cardRect.width}px`,
      });
    }
  };

  return (
    <div className="bg-secondary-900 text-gray-200 font-poppins leading-relaxed antialiased">
      {/* --- Google Font Import & Global Styles --- */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap");

        :root {
          --color-primary-300: #fcd34d;
          --color-primary-400: #fbbf24;
          --color-primary-500: #f59e0b;
          --color-primary-600: #d97706;
          --color-secondary-700: #104c5a;
          --color-secondary-800: #0b2b36;
          --color-secondary-900: #082028;
        }

        body {
          background-color: var(--color-secondary-900);
        }

        ::selection {
          background-color: var(--color-primary-400);
          color: var(--color-secondary-800);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* --- Navbar --- */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-secondary-800/90 backdrop-blur-lg shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="#" className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-primary-400 tracking-wider">
                  {/* Veh<span className="text-white">Tun</span> */}
                  <div className="flex items-center">
                    <a href="#" className="flex-shrink-0">
                      {/* Replace the h1 with an img tag */}
                      <img
                        src={require("./assets/vehtun-stroke.png")}
                        alt="VehTun Logo"
                        className="h-10 w-auto" // Control the height here, width will adjust automatically
                      />
                    </a>
                  </div>
                </h1>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.text}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100083210768748"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-80"
              >
                {/* Use an img tag with the imported icon */}
                <img
                  src={require("./assets/fb.png")}
                  alt="Facebook"
                  className="h-6 w-6 rounded-md"
                />
              </a>
              <a
                href="YOUR_LINKEDIN_URL_HERE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-80"
              >
                {/* Use an img tag with the imported icon */}
                <img
                  src={require("./assets/linkedin.png")}
                  alt="LinkedIn"
                  className="h-6 w-6 rounded-md"
                />
              </a>
            </div>
            <button
              type="button"
              onClick={handleChangeLanguage}
              className="text-white"
            >
              {currentLanguage}
            </button>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Ouvrir le menu principal</span>
                {isMenuOpen ? (
                  <X className="block h-7 w-7" />
                ) : (
                  <Menu className="block h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-secondary-800/95">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="flex flex-col justify-center items-center text-center">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <section id="about" className="scroll-mt-20 py-16">
              <div className="mt-10">
                <SectionTitle title={t("about_title")} />
              </div>
              {/* Main two-column grid layout */}
              <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* ===== Left Column ===== */}
                <div className="bg-secondary-900 min-h-screen p-4 sm:p-6 lg:p-8">
                  <header className="flex flex-col justify-center items-center w-full">
                    <AnimatedSection>
                      {/* The parent div is now centered on mobile and left-aligned on medium screens and up */}
                      <div className="flex flex-col text-center md:text-left">
                        {/* --- VehTun Title and Slogan --- */}
                        <div className="mb-10">
                          <motion.h1
                            // Font size is now smaller on mobile and scales up
                            className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white mb-4"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          >
                            Veh<span className="text-primary-400">Tun</span>
                          </motion.h1>
                          <motion.p
                            // Font size is also adjusted for mobile
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          >
                            Together, We Move What Matters.
                          </motion.p>
                        </div>

                        {/* --- "Who are we" Card --- */}
                        <motion.div
                          // Card padding is adjusted for smaller screens
                          className="bg-secondary-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-secondary-700"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <h3 className="text-2xl font-bold text-primary-400 mb-5">
                            {t("about_heading")}
                          </h3>
                          <ul className="space-y-4 text-gray-300 text-left">
                            <li className="flex items-start">
                              <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{t("about_item1")}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{t("about_item2")}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{t("about_item3")}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{t("about_item4")}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />
                              <span>{t("about_item5")}</span>
                            </li>
                          </ul>
                        </motion.div>
                      </div>
                    </AnimatedSection>
                  </header>

                  {/* Mock CSS variables for colors
            <style jsx global>{`
              :root {
                --color-primary-400: #FBBF24;
                --color-primary-500: #F59E0B;
                --color-secondary-900: #111827;
                --color-secondary-800: #1F2937;
                --color-secondary-700: #374151;
              }
              .text-primary-400 { color: var(--color-primary-400); }
              .text-primary-500 { color: var(--color-primary-500); }
              .bg-secondary-900 { background-color: var(--color-secondary-900); }
              .bg-secondary-800 { background-color: var(--color-secondary-800); }
              .border-secondary-700 { border-color: var(--color-secondary-700); }
            `}</style> */}
                </div>

                {/* ===== Right Column (FIXED) ===== */}
                <div className="flex flex-col text-left">
                  <div className="relative flex flex-col text-center items-center">
                    <div className="mb-10">
                      <motion.p
                        className="text-xl sm:text-2xl text-gray-300 font-light"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {t("hero_subtitle")}
                      </motion.p>
                    </div>
                    <div className="relative w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl">
                      <motion.div
                        className="w-full h-full"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.4 },
                        }}
                      >
                        <video
                          className="w-full h-full object-cover block"
                          src={require("./assets/vid.mp4")}
                          loop
                          autoPlay
                          muted
                          playsInline
                          controls={false}
                        >
                          {t("about_video_not_supported")}
                        </video>
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 from-secondary-900/60 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </AnimatedSection>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {/* --- Products Section --- */}
        <AnimatedSection>
          <section id="products" className="scroll-mt-20">
            <SectionTitle title={t("products_title")} />
            <p className="text-center text-lg text-black-400 mb-12 max-w-2xl mx-auto">
              {t("products_subtitle")}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: t("plateaux_simples"), icon: "PS" },
                { name: t("ridelles_fixes_ou_amovibles"), icon: "RF" },
                { name: t("plateaux_baches"), icon: "PB" },
                { name: t("bennes_basculantes"), icon: "BB" },
                {
                  name: t("citernes_liquides"),
                  icon: "CI",
                },
                { name: t("equipements_sur_mesure"), icon: "EM" },
              ].map((product, index) => (
                <motion.div
                  key={product.name}
                  className="bg-secondary-800 p-6 rounded-2xl shadow-lg border border-secondary-700/80 hover:border-primary-500/50 transition-colors duration-300 transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-secondary-700 text-primary-400 text-3xl font-bold mb-5 mx-auto ring-4 ring-secondary-900">
                    {product.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-white text-center">
                    {product.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* --- Key Figures Section --- */}
        {/* <AnimatedSection>
                    <section id="key-figures" className="scroll-mt-20">
                        <div className="bg-secondary-800/50 border border-secondary-700 rounded-2xl py-12 px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl md:text-5xl font-extrabold text-primary-400">
                                        <Counter to={2022} />
                                    </p>
                                    <p className="text-gray-400 font-medium mt-1">Année de Création</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl md:text-5xl font-extrabold text-primary-400">
                                        + <Counter to={10} />
                                    </p>
                                    <p className="text-gray-400 font-medium mt-1">Collaborateurs</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl md:text-5xl font-extrabold text-primary-400">
                                        + <Counter to={50} />
                                    </p>
                                    <p className="text-gray-400 font-medium mt-1">Projets Réalisés</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-4xl md:text-5xl font-extrabold text-primary-400">
                                        <Counter to={100} /> %
                                    </p>
                                    <p className="text-gray-400 font-medium mt-1">Satisfaction Client</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection> */}

        {/* --- Workshop Section --- */}
        <AnimatedSection>
          <section id="services" className="scroll-mt-20">
            <SectionTitle title={t("our_workshop")} />
            <div className="bg-secondary-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-secondary-700">
              <h3 className="text-2xl font-bold text-primary-400 mb-8 text-center sm:text-left">
                {t("technical_capabilities")}
              </h3>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
                {[
                  t("soudure"),
                  t("pliage"),
                  t("paint_cabin"),
                  t("quality_control"),
                  t("mesure_prod"),
                  t("system_integration"),
                ].map((cap) => (
                  <div key={cap} className="flex items-center">
                    <Dot className="w-8 h-8 text-primary-500 mr-2 flex-shrink-0" />
                    <p className="text-gray-300">{cap}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 relative h-72 md:h-96 rounded-2xl overflow-hidden">
                <img
                  src={require("./assets/img.jpg")}
                  alt="Machines Atelier VehTun"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  onError={(e) =>
                    (e.target.src = placeholderImg(
                      800,
                      400,
                      "Image Indisponible"
                    ))
                  }
                />
                <div className="absolute inset-0"></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* --- Values Section --- */}

        <AnimatedSection>
          <section id="values" className="scroll-mt-20 max-w-7xl mx-auto">
            <SectionTitle title={t("added_values")} />
            <p className="text-center text-lg text-white-400 mb-12 max-w-3xl mx-auto">
              {t("added_values_desc")}
            </p>
            {/* The `items-start` class is key to preventing vertical movement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start">
              {values.map((value, index) => {
                const isExpanded = index === expandedValuesIndex;
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className={`bg-secondary-800 rounded-2xl border border-secondary-700 shadow-lg cursor-pointer flex flex-col items-center text-center group
                                        ${
                                          isExpanded
                                            ? "ring-2 ring-primary-400 ring-offset-4 ring-offset-secondary-900"
                                            : ""
                                        }`}
                    onClick={() => handleValuesCardClick(index)}
                  >
                    <div className="p-6 w-full flex flex-col items-center">
                      <div className="mb-4 text-primary-400 group-hover:scale-110 transition-transform">
                        <Icon size={40} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-3 min-h-[56px] flex items-center justify-center">
                        {value.title}
                      </h4>
                      <div className="text-gray-500 group-hover:text-primary-400 transition-colors">
                        {isExpanded ? (
                          <XCircle size={24} />
                        ) : (
                          <PlusCircle size={24} />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="overflow-hidden w-full"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                             <div className="border-t border-secondary-700/50">
                                                    {/* Image container now uses aspect-video for responsive shape */}
                                                    <div className="aspect-video">
                                                        <img src={value.img} alt={value.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="p-6 text-gray-300">
                                                        <p>{value.desc}</p>
                                                    </div>
                                                </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </AnimatedSection>

        {/* --- Target Clients Section --- */}
        <AnimatedSection>
          <section id="clients" className="scroll-mt-20">
            <SectionTitle title={t("possible_clients")} />
            <p className="text-center text-lg text-black-400 mb-12 max-w-2xl mx-auto">
              {t("possible_clients_desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                t("sector_trans"),
                t("sector_const"),
                t("sector_agr"),
                t("sector_loc"),
                t("sector_indus"),
                t("sector_env"),
              ].map((client) => (
                <span
                  key={client}
                  className="bg-secondary-700 text-primary-400 px-5 py-3 rounded-full text-base font-semibold shadow-md border border-secondary-600"
                >
                  {client}
                </span>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* --- Achievements Section --- */}
        <AnimatedSection>
          <section id="achievements" className="scroll-mt-20 max-w-7xl mx-auto">
            <SectionTitle title={t("achiev")} />
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {achievements.map((item, index) => {
                const isExpanded = index === expandedIndex;
                return (
                  <React.Fragment key={item.title}>
                    {/* Card */}
                    <div
                      ref={cardRefs.current[index]}
                      className={`bg-secondary-800 shadow-xl flex flex-col group border border-secondary-700 cursor-pointer rounded-2xl
                                            ${
                                              isExpanded
                                                ? "ring-2 ring-primary-400 ring-offset-4 ring-offset-secondary-900"
                                                : ""
                                            }`}
                      onClick={() => handleCardClick(index)}
                    >
                      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
                        <img
                          src={placeholderImg(
                            400,
                            300,
                            item.imgText,
                            "0b2b36",
                            "FBBF24"
                          )}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-transparent"></div>
                        <div className="absolute top-3 right-3 bg-black/40 p-2 rounded-full text-white/80 transition-transform group-hover:scale-110">
                          {isExpanded ? (
                            <X size={20} />
                          ) : (
                            <Maximize2 size={20} />
                          )}
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <h4 className="text-xl font-bold text-primary-400 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>

                    {/* Expanded Gallery (Mobile View) */}
                    <div className="sm:hidden">
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            className="bg-secondary-800 rounded-b-2xl overflow-hidden border-x border-b border-secondary-700 -mt-2"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <div className="p-6">
                              <ImageCarousel images={item.gallery} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Expanded Gallery (Desktop View) */}
            <div className="hidden sm:block relative">
              <AnimatePresence>
                {expandedIndex !== null && (
                  <motion.div
                    key="expanded-content-wrapper"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative mt-5"
                  >
                    <motion.div
                      key="expanded-content"
                      className="bg-secondary-800 rounded-2xl overflow-hidden border border-secondary-700 shadow-2xl"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="p-6">
                        <ImageCarousel
                          images={achievements[expandedIndex].gallery}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </AnimatedSection>

        {/* --- Goals Section --- */}
        <AnimatedSection>
          <section id="goals" className="scroll-mt-20">
            <SectionTitle title={t("development_objectives")} />
            <p className="text-center text-lg text-black-400 mb-12 max-w-2xl mx-auto">
              {t("development_objectives_subtitle")}
            </p>
            <div className="max-w-3xl mx-auto bg-secondary-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-secondary-700">
              <ul className="space-y-5">
                {[
                  t("development_objectives_items.item1"),
                  t("development_objectives_items.item2"),
                  t("development_objectives_items.item3"),
                  t("development_objectives_items.item4"),
                  t("development_objectives_items.item5"),
                ].map((goal) => (
                  <li key={goal} className="flex items-start text-lg">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </AnimatedSection>

        {/* --- Contact Section --- */}
        <AnimatedSection>
          <section id="contact" className="scroll-mt-20">
            <SectionTitle title={t("contact_title")} />
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-secondary-800 to-secondary-700/80 p-8 sm:p-12 rounded-2xl shadow-2xl border border-secondary-700">
              <h3 className="text-3xl font-bold text-primary-400 mb-8 text-center">
                {t("contact_heading")}
              </h3>

              {/* --- Contact Details --- */}
              <div className="flex flex-wrap justify-center items-start gap-x-12 gap-y-8 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <MapPin className="w-7 h-7 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg text-white">
                      {t("contact_address")}
                    </p>
                    <p className="text-white-400">
                      {t("contact_address_value")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-7 h-7 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg text-white">
                      {t("contact_phone")}
                    </p>
                    <a
                      href={`tel:${t("contact_phone_value")}`}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      +216 94 888 342
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-7 h-7 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg text-white">Email</p>
                    <a
                      href={`mailto:${t("contact_email_value")}`}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      contact@vehtun.com
                    </a>
                  </div>
                </div>
              </div>

              {/* --- Divider --- */}
              <hr className="my-10 border-t-2 border-dashed border-secondary-700" />

              {/* --- Contact Form --- */}
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="full-name"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                      >
                        {t("contact_form_name")}
                      </label>
                      <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        required
                        className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-300 mb-2"
                      >
                        {t("contact_form_phone")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      {t("contact_form_email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      {t("contact_form_message")}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-xl font-bold text-secondary-black bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-secondary-800 transition-all duration-300 transform hover:scale-105"
                    >
                      Contact
                    </button>
                  </div>
                  <input type="hidden" name="_captcha" value="false" />
                </form>
              </div>
            </div>
          </section>
          <SuccessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </AnimatedSection>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-secondary-800 border-t border-secondary-700 mt-20 sm:mt-28">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="font-semibold">
            {t("footer_copyright", { year: "2025" })}
          </p>
          <p className="text-sm mt-2 font-light">{t("footer_made_in")}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
