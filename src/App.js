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
  Youtube,
  ShieldCheck,
  PlusCircle,
  XCircle,
  Check,
} from "lucide-react";

import values1 from "./assets/values1_rdc.jpg";
import values2 from "./assets/values2_rdc.jpg";
import values3 from "./assets/values3_rdc.jpg";
import values4 from "./assets/values4_rdc.jpg";
import values5 from "./assets/values5_rdc.jpg";

import produit1 from "./assets/products/plateau.jpg";
import produit2 from "./assets/products/trans3.jpg";
import produit3 from "./assets/products/trans2.jpg";
import produit4 from "./assets/products/benne.jpg";
import produit5 from "./assets/products/benne2.jpg";
import produit6 from "./assets/products/citerne.jpg";
import produit7 from "./assets/products/citerne2.jpg";

import benne1 from "./assets/benne/benne.jpg";
import benne2 from "./assets/benne/benne2.jpg";

import citerne1 from "./assets/citerne/citerne.jpg";
import citerne2 from "./assets/citerne/citerne2.jpg";

import trans1 from "./assets/clients/trans1.jpg";
import trans2 from "./assets/clients/trans2.jpg";
import trans3 from "./assets/clients/trans3.jpg";
import agr from "./assets/clients/agr.jpg";
import agr2 from "./assets/clients/agr2.jpg";
import btp from "./assets/clients/btp.jpg";
import btp2 from "./assets/clients/btp2.jpg";
import collec from "./assets/clients/collec.jpg";
import indus from "./assets/clients/indus.jpg";
import plateau3 from "./assets/clients/plateau3.jpg";
import cam from "./assets/clients/cam.jpg";

import laser from "./assets/services/laser.jpg";
import pliage from "./assets/services/pliage.jpg";
import welding from "./assets/services/welding.jpg";
import ccc from "./assets/services/ccc.jpg";
import reparation from "./assets/services/reparation.jpg";
import Image1 from "./assets/services/service2/Image1.jpg";
import reparation2 from "./assets/services/reparation2.jpg";
import laser2 from "./assets/services/laser2.jpg";
import pliage2 from "./assets/services/pliage2.jpg";

import laserVID from "./assets/videos/laser.mp4";
import pliageVID from "./assets/videos/pliage.mp4";
import soudureVID from "./assets/videos/soudure.mp4";


// Component to handle scroll-triggered animations for sections
const AnimatedSection = ({ children, threshold = 0.2 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  useEffect(() => {
    if (inView) controls.start("visible");
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

const AnimatedVideoSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);
const SectionVideoTitle = ({ title }) => (
  <div className="flex justify-center items-center mb-6 text-center">
    <Youtube className="w-8 h-8 sm:w-10 sm:h-10 text-primary-400 mr-4" />
    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
      {title}
    </h2>
  </div>
);

// --- HELPER TO CONVERT YOUTUBE URL TO EMBED URL ---
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    // Autoplay is enabled, but sound is muted by default. Controls are hidden.
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`;
  } catch (error) {
    console.error("Invalid YouTube URL:", error);
    return "";
  }
};

// Updated SectionTitle with animation
const SectionTitle = ({ title, icon: Icon }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-center text-secondary-700 mb-8 flex items-center justify-center gap-3">
    {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10" />}
    <span>{title}</span>
  </h2>
);

const SectionHigherTitle = ({ title }) => (
  <div className="flex justify-center items-center text-center p-6 border-b border-secondary-700">
    <h2 className="text-3xl sm:text-2xl font-bold text-secondary-700 tracking-tight">
      {title}
    </h2>
  </div>
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

// --- NESTED IMAGE CAROUSEL (NO BUTTONS) ---
const ContentImageSlider = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [innerImageIndex, setInnerImageIndex] = useState(0);
  const [showLastAchievement, setShowLastAchievement] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLastAchievement(true), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,            // a bit looser than 0.3 for small screens
    rootMargin: "100px 0px",   // start loading just before it enters
  });

  // Only start loading images once this slider has been seen at least once
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    if (inView) setShouldLoad(true);
  }, [inView]);

  // Drive the inner slideshow only when visible and we have slides
  useEffect(() => {
    if (!slides || slides.length === 0 || !inView) return;

    const currentSlide = slides[currentSlideIndex];
    const images = currentSlide?.images || [];
    if (images.length === 0) return;

    const innerImageDuration = 12000;
    const timer = setTimeout(() => {
      if (innerImageIndex < images.length - 1) {
        setInnerImageIndex((prev) => prev + 1);
      } else {
        setInnerImageIndex(0);
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }
    }, innerImageDuration);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, innerImageIndex, slides, inView]);

  // Reset inner index when slide changes
  useEffect(() => setInnerImageIndex(0), [currentSlideIndex]);

  // Preload the *next* image only after we’ve started loading
  const currentSlide = slides?.[currentSlideIndex] || {};
  const images = currentSlide.images || [];
  useEffect(() => {
    if (!shouldLoad || images.length <= 1) return;
    const nextIdx = (innerImageIndex + 1) % images.length;
    const img = new Image();
    img.decoding = "async";
    img.loading = "lazy";
    img.src = images[nextIdx];
    return () => { /* let GC handle it */ };
  }, [innerImageIndex, images, shouldLoad]);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  return (
    <div
      ref={ref}
      className="bg-white rounded-b-2xl shadow-2xl border-x overflow-hidden"
      style={{ contentVisibility: "auto" }} // lets the browser skip work when offscreen
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 md:min-h-[450px]">
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
              <h3 className="text-3xl font-bold text-secondary-700 mb-4 flex items-center">
                <Check className="w-8 h-8 mr-3 text-primary-500" />
                {currentSlide.subtitle}
              </h3>
              <p className="text-lg text-secondary-700">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative min-h-[300px] md:min-h-0 order-1 md:order-2">

          {shouldLoad ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentSlideIndex}-${innerImageIndex}`}
                src={images[innerImageIndex]}
                alt={`Service image ${innerImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                // Serve smaller resources to mobile; adjust to your layout
                sizes="(max-width: 768px) 100vw, 50vw"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          ) : (
            // Lightweight placeholder until we decide to load
            <div className="absolute inset-0 w-full h-full animate-pulse bg-secondary-100" />
          )}
        </div>
      </div>
    </div>
  );
};


const ContentImageSlider2 = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [innerImageIndex, setInnerImageIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const currentSlide = slides[currentSlideIndex];
    const images = currentSlide.images || [];
    const innerImageDuration = 3000; // Each inner image shows for 3 seconds

    // This timer now correctly waits for the inner gallery to finish
    const timer = setTimeout(() => {
      if (innerImageIndex < images.length - 1) {
        // If there are more images in the current gallery, show the next one
        setInnerImageIndex((prev) => prev + 1);
      } else {
        // If it's the last image, move to the next main slide and reset the inner image index
        setInnerImageIndex(0);
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }
    }, innerImageDuration);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, innerImageIndex, slides]);

  // This effect resets the inner image index whenever the main slide changes
  // This is crucial for starting each new slide's gallery from the beginning
  useEffect(() => {
    setInnerImageIndex(0);
  }, [currentSlideIndex]);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const currentSlide = slides[currentSlideIndex];
  const images = currentSlide?.images || [];

  return (
    <div className="bg-white rounded-b-2xl shadow-2xl border-x overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 md:min-h-[450px]">
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
              <h3 className="text-3xl font-bold text-secondary-700 mb-4 flex items-center">
                <Check className="w-8 h-8 mr-3 text-primary-500" />
                {currentSlide.subtitle}
              </h3>
              <p className="text-lg text-secondary-700">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative min-h-[300px] md:min-h-0 order-1 md:order-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${currentSlideIndex}-${innerImageIndex}`}
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

const InnerImageCarousel = ({ images }) => {
  const [innerImageIndex, setInnerImageIndex] = useState(0);

  useEffect(() => {
    setInnerImageIndex(0); // reset index when images change
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const imageTimer = setInterval(() => {
      setInnerImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(imageTimer);
  }, [images]);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={innerImageIndex}
        src={images[innerImageIndex]}
        alt={`Service image ${innerImageIndex + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </AnimatePresence>
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
        <h4 className="text-xl font-bold text-primary-500 mb-2">
          {item.title}
        </h4>
        <p className="text-gray-400 flex-grow">{item.desc}</p>
      </div>
    </div>
  );
};

const AboutUsCarouselCard = ({ item }) => (
  <div className="relative bg-secondary-800 rounded-2xl shadow-xl overflow-hidden h-full">
    <AnimatePresence>
      <motion.img
        key={item.src}
        src={item.src}
        alt={item.title}
        className="absolute top-0 left-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h4 className="text-xl font-bold text-white">{item.title}</h4>
    </div>
  </div>
);

const AboutUsSection = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  const missionAndVision = [
    { title: t("our_mission"), description: t("our_mission_desc") },
    { title: t("our_vision"), description: t("our_vision_desc") },
  ];

  const showcaseImages = [
    { src: produit1, title: t("clients1") },
    { src: laser, title: t("service1_subtitle") },
    { src: citerne1, title: t("clients2") },
    { src: reparation, title: t("service2") },
    { src: trans2, title: t("clients1") },
    { src: indus, title: t("clients4") },
    { src: collec, title: t("clients5") },
    { src: pliage, title: t("service2_subtitle") },
    { src: trans3, title: t("clients1") },
    { src: btp2, title: t("clients3") },
    { src: agr, title: t("clients2") },
    { src: pliage2, title: t("service2_subtitle") },
    { src: welding, title: t("service3_subtitle") },
    { src: benne1, title: t("clients2") },
    { src: laser2, title: t("service1_subtitle") },
    { src: produit3, title: t("clients1") },
  ];

  // This useEffect is now safely inside its own component
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowcaseIndex((prevIndex) => (prevIndex + 1) % showcaseImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [showcaseImages.length]);

  const currentShowcaseItem = showcaseImages[showcaseIndex];

  return (
    <AnimatedSection>
      <section
        id="about"
        className="scroll-mt-20 max-w-7xl mx-auto py-16 mt-10 px-4 md:px-0"
      >
        {/* This is the new main card that encapsulates everything */}
        <div className="bg-primary-1100 rounded-2xl shadow-2xl py-8 px-2 sm:pt-8 sm:pb-8 sm:pr-2 sm:pl-2">
          <AboutUsTitle title={t("about_title")} />

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Left Column: Mission and Vision Cards */}
            <div className="flex flex-col gap-8">
              {missionAndVision.map((item) => (
                <motion.div
                  key={item.title}
                  className="bg-white p-8 rounded-2xl shadow-lg h-full "
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-2xl font-bold text-secondary-700 mb-4">
                    {item.title}
                  </h3>
                  <div className="flex items-start">
                    <CheckCircle className="w-7 h-7 text-amber-400 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-lg text-secondary-700 text-left">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Image Carousel Card */}
            <div className="min-h-[400px] md:min-h-full">
              <AboutUsCarouselCard item={currentShowcaseItem} />
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

const AboutUsTitle = ({ title }) => (
  <div className="flex justify-center items-center mb-12 text-center">
    <h2 className="text-3xl sm:text-4xl font-bold text-secondary-700 tracking-tight">
      {title}
    </h2>
  </div>
);

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
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  // Navigation Links Data
  const navLinks = [
    { href: "#about", text: t("nav_about") },
    { href: "#products", text: t("nav_products") },
    { href: "#services", text: t("nav_workshop") },
    { href: "#values", text: t("nav_values") },
    { href: "#clients-achievements", text: t("nav_clients&achievements") },
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      title: t("service1_subtitle"),
      description: t("service1_desc"),
      videoUrl: laserVID,
    },
    {
      title: t("service2_subtitle"),
      description: t("service2_desc"),
      videoUrl:
        pliageVID,
    },
    {
      title: t("service3_subtitle"),
      description: t("service3_desc"),
      videoUrl:
        soudureVID,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const aboutUs = [
    {
      title: t("fiability.title"),
      images: [produit1, produit2, produit3],
    },
  ];

  const missionAndVision = [
    {
      title: t("our_mission"),
      description: t("our_mission_desc"),
    },
    {
      title: t("our_vision"),
      description: t("our_vision_desc"),
    },
  ];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setShowcaseIndex((prevIndex) => (prevIndex + 1) % showcaseImages.length);
  //   }, 3000);
  //   return () => clearInterval(intervalId);
  // }, [showcaseImages.length]);

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

  const products1 = [
    {
      subtitle: t("product_desc_title1"),
      description: t("product_desc1"),
      images: [produit1],
    },
    {
      subtitle: t("product_desc_title2"),
      description: t("product_desc2"),
      images: [produit2],
    },
    {
      subtitle: t("product_desc_title3"),
      description: t("product_desc3"),
      images: [produit3],
    },
  ];

  const products2 = [
    {
      subtitle: t("product_desc_title4"),
      description: t("product_desc4"),
      images: [produit4],
    },
    {
      subtitle: t("product_desc_title5"),
      description: t("product_desc5"),
      images: [produit5],
    },
  ];

  const products3 = [
    {
      subtitle: t("product_desc_title6"),
      description: t("product_desc6"),
      images: [produit6],
    },
    {
      subtitle: t("product_desc_title7"),
      description: t("product_desc7"),
      images: [produit7],
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
    },
  ];

  const achievements01 = [
    {
      subtitle: t("sector_trans1"),
      description: t("sector_trans1_desc"),
      images: [cam],
    },
    {
      subtitle: t("sector_trans2"),
      description: t("sector_trans2_desc"),
      images: [plateau3],
    },
    {
      subtitle: t("sector_trans3"),
      description: t("sector_trans3_desc"),
      images: [trans1],
    },
  ];

  const achievements2 = [
    {
      subtitle: t("sector_agr1"),
      description: t("sector_agr1_desc"),
      images: [agr, agr2],
    },
  ];

  const achievements3 = [
    {
      subtitle: t("sector_btp"),
      description: t("sector_btp_desc"),
      images: [btp],
    },
    {
      subtitle: t("sector_bpt2"),
      description: t("sector_bpt2_desc"),
      images: [btp2],
    },
  ];

  const achievements4 = [
    {
      subtitle: t("sector_indus"),
      description: t("sector_indus_desc"),
      images: [indus],
    },
  ];

  const achievements5 = [
    {
      subtitle: t("sector_colect"),
      description: t("sector_colect_desc"),
      images: [collec],
    },
  ];

  // cardRefs.current = achievements.map(
  //   (_, i) => cardRefs.current[i] ?? React.createRef()
  // );

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
    <div className="bg-secondary-700 text-gray-200 font-poppins leading-relaxed antialiased">
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
                        src={require("./assets/vehtun-logo.png")}
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
                href="https://www.facebook.com/profile.php?id=61580949951319"
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
                href="https://www.linkedin.com/company/vehtun-2025/"
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
        <AboutUsSection />
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {/* --- Products 1 Section --- */}

        <AnimatedSection>
          <section id="products" className="scroll-mt-20 max-w-7xl mx-auto">
            <div className="bg-primary-1100 rounded-2xl shadow-2xl py-8 px-2 sm:pt-8 sm:pb-8 sm:pr-2 sm:pl-2">
              <SectionTitle title={t("products_title")} />
              <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("products_subtitle1")} />

                <ContentImageSlider slides={products1} />
              </div>

              <br></br>
              <br></br>

              <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("products_subtitle2")} />

                <ContentImageSlider slides={products2} />
              </div>

              <br></br>
              <br></br>

              <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("products_subtitle3")} />

                <ContentImageSlider slides={products3} />
              </div>
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

        <AnimatedVideoSection>
          <section id="services" className="scroll-mt-20 max-w-7xl mx-auto">
            <div className="bg-primary-1100 rounded-2xl shadow-2xl py-8 px-2 sm:pt-8 sm:pb-8 sm:pr-2 sm:pl-2">
              <SectionTitle title={t("our_workshop")} />

              <div className="bg-white   rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("service1")} icon={Award} />
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Column: Text Content & Navigation */}
                  <div className="p-8 md:p-12 flex flex-col justify-between order-2 md:order-1 min-h-[350px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.3 },
                        }}
                        custom={1}
                      >
                        <h3 className="text-3xl font-bold text-secondary-700 mb-4">
                          {videos[currentIndex].title}
                        </h3>
                        <p className="text-lg text-secondary-700">
                          {videos[currentIndex].description}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        onClick={handlePrev}
                        className="bg-secondary-700 text-white p-3 rounded-full hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="bg-secondary-700 text-white p-3 rounded-full hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Video Player */}
                  <div className="relative order-1 md:order-2 aspect-video overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.iframe
                        key={currentIndex}
                        className="absolute inset-0 w-full h-full"
                        src={(videos[currentIndex].videoUrl)}
                        title={videos[currentIndex].title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.3 },
                        }}
                        custom={-1}
                      ></motion.iframe>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>

              <AnimatedSection>
                <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                  <SectionHigherTitle title={t("service2")} />
                  <ContentImageSlider slides={services2} />
                </div>
              </AnimatedSection>
            </div>
          </section>
        </AnimatedVideoSection>

        {/* --- Workshop Section --- */}
        {/* <AnimatedSection>
                <section id="workshop" className="scroll-mt-20 max-w-7xl mx-auto">
                    <SectionTitle title={t("our_workshop")} />
                     <p className="text-center text-lg text-white-400 mb-12 max-w-3xl mx-auto">
                        {t("service1")}
                    </p>
                    <ContentImageSlider slides={services1} />
                </section>
            </AnimatedSection> */}

        {/* --- Values Section --- */}

<AnimatedSection>
  <section id="values" className="scroll-mt-20 max-w-7xl mx-auto">
    <div className="bg-primary-1100 rounded-2xl shadow-2xl py-12 px-6 sm:px-10">
      {/* Title */}
      <SectionTitle title={t("added_values")} />
      <p className="text-center text-lg text-secondary-700 mb-12 max-w-3xl mx-auto">
        {t("added_values_desc")}
      </p>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {values.map((value) => (
          <div
            key={value.title}
            className="bg-white rounded-2xl border border-secondary-200 shadow-md flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
          >
            {/* Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={value.img}
                alt={value.title}
                className="w-full h-full border-b border-secondary-700 object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6 text-center">
              <h4 className="text-lg font-bold text-secondary-800 mb-3 min-h-[48px] flex items-center justify-center">
                {value.title}
              </h4>
              <p className="text-sm text-black flex-grow">{value.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</AnimatedSection>


        {/* --- Achievements Section --- */}
        <AnimatedSection>
          <section
            id="clients-achievements"
            className="scroll-mt-20 max-w-7xl mx-auto"
          >
            <div className="bg-primary-1100 rounded-2xl shadow-2xl py-8 px-2 sm:pt-8 sm:pb-8 sm:pr-2 sm:pl-2 space-y-12">
              <SectionTitle title={t("achiev")} />
              {/* The title and content are now wrapped in a single styled card */}

              {/* <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("clients1")} />
                <ContentImageSlider slides={achievements01} />
              </div> */}
            
              {/* --- Achievements Section 2 --- */}

              {/* The title and content are now wrapped in a single styled card */}
              <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("clients2")} />
                <ContentImageSlider slides={achievements2} />
              </div>

          
                   <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                    <SectionHigherTitle title={t("clients1")} />
       
                    
                    <ContentImageSlider slides={achievements01}/>

                  </div>
              {/* The title and content are now wrapped in a single styled card */}
             <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("clients3")} />
                <ContentImageSlider slides={achievements3} />
              </div> 


         
              {/* --- Achievements Section 5 --- */}

              {/* The title and content are now wrapped in a single styled card */}
              <div className="bg-white rounded-2xl shadow-2xl border-secondary-700 overflow-hidden">
                <SectionHigherTitle title={t("clients5")} />
                <ContentImageSlider slides={achievements5} />
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* <AnimatedSection>
          <section id="clients-achievements" className="scroll-mt-20">
            <SectionTitle title={t("achiev")} />
            <SectionSubTitle title={t("possible_clients_desc")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((item) => (
                <ImageCarouselCard key={item.title} item={item} />
              ))}
            </div>
          </section>
        </AnimatedSection> */}

        {/* --- Goals Section --- */}
        {/* <AnimatedSection>
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
        </AnimatedSection> */}

        {/* --- Contact Section --- */}
        <AnimatedSection>
          <section id="contact" className="scroll-mt-20">
            <div className=" max-w-4xl mx-auto bg-primary-1100 rounded-2xl shadow-2xl py-8 px-2 sm:pt-8 sm:pb-8 sm:pr-2 sm:pl-2">
              <SectionTitle title={t("contact_title")} />
              <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl">
                <h3 className="text-3xl font-bold text-secondary-700 mb-8 text-center">
                  {t("contact_heading")}
                </h3>

                {/* --- Contact Details --- */}
                {/* --- Contact Details --- */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 sm:gap-x-12 text-left">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-7 h-7 text-primary-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg text-secondary-700">
                        {t("contact_address")}
                      </p>
                      <p className="text-secondary-700">
                        {t("contact_address_value")}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="w-7 h-7 text-primary-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg text-secondary-700">
                        {t("contact_phone")}
                      </p>
                      <a
                        href={`tel:${t("contact_phone_value")}`}
                        className="text-secondary-700 hover:text-primary-500 transition-colors block"
                      >
                        +216 94 888 342
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="w-7 h-7 text-primary-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-lg text-secondary-700">
                        Email
                      </p>
                      <a
                        href={`mailto:${t("contact_email_value")}`}
                        className="text-secondary-700 hover:text-primary-500 transition-colors block"
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
                          className="block text-sm font-semibold text-secondary-700 mb-2"
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
                          className="block text-sm font-semibold text-secondary-700 mb-2"
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
                        className="block text-sm font-semibold text-secondary-700 mb-2"
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
                        className="block text-sm font-semibold text-secondary-700 mb-2"
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
