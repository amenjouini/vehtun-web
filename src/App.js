import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, animate } from "framer-motion";
import { useTranslation } from "react-i18next";


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
} from "lucide-react";

// --- Reusable Animated Components ---

// --- i18n Configuration ---

// Component for the animated number counter
const Counter = ({ from = 0, to }) => {
  const nodeRef = useRef();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 3,
        onUpdate(value) {
          // Check if the node is still mounted before updating
          if (node) {
            node.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return <span ref={nodeRef} />;
};

const products = [
  { key: "plateaux_simples", icon: "PS" },
  { key: "ridelles_fixes_ou_amovibles", icon: "RF" },
  { key: "plateaux_baches", icon: "PB" },
  { key: "bennes_basculantes", icon: "BB" },
  { key: "citernes_liquides", icon: "CI" },
  { key: "equipements_sur_mesure", icon: "EM" },
];


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
    { href: "#workshop", text: t("nav_workshop") },
    { href: "#values", text: t("nav_values") },
    { href: "#clients", text: t("nav_clients") },
    { href: "#achievements", text: t("nav_achievements") },
    { href: "#goals", text: t("nav_goals") },
    { href: "#contact", text: t("nav_contact") },
  ];

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
      className="block sm:inline-block px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-primary-500/80 transition-all duration-300"
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
                  Veh<span className="text-white">Tun</span>
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
            <button type="button" onClick={handleChangeLanguage}>
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
      <header className="min-h-screen bg-gradient-to-b from-secondary-900 via-secondary-800 to-secondary-900 flex flex-col justify-center items-center text-center p-6 pt-24 overflow-hidden">
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Veh<span className="text-primary-400">Tun</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-8 font-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("hero_subtitle")}
          </motion.p>
          <motion.p
            className="text-md text-gray-400 mb-12 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("hero_founder")}
          </motion.p>
          <motion.a
            href="#about"
            className="bg-primary-500 hover:bg-primary-600 text-black-900 font-bold py-4 px-10 rounded-xl text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center shadow-lg hover:shadow-primary-500/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {t("hero_button")} <ChevronDown className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {/* --- About Section --- */}
        <AnimatedSection>
          <section id="about" className="scroll-mt-20">
            <SectionTitle title={t("about_title")} icon={Building} />
            <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
              <motion.div
                className="bg-secondary-800 p-8 rounded-2xl shadow-2xl border border-secondary-700"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-2xl font-bold text-primary-400 mb-5">
                  {t("about_heading")}
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />{" "}
                    {t("about_item1")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />{" "}
                    {t("about_item2")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />{" "}
                    {t("about_item3")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />{" "}
                    {t("about_item4")}
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary-500 mr-3 mt-1 flex-shrink-0" />{" "}
                    {t("about_item5")}
                  </li>
                </ul>
              </motion.div>
              <div className="relative h-72 md:h-full rounded-2xl overflow-hidden shadow-2xl">
 <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
        >
          <video
            className="w-full h-full object-cover"
            src="/assets/vid.mp4"
            alt={t("about_video_alt")}
            loop
            autoPlay
            muted
            playsInline // Important for autoplay on mobile
            controls={false} // Hide controls for a cleaner look
          >
            {t("about_video_not_supported")}
          </video>
        </motion.div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent pointer-events-none"
        ></div>
      </div>


                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent"></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* --- Products Section --- */}
        <AnimatedSection>
          <section id="products" className="scroll-mt-20">
            <SectionTitle title={t("products_title")} icon={Truck} />
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
          <section id="workshop" className="scroll-mt-20">
            <SectionTitle title={t("our_workshop")}  icon={Wrench} />
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
              <div className="mt-10 relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={placeholderImg(800, 400, "Machines Atelier VehTun")}
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
                <div className="absolute inset-0 bg-secondary-900/40"></div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* --- Values Section --- */}
        <AnimatedSection>
          <section id="values" className="scroll-mt-20">
            <SectionTitle title={t("added_values")} icon={Lightbulb} />
            <p className="text-center text-lg text-black-400 mb-12 max-w-2xl mx-auto">
              {t("added_values_desc")}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: t("innovation_continue.title"),
                  desc: t("innovation_continue.desc"),
                },
                {
                  title: t("allegement_structures.title"),
                  desc: t("allegement_structures.desc"),
                },
                {
                  title: t("performance_cout.title"),
                  desc: t("performance_cout.desc"),
                },
                {
                  title: t("flexibilite_sur_mesure.title"),
                  desc: t("flexibilite_sur_mesure.desc"),
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-secondary-800 p-8 rounded-2xl border border-secondary-700 shadow-lg"
                >
                  <h4 className="text-xl font-bold text-primary-400 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* --- Target Clients Section --- */}
        <AnimatedSection>
          <section id="clients" className="scroll-mt-20">
            <SectionTitle title={t("possible_clients")} icon={Target} />
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
          <section id="achievements" className="scroll-mt-20">
            <SectionTitle title={t("achiev")} icon={Award} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
               {
    title: t("products.benne_gravats.title"),
    desc: t("products.benne_gravats.desc"),
    imgText: t("products.benne_gravats.imgText"),
  },
  {
    title: t("products.plateaux_baches.title"),
    desc: t("products.plateaux_baches.desc"),
    imgText: t("products.plateaux_baches.imgText"),
  },
  {
    title: t("products.citerne_15000l.title"),
    desc: t("products.citerne_15000l.desc"),
    imgText: t("products.citerne_15000l.imgText"),
  },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-secondary-800 rounded-2xl shadow-xl overflow-hidden flex flex-col group border border-secondary-700"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden">
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
                      onError={(e) =>
                        (e.target.src = placeholderImg(
                          400,
                          300,
                          "Image Indisponible"
                        ))
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 via-transparent"></div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h4 className="text-xl font-bold text-primary-400 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-10 text-sm">
              (Photos réelles à insérer ici)
            </p>
          </section>
        </AnimatedSection>

        {/* --- Goals Section --- */}
        <AnimatedSection>
          <section id="goals" className="scroll-mt-20">
            <SectionTitle
              title="Objectifs de Développement"
              icon={TrendingUp}
            />
            <p className="text-center text-lg text-black-400 mb-12 max-w-2xl mx-auto">
              📈 Notre vision pour l'avenir est claire et ambitieuse.
            </p>
            <div className="max-w-3xl mx-auto bg-secondary-800 p-8 sm:p-10 rounded-2xl shadow-2xl border border-secondary-700">
              <ul className="space-y-5">
                {[
                  "Étendre notre atelier pour doubler la capacité de production",
                  "Développer de nouvelles gammes allégées et modulables",
                  "Nouer des partenariats stratégiques avec les constructeurs",
                  "Digitaliser le SAV pour une réactivité maximale",
                  "Explorer les marchés d'exportation en Afrique du Nord",
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
    <SectionTitle title={t("contact_title")} icon={Users} />
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
            <p className="text-gray-400">{t("contact_address_value")}</p>
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
              {t("contact_phone_value")}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="w-7 h-7 text-primary-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-lg text-white">
              {t("contact_email")}
            </p>
            <a
              href={`mailto:${t("contact_email_value")}`}
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              {t("contact_email_value")}
            </a>
          </div>
        </div>
      </div>

      {/* --- Divider --- */}
      <hr className="my-10 border-t-2 border-dashed border-secondary-700" />

      {/* --- Contact Form --- */}
      <div className="max-w-2xl mx-auto">
        <form action="#" method="POST" className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full-name" className="block text-sm font-semibold text-gray-300 mb-2">
                {t("contact_form_name")}
              </label>
              <input
                type="text"
                name="full-name"
                id="full-name"
                required
                className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                placeholder={t("contact_form_name_placeholder")}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                {t("contact_form_email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                placeholder={t("contact_form_email_placeholder")}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
              {t("contact_form_phone")}
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              placeholder={t("contact_form_phone_placeholder")}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
              {t("contact_form_message")}
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              className="block w-full rounded-lg border-secondary-600 bg-secondary-900/50 px-4 py-3 text-white shadow-sm transition-colors focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              placeholder={t("contact_form_message_placeholder")}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-xl font-bold text-secondary-900 bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-secondary-800 transition-all duration-300 transform hover:scale-105"
            >
              {t("contact_form_button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</AnimatedSection>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-secondary-800 border-t border-secondary-700 mt-20 sm:mt-28">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="font-semibold">
            &copy; {new Date().getFullYear()} VehTun. Tous droits réservés.
          </p>
          <p className="text-sm mt-2 font-light">
            Conçu avec passion en Tunisie.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
