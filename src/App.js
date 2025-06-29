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
  Check
} from "lucide-react";

import values1 from "./assets/values1_rdc.jpg";
import values2 from "./assets/values2_rdc.jpg";
import values3 from "./assets/values3_rdc.jpg";
import values4 from "./assets/values4_rdc.jpg";
import values5 from "./assets/values5_rdc.jpg";

import produit1 from "./assets/plateaux/plateaux.jpg";
import produit2 from "./assets/plateaux/plateau2.jpg";
import produit3 from "./assets/plateaux/plateau3.jpg";

import benne1 from "./assets/benne/benne.jpg";
import benne2 from "./assets/benne/benne2.jpg";

import citerne1 from "./assets/citerne/citerne.jpg";
import citerne2 from "./assets/citerne/citerne2.jpg";

import laser from "./assets/services/laser.jpg";
import pliage from "./assets/services/pliage.jpg";
import welding from "./assets/services/welding.jpg";
import ccc from "./assets/services/ccc.jpg";
import reparation from "./assets/services/reparation.jpg";
import Image1 from "./assets/services/service2/Image1.jpg";
import reparation2 from "./assets/services/reparation2.jpg";
import laser2 from "./assets/services/laser2.jpg";
import pliage2 from "./assets/services/pliage2.jpg";

import cr from "./assets/services/c&r.jpg";
import cr2 from "./assets/services/c&r2.jpg";
import cr3 from "./assets/services/c&r3.jpg";

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

const SectionSubTitle = ({ title, icon: Icon }) => (
  <h2 className="text-3xl sm:text-xl font-bold text-center text-primary-400 mb-12 flex items-center justify-center gap-3">
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

  const handleNext = () => setCurrentIndex((p) => (p + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
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
      <div className="relative w-full h-full">
        <AnimatePresence>
          {images.map((imgSrc, index) => {
            const total = images.length;
            let offset = index - currentIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            if (Math.abs(offset) > 2) {
              return null;
            }

            let x, scale, opacity, zIndex;

            if (offset === 0) {
              scale = 1;
              opacity = 1;
              zIndex = 3;
              x = "0%";
            } else if (offset === 1) {
              scale = 0.85;
              opacity = 0.7;
              zIndex = 2;
              x = "25%";
            } else if (offset === -1) {
              scale = 0.85;
              opacity = 0.7;
              zIndex = 2;
              x = "-25%";
            } else if (offset === 2) {
              scale = 0.7;
              opacity = 0.4;
              zIndex = 1;
              x = "50%";
            } else if (offset === -2) {
              scale = 0.7;
              opacity = 0.4;
              zIndex = 1;
              x = "-50%";
            } else {
              scale = 0.4;
              opacity = 0;
              zIndex = 0;
              x = `${offset * 30}%`;
            }

            return (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                initial={false}
                animate={{ x, scale, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
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

const placeholderImg = (
  width,
  height,
  text,
  bgColor = "0b2b36",
  textColor = "FFFFFF"
) =>
  `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text.replace(
    /\s/g,
    "+"
  )}&font=lato`;

  // new carousel
// const ContentImageSlider = ({ slides }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         if (slides.length <= 1) return; // Don't start timer if only one slide
//         const timer = setTimeout(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//         }, 5000); // Change slide every 5 seconds

//         return () => clearTimeout(timer);
//     }, [currentIndex, slides.length]);

//     const slideVariants = {
//         enter: (direction) => ({
//             x: direction > 0 ? 50 : -50,
//             opacity: 0
//         }),
//         center: {
//             zIndex: 1,
//             x: 0,
//             opacity: 1
//         },
//         exit: (direction) => ({
//             zIndex: 0,
//             x: direction < 0 ? 50 : -50,
//             opacity: 0
//         })
//     };

//     return (
//         <div className="bg-secondary-800 rounded-2xl shadow-2xl border border-secondary-700 overflow-hidden">
//            <div className="grid grid-cols-1 md:grid-cols-2">
//                 {/* Left Column: Text Content */}
//                 <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 min-h-[400px] md:min-h-[450px]">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={currentIndex}
//                             variants={slideVariants}
//                             initial="enter"
//                             animate="center"
//                             exit="exit"
//                             transition={{
//                                 x: { type: "spring", stiffness: 300, damping: 30 },
//                                 opacity: { duration: 0.3 }
//                             }}
//                             custom={1} // enter from right
//                         >
//                             <h3 className="text-3xl font-bold text-primary-400 mb-4 flex items-center">
//                                <Check className="w-8 h-8 mr-3 text-primary-500" />
//                                {slides[currentIndex].title}
//                             </h3>
//                             <p className="text-lg text-gray-300">
//                                {slides[currentIndex].desc}
//                             </p>
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>

//                 {/* Right Column: Image */}
//                 <div className="relative min-h-[300px] md:min-h-0 order-1 md:order-2">
//                    <AnimatePresence mode="wait">
//                         <motion.img
//                             key={currentIndex}
//                             src={slides[currentIndex].images}
//                             alt={slides[currentIndex].title}
//                             className="absolute inset-0 w-full h-full object-cover"
//                             variants={slideVariants}
//                             initial="enter"
//                             animate="center"
//                             exit="exit"
//                             transition={{
//                                 x: { type: "spring", stiffness: 300, damping: 30 },
//                                 opacity: { duration: 0.3 }
//                             }}
//                             custom={-1} // enter from left
//                         />
//                     </AnimatePresence>
//                 </div>
//            </div>
//         </div>
//     );
// };

// --- NESTED IMAGE CAROUSEL (NO BUTTONS) ---
const ContentImageSlider = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [innerImageIndex, setInnerImageIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 0) return;

    const currentSlide = slides[currentSlideIndex];
    const images = currentSlide.images || [];

    const innerImageDuration = 3000;

    // If only one image — set total duration (no inner cycling)
    if (images.length <= 1) {
      const slideTimer = setTimeout(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        setInnerImageIndex(0); // reset inner index
      }, 3500);

      return () => clearTimeout(slideTimer);
    }

    // If multiple images — cycle through them, and move to next slide when done
    const totalImages = images.length;

    const timer = setTimeout(() => {
      if (innerImageIndex < totalImages - 1) {
        setInnerImageIndex((prev) => prev + 1);
      } else {
        setInnerImageIndex(0);
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }
    }, innerImageDuration);

    return () => clearTimeout(timer);
  }, [slides, currentSlideIndex, innerImageIndex]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const currentSlide = slides[currentSlideIndex];
  const images = currentSlide.images || [];

  return (
    <div className="bg-secondary-800 rounded-2xl shadow-2xl border border-secondary-700 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Text Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 min-h-[400px] md:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              custom={1}
            >
              <h3 className="text-3xl font-bold text-primary-400 mb-4 flex items-center">
                <Check className="w-8 h-8 mr-3 text-primary-500" />
                {currentSlide.subtitle}
              </h3>
              <p className="text-lg text-gray-300">{currentSlide.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image */}
        <div className="relative min-h-[300px] md:min-h-0 order-1 md:order-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[innerImageIndex] || `no-image-${currentSlideIndex}`}
              src={images[innerImageIndex]}
              alt={`Service image ${innerImageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// old carousel
const ImageCarouselCard = ({ item }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!item.images || item.images.length <= 1) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % item.images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId);
    }, [item.images]);

    return (
        <div className="bg-secondary-800 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-secondary-700 h-full">
            <div className="relative h-56 sm:h-64">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={item.images[currentIndex]}
                        alt={`${item.title} - image ${currentIndex + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-primary-500 mb-2">{item.title}</h4>
                <p className="text-gray-400 flex-grow">{item.desc}</p>
            </div>
        </div>
    );
};


const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
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
    { href: "#clients-achievements", text: t("nav_clients&achievements") },
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
  const [expandedProductIndex, setExpandedProductIndex] = useState(null);
  const [expandedServicesIndex, setExpandedServicesIndex] = useState(null);

  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [connectorStyle, setConnectorStyle] = useState({});
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  const values = [
    {
      title: t("fiability.title"),
      desc: t("fiability.desc"),
      icon: ShieldCheck,
      img: values1,
    },
    {
      title: t("efficacity.title"),
      desc: t("efficacity.desc"),
      icon: Lightbulb,
      img: values2,
    },
    {
      title: t("innovation_continue.title"),
      desc: t("innovation_continue.desc"),
      icon: Scaling,
      img: values3,
    },
    {
      title: t("customer_engagement.title"),
      desc: t("customer_engagement.desc"),
      icon: Handshake,
      img: values4,
    },
    {
      title: t("responsability.title"),
      desc: t("responsability.desc"),
      icon: Gem,
      img: values5,
    },
  ];

  const products = [
    {
      title: t("plateau_bache.title"),
      imgText: placeholderImg(600, 400, t("plateau_bache.title"), "374151"),
      images: [produit1, produit2, produit3],
    },
    {
      title: t("benne_gravats.title"),
      imgText: placeholderImg(600, 400, t("benne_gravats.title"), "374151"),
      images: [benne1, benne2],
    },
    {
      title: t("citerne_15000.title"),
      imgText: placeholderImg(600, 400, t("citerne_15000.title"), "374151"),
      images: [citerne1, citerne2],
    },
  ];

  const services1 = [
    {
      subtitle: t("service1_subtitle"),
      description: t("service1_desc"),
      images: [laser, pliage, welding, laser2, pliage2],
    },
    {
      subtitle: t("service2_subtitle"),
      description: t("service2_desc"),
      images: [ccc],
    },
    {
      subtitle: t("service3_subtitle"),
      description: t("service3_desc"),
      images: [reparation, reparation2],      
    },
  ];

    const services2 = [
    {
      subtitle: t("service21_subtitle"),
      description: t("service21_desc"),
      images: [ccc],
    },
    {
      subtitle: t("service22_subtitle"),
      description: t("service22_desc"),
      images: [Image1, reparation],
    }
  ];

   const achievements = [
    {
      title: t("sector_trans"),
      desc: "Convoi exceptionnel pour pièces hors gabarit.",
      imgText: placeholderImg(600, 400, t("sector_trans"), "374151"),
      images: [cr, cr2, cr3],
    },
    {
      title: t("sector_agr"),
      imgText: placeholderImg(600, 400, t("sector_agr"), "374151"),
      desc: "Convoi exceptionnel pour pièces hors gabarit.",
      images: [cr, cr2, cr3],
    },
    {
      title: t("sector_loc"),
      imgText: placeholderImg(600, 400, t("sector_loc"), "374151"),
      desc: "Convoi exceptionnel pour pièces hors gabarit.",
      images: [cr, cr2, cr3],
    },
    {
      title: t("sector_indus"),
      imgText: placeholderImg(600, 400, t("sector_indus"), "374151"),
      desc: "Convoi exceptionnel pour pièces hors gabarit.",
      images: [cr, cr2, cr3],
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

  const handleProductCardClick = (index) => {
    const newIndex = expandedProductIndex === index ? null : index;
    setExpandedProductIndex(newIndex);

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

  const handleServicesCardClick = (index) => {
    const newIndex = expandedServicesIndex === index ? null : index;
    setExpandedServicesIndex(newIndex);

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
            <SectionSubTitle title={t("products_subtitle")}/>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <ImageCarouselCard key={item.title} item={item} />
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
                <section id="workshop" className="scroll-mt-20 max-w-7xl mx-auto">
                    <SectionTitle title={t("our_workshop")} />
                     <p className="text-center text-lg text-white-400 mb-12 max-w-3xl mx-auto">
                        {t("service1")}
                    </p>
                    <ContentImageSlider slides={services1} />
                </section>
            </AnimatedSection>

            <AnimatedSection>
                <section id="workshop" className="scroll-mt-20 max-w-7xl mx-auto">
                     <p className="text-center text-lg text-white-400 mb-12 max-w-3xl mx-auto">
                        {t("service2")}
                    </p>
                    <ContentImageSlider slides={services2} />
                </section>
            </AnimatedSection>

        {/* --- Values Section --- */}

        <AnimatedSection>
          <section id="values" className="scroll-mt-20 max-w-7xl mx-auto">
            <SectionTitle title={t("added_values")} />
            <SectionSubTitle title={t("added_values_desc")}/>
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
                      {/* Icon */}
                      <div className="mb-4 text-primary-500 group-hover:scale-110 transition-transform">
                        <Icon size={36} strokeWidth={1.5} />
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
                              <img
                                src={value.img}
                                alt={value.title}
                                className="w-full h-full object-cover"
                              />
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

        {/* --- Achievements Section --- */}
        <AnimatedSection>
          <section id="clients-achievements" className="scroll-mt-20">
            <SectionTitle title={t("achiev")}/>
            <SectionSubTitle title={t("possible_clients_desc")}/>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((item) => (
                <ImageCarouselCard key={item.title} item={item} />
              ))}
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
