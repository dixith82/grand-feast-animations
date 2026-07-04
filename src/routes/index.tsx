import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Star,
  Utensils,
  Flame,
  Award,
  Users,
  Truck,
  Sparkles,
  ArrowUp,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
  ChefHat,
  Search,
  Leaf,
  Drumstick,
  Crown,
  Zap,
  Globe,
  QrCode,
  MapPinned,
  Send,
  ShieldCheck,
  Rocket,
  Share2,
  CalendarCheck,
  Smartphone,
  Server,
  LifeBuoy,
  Search as SearchIcon,
  Link2,
} from "lucide-react";

import heroBiryani from "@/assets/hero-biryani.jpg";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";
import muttonBiryani from "@/assets/mutton-biryani.jpg";
import kebabs from "@/assets/kebabs.jpg";
import butterChicken from "@/assets/butter-chicken.jpg";
import chicken65 from "@/assets/chicken-65.jpg";
import paneerTikka from "@/assets/paneer-tikka.jpg";
import qubani from "@/assets/qubani.jpg";
import interior from "@/assets/interior.jpg";
import catering from "@/assets/catering.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ustaads — Best Hyderabadi Restaurant & Caterers in Hyderabad" },
      {
        name: "description",
        content:
          "Authentic Hyderabadi Dum Biryani, charcoal kebabs, Mughlai curries and premium catering at Ustaads, Himayat Sagar Road, Hyderabad.",
      },
      { property: "og:title", content: "Ustaads — Best Hyderabadi Restaurant & Caterers" },
      {
        property: "og:description",
        content: "Authentic Hyderabadi flavours, crafted with tradition. Dine-in, takeaway and catering.",
      },
      { property: "og:image", content: heroBiryani },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: heroBiryani },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroBiryani, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Ustaads",
          servesCuisine: ["Hyderabadi", "Mughlai", "Indian"],
          priceRange: "₹₹",
          telephone: "+91 90638 78223",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Plot 54, Himayat Sagar Road",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500075",
            addressCountry: "IN",
          },
          openingHours: "Mo-Su 12:00-23:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1100" },
        }),
      },
    ],
  }),
  component: Index,
});

function useCounter(target: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [mouse, setMouse] = useState({ x: -200, y: -200 });
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: pageProgress } = useScroll();
  const progressX = useSpring(pageProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 600);
    };
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const ids = ["home", "about", "menu", "gallery", "catering", "business", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#catering", label: "Catering" },
    { href: "#business", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  const headlineWords = ["Experience", "Authentic", "Hyderabadi", "Flavours"];

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="absolute inset-0 blur-2xl bg-gold/40 rounded-full" />
                <ChefHat className="relative h-16 w-16 text-gold" />
              </motion.div>
              <motion.span
                initial={{ letterSpacing: "0.05em", opacity: 0 }}
                animate={{ letterSpacing: "0.35em", opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-3xl text-gold-gradient uppercase"
              >
                Ustaads
              </motion.span>
              <div className="h-[2px] w-40 overflow-hidden bg-white/10 rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{ scaleX: progressX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-maroon via-gold to-gold-soft"
      />

      {/* Mouse glow */}
      <div
        className="pointer-events-none fixed z-[1] hidden md:block h-[500px] w-[500px] rounded-full opacity-40 blur-3xl transition-transform duration-300"
        style={{
          left: mouse.x - 250,
          top: mouse.y - 250,
          background: "radial-gradient(circle, oklch(0.78 0.13 82 / 0.25), transparent 70%)",
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <ChefHat className="h-7 w-7 text-gold" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl tracking-wide text-gold-gradient">Ustaads</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Hyderabadi Kitchen</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => {
              const id = l.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group relative text-xs uppercase tracking-widest transition-colors ${
                    isActive ? "text-gold" : "text-foreground/80 hover:text-gold"
                  }`}
                >
                  {l.label}
                  <motion.span
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="pointer-events-none absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          <a href="#contact" className="hidden lg:inline-flex btn-gold px-6 py-2.5 rounded-full text-sm font-semibold">
            Reserve
          </a>

          <button className="lg:hidden text-gold p-2" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex"
              >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden glass-strong"
            >
              <motion.div
                className="flex flex-col px-6 py-6 gap-1"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              >
                {navLinks.map((l) => {
                  const id = l.href.slice(1);
                  const isActive = activeSection === id;
                  return (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                      }}
                      className={`flex items-center justify-between text-lg uppercase tracking-widest border-b border-white/5 py-3 transition-colors ${
                        isActive ? "text-gold" : "text-foreground/90 hover:text-gold"
                      }`}
                    >
                      <span>{l.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_2px_oklch(0.78_0.13_82/0.7)]" />}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="btn-gold rounded-full px-6 py-3 text-center font-semibold mt-4"
                >
                  Reserve Table
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <video
            src={heroVideoAsset.url}
            poster={heroBiryani}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover animate-kenburns"
          />
          {/* dark overlay 45% */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          {/* vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.05_0.01_30/0.85)_100%)]" />
        </motion.div>

        {/* floating spice particles */}
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="animate-float-particle absolute rounded-full bg-gold/60 blur-[1px]"
            style={{
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              left: `${(i * 71) % 100}%`,
              top: `${(i * 43) % 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}

        {/* steam plumes — realistic, continuous */}
        <div className="pointer-events-none absolute inset-x-0 top-[45%] flex justify-center gap-4 md:gap-8 opacity-70">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="block h-32 w-2 md:w-3 rounded-full bg-white/40 blur-2xl animate-steam"
              style={{ animationDelay: `${i * 0.55}s`, animationDuration: `${4 + (i % 3)}s` }}
            />
          ))}
        </div>


        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.6 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full glass px-5 py-2 text-xs uppercase tracking-[0.35em] text-gold-soft"
          >
            <Sparkles size={14} /> Since 2020 · Hyderabad
          </motion.div>

          {/* Word-by-word headline */}
          <h1 className="max-w-5xl font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-balance">
            {headlineWords.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 1.7 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block mr-3 ${w === "Flavours" ? "text-gold-gradient italic" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed"
          >
            Traditional Dum Biryani, Charcoal Kebabs, Rich Mughlai Curries & Premium Catering Services.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              { href: "#contact", label: "Reserve a Table", cls: "btn-gold" },
              { href: "#menu", label: "Order Online", cls: "btn-outline-gold" },
              { href: "tel:+919063878223", label: "Call Now", cls: "btn-outline-gold" },
            ].map((b, i) => (
              <motion.a
                key={b.label}
                href={b.href}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 2.7 + i * 0.15, type: "spring", stiffness: 120 }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className={`${b.cls} rounded-full px-8 py-3.5 font-semibold tracking-wide shadow-lg`}
              >
                {b.label}
              </motion.a>
            ))}
          </div>


          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 3.4, duration: 0.8 },
              y: { delay: 3.4, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-soft/70"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-gold/40 p-1.5">
              <span className="h-2 w-1 rounded-full bg-gold animate-scroll-indicator" />
            </span>
          </motion.a>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative border-y border-white/5 bg-charcoal/60 py-5 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-16 text-2xl md:text-3xl font-display italic text-gold/70">
          {[...Array(2)].flatMap((_, k) =>
            ["Dum Biryani", "✦", "Charcoal Kebabs", "✦", "Mughlai Curries", "✦", "Fine Desserts", "✦", "Catering", "✦"].map((t, i) => (
              <span key={`${k}-${i}`} className="shrink-0">{t}</span>
            )),
          )}
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-maroon/40 to-gold/20 blur-2xl" />
            <img
              src={interior}
              alt="Ustaads restaurant interior"
              loading="lazy"
              decoding="async"
              width={1280}
              height={1024}
              className="relative rounded-3xl border border-gold/20 shadow-[var(--shadow-elevated)] w-full h-[440px] md:h-[560px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl px-6 py-4 hidden md:block">
              <div className="font-display text-3xl text-gold-gradient">4.8★</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Google Rating</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
          >
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl leading-tight">
              A legacy of <span className="text-gold-gradient italic">Nizami</span> flavours, perfected over years.
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              At Ustaads, every grain of basmati is sealed with saffron and slow-cooked over
              charcoal — the way it was in the royal kitchens of Hyderabad. From tender dum
              biryani to smoky angara kebabs, we honour recipes passed down for generations.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: ChefHat, t: "Expert Chefs" },
                { icon: Award, t: "Premium Ingredients" },
                { icon: Flame, t: "Charcoal Dum" },
                { icon: Utensils, t: "Hygienic Kitchen" },
                { icon: Users, t: "Family Friendly" },
                { icon: Truck, t: "Fast Delivery" },
              ].map((f, i) => (
                <motion.div
                  key={f.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl px-4 py-4 flex items-center gap-3 hover:border-gold/40 transition"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                    <f.icon size={18} />
                  </span>
                  <span className="text-sm font-medium">{f.t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* COUNTERS */}
      <CounterSection />

      {/* MENU */}
      <MenuSection />

      {/* WHY */}
      <Section id="why">
        <Heading eyebrow="Why Ustaads" title="The taste of true Hyderabad" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group glass rounded-3xl p-8 hover:border-gold/50 transition-all hover:-translate-y-1"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold/30 to-maroon/30 text-gold group-hover:animate-pulse-ring">
                <w.icon size={26} />
              </div>
              <h3 className="text-2xl">{w.title}</h3>
              <p className="mt-3 text-sm text-foreground/60 leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery">
        <Heading eyebrow="Gallery" title="A feast for every sense" />
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.src + i}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              className="mb-5 break-inside-avoid group relative overflow-hidden rounded-3xl border border-white/5 w-full block text-left cursor-pointer"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
              decoding="async"
                className="w-full transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: g.ratio }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-2xl text-gold-soft translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {g.alt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 backdrop-blur-xl p-6 cursor-zoom-out"
          >
            <motion.img
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl border border-gold/30 shadow-[var(--shadow-elevated)] object-contain"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full glass-strong text-gold hover:bg-gold hover:text-ink transition"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((v) => (v! - 1 + GALLERY.length) % GALLERY.length); }}
                className="glass-strong rounded-full px-4 py-2 text-xs uppercase tracking-widest text-gold"
              >
                Prev
              </button>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {lightbox + 1} / {GALLERY.length}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((v) => (v! + 1) % GALLERY.length); }}
                className="glass-strong rounded-full px-4 py-2 text-xs uppercase tracking-widest text-gold"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CATERING */}
      <Section id="catering">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
          >
            <Eyebrow>Catering Services</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl leading-tight">
              From intimate dinners to <span className="text-gold-gradient italic">grand celebrations</span>.
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              Weddings, corporate events, private functions — we bring the royal
              Hyderabadi kitchen to your venue with hygienic cooking, on-time delivery
              and affordable packages.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Weddings", "Birthday Parties", "Corporate Events", "Family Functions", "Outdoor Catering"].map((c) => (
                <span key={c} className="rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-xs uppercase tracking-widest text-gold-soft">
                  {c}
                </span>
              ))}
            </div>
            <a href="#contact" className="mt-10 inline-flex btn-gold rounded-full px-8 py-3.5 font-semibold">
              Request Quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <img
              src={catering}
              alt="Ustaads catering setup"
              loading="lazy"
              decoding="async"
              width={1280}
              height={1024}
              className="rounded-3xl border border-gold/20 shadow-[var(--shadow-elevated)] w-full h-[440px] md:h-[540px] object-cover"
            />
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { t: "Large Orders", d: "50 – 5000 guests" },
                { t: "Hygienic Cooking", d: "FSSAI certified" },
                { t: "On-Time Delivery", d: "Anywhere in city" },
                { t: "Affordable Packages", d: "Custom menus" },
              ].map((f) => (
                <div key={f.t} className="glass rounded-2xl p-4">
                  <div className="font-display text-lg text-gold-soft">{f.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{f.d}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* BUSINESS FEATURES */}
      <Section id="business">
        <Heading eyebrow="For Restaurant Owners" title="Everything Your Business Needs Online" />
        <p className="mt-4 text-center max-w-2xl mx-auto text-foreground/60">
          A complete digital presence built for restaurants — beautifully designed, fast to load, and ready to convert diners.
        </p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BUSINESS_FEATURES.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.7 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-gold/40 via-maroon/30 to-transparent hover:from-gold/70 hover:to-gold/20 transition-all"
            >
              <div className="glass rounded-3xl p-6 h-full flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-500">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold/30 to-maroon/30 text-gold group-hover:scale-110 transition-transform">
                  <f.icon size={22} />
                </div>
                <h3 className="text-xl leading-tight">{f.t}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">{f.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <Heading eyebrow="Visit Us" title="Reserve your table" />
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 glass rounded-3xl p-8 flex flex-col gap-6"
          >
            {[
              { icon: Phone, t: "Phone", d: "+91 90638 78223" },
              { icon: MapPin, t: "Address", d: "Plot 54, Himayat Sagar Road, Hyderabad, Telangana – 500075" },
              { icon: Clock, t: "Hours", d: "Mon – Sun · 12:00 PM – 11:00 PM" },
              { icon: Mail, t: "Email", d: "hello@ustaads.in" },
            ].map((c) => (
              <div key={c.t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <c.icon size={18} />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.t}</div>
                  <div className="mt-1 text-sm text-foreground/85 break-words">{c.d}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="tel:+919063878223" className="btn-gold rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2">
                <Phone size={14} /> Call Now
              </a>
              <a href="https://wa.me/919063878223" className="btn-outline-gold rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
            <div className="section-divider my-2" />
            <motion.a
              href="https://www.google.com/maps?q=Ustaads+Himayat+Sagar+Road+Hyderabad"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="group relative block rounded-[20px] overflow-hidden border border-gold/30 shadow-[0_20px_50px_-20px_oklch(0.78_0.13_82/0.35)] hover:border-gold/60 hover:shadow-[0_25px_70px_-15px_oklch(0.78_0.13_82/0.55)] transition-all duration-500 h-60"
              aria-label="Open in Google Maps"
            >
              <iframe
                title="Ustaads location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Himayat+Sagar+Road+Hyderabad&output=embed"
                className="h-full w-full pointer-events-none"
                style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.65) contrast(0.95) brightness(0.85)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-maroon-deep/30 mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_50%_50%,oklch(0.78_0.13_82/0.15),transparent_60%)]" />
              <div className="absolute bottom-3 left-3 glass-strong rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gold-soft flex items-center gap-1.5">
                <MapPin size={11} /> Open in Google Maps
              </div>
            </motion.a>

          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We'll be in touch shortly.");
            }}
            className="lg:col-span-3 glass rounded-3xl p-8 grid gap-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Name" name="name" />
              <Field label="Phone" name="phone" type="tel" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Date" name="date" type="date" />
              <Field label="Guests" name="guests" type="number" />
            </div>
            <Field label="Message" name="message" textarea />
            <button className="btn-gold rounded-full px-8 py-3.5 font-semibold justify-self-start">
              Send Reservation
            </button>
          </motion.form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative mt-20 border-t border-white/5 bg-ink/80">
        <svg className="absolute -top-[1px] left-0 w-full h-16 text-ink/80" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path
            className="animate-wave"
            fill="currentColor"
            d="M0,30 C300,60 600,0 900,30 C1050,45 1150,20 1200,30 L1200,60 L0,60 Z"
          />
        </svg>

        {/* Newsletter */}
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <div className="font-display text-3xl text-gold-gradient">Join the Ustaads Circle</div>
              <p className="mt-2 text-sm text-foreground/60">Exclusive offers, chef's specials & event invites — straight to your inbox.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Aadab from Ustaads."); }}
              className="flex w-full md:w-auto items-center gap-3"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 md:w-72 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
              />
              <button className="btn-gold rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                <Send size={14} /> Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ChefHat className="h-7 w-7 text-gold" />
              <span className="font-display text-3xl text-gold-gradient">Ustaads</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-foreground/60 leading-relaxed">
              Serving authentic Hyderabadi flavours to over 10,000 happy families.
              Dine-in, takeaway, delivery and premium catering.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-gold/20 hover:text-gold hover:-translate-y-1 transition"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-display text-lg text-gold-soft mb-4">Quick Links</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:text-gold transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-lg text-gold-soft mb-4">Reach Us</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>+91 90638 78223</li>
              <li>Himayat Sagar Road</li>
              <li>Hyderabad — 500075</li>
              <li className="pt-2 flex flex-wrap gap-x-3 gap-y-1">
                <a href="#" className="hover:text-gold">Privacy Policy</a>
                <a href="#" className="hover:text-gold">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ustaads · Best Hyderabadi Restaurant &amp; Caterers
        </div>
      </footer>

      {/* Sticky floating action bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.7 }}
        className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-2xl"
      >
        <div className="glass-strong flex items-center justify-between gap-1.5 rounded-full px-2 py-2 shadow-[var(--shadow-elevated)]">
          {[
            { href: "#top", label: "Home", icon: Sparkles },
            { href: "#menu", label: "Menu", icon: Utensils },
            { href: "#contact", label: "Reserve", icon: CalendarCheck, primary: true },
            { href: "tel:+919063878223", label: "Call", icon: Phone },
            { href: "https://wa.me/919063878223", label: "WhatsApp", icon: MessageCircle, wa: true },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <motion.a
                key={b.label}
                href={b.href}
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                className={`relative flex flex-1 flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 rounded-full px-1.5 sm:px-3 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold tracking-wide transition ${
                  b.primary
                    ? "btn-gold text-ink"
                    : b.wa
                      ? "bg-[oklch(0.7_0.18_150)] text-ink"
                      : "text-gold-soft hover:bg-white/5"
                }`}
                aria-label={b.label}
              >
                <Icon size={16} />
                <span>{b.label}</span>
              </motion.a>
            );
          })}

        </div>
      </motion.div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full glass-strong text-gold hover:bg-gold hover:text-ink transition"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 md:py-32 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
      <span className="h-px w-8 bg-gold/60" /> {children}
    </div>
  );
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto"
    >
      <div className="flex justify-center"><Eyebrow>{eyebrow}</Eyebrow></div>
      <h2 className="mt-4 text-4xl md:text-6xl leading-tight text-balance">
        {title.split(" ").map((w, i, arr) =>
          i === arr.length - 2 || i === arr.length - 1 ? (
            <span key={i} className="text-gold-gradient italic">{w} </span>
          ) : (
            <span key={i}>{w} </span>
          ),
        )}
      </h2>
    </motion.div>
  );
}

function Field({
  label, name, type = "text", textarea = false,
}: { label: string; name: string; type?: string; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
        />
      )}
    </label>
  );
}

function MenuSection() {
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => ["All", ...Array.from(new Set(MENU.map((m) => m.cat)))], []);
  const filtered = useMemo(
    () =>
      MENU.filter(
        (m) =>
          (cat === "All" || m.cat === cat) &&
          (query.trim() === "" || m.name.toLowerCase().includes(query.toLowerCase())),
      ),
    [cat, query],
  );

  return (
    <Section id="menu">
      <Heading eyebrow="Signature Menu" title="Crafted for the connoisseur" />

      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                cat === c
                  ? "bg-gradient-to-r from-gold to-gold-soft text-ink font-semibold shadow-[var(--shadow-gold)]"
                  : "border border-gold/30 bg-gold/5 text-gold-soft hover:bg-gold/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="w-full rounded-full bg-white/5 border border-white/10 pl-11 pr-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
          />
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <FoodCard key={item.name} item={item} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-foreground/50 text-sm">
          No dishes match your search — try another word.
        </div>
      )}
    </Section>
  );
}

function FoodCard({ item, index }: { item: (typeof MENU)[number]; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl overflow-hidden glass border border-white/5 hover:border-gold/40 transition-all duration-500 hover:shadow-[var(--shadow-gold)]"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
              decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Top-left stack: category + veg indicator */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
          <span className="rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
            {item.cat}
          </span>
          <span
            className={`grid h-6 w-6 place-items-center rounded-sm border ${
              item.veg ? "border-green-500/80 text-green-400" : "border-red-500/80 text-red-400"
            } bg-ink/70`}
            aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
          >
            {item.veg ? <Leaf size={11} /> : <Drumstick size={11} />}
          </span>
        </div>

        {/* Top-right: price */}
        <span className="absolute top-4 right-4 rounded-full bg-gold text-ink px-3 py-1 text-sm font-bold font-display">
          {item.price}
        </span>

        {/* Bottom-left badges */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {item.bestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-maroon to-maroon-deep text-white px-3 py-1 text-[10px] uppercase tracking-widest font-semibold shadow-lg">
              <Crown size={10} /> Bestseller
            </span>
          )}
          {item.chefSpecial && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-gold to-gold-soft text-ink px-3 py-1 text-[10px] uppercase tracking-widest font-semibold">
              <ChefHat size={10} /> Chef's Special
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl leading-tight">{item.name}</h3>
          <SpiceLevel level={item.spice} />
        </div>
        <p className="mt-2 text-sm text-foreground/60 leading-relaxed line-clamp-2">{item.desc}</p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-0.5 text-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
          </div>
          <a
            href="https://wa.me/919063878223"
            className="btn-gold rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-1.5"
          >
            <Zap size={12} /> Quick Order
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5 shrink-0" aria-label={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          size={13}
          className={i <= level ? "text-maroon fill-maroon" : "text-white/15"}
        />
      ))}
    </div>
  );
}

function CounterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const stats = [
    { n: 10000, s: "+", l: "Happy Customers" },
    { n: 1100, s: "+", l: "Google Reviews" },
    { n: 48, s: "★", l: "Google Rating", divide: 10 },
    { n: 500, s: "+", l: "Catering Events" },
    { n: 5, s: "+", l: "Years Excellence" },
  ];

  return (
    <div ref={ref} className="relative py-20 border-y border-white/5 bg-gradient-to-b from-transparent via-maroon-deep/20 to-transparent">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
        {stats.map((s, i) => <StatItem key={i} {...s} active={active} />)}
      </div>
    </div>
  );
}

function StatItem({ n, s, l, divide, active }: { n: number; s: string; l: string; divide?: number; active: boolean }) {
  const v = useCounter(n, active);
  const display = divide ? (v / divide).toFixed(1) : v.toLocaleString();
  return (
    <div className="text-center">
      <div className="font-display text-5xl md:text-6xl text-gold-gradient">
        {display}<span className="text-gold">{s}</span>
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
    </div>
  );
}

function TestimonialsSection() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, [paused]);
  const t = TESTIMONIALS[i];
  return (
    <Section id="reviews">
      <Heading eyebrow="Guest Stories" title="Loved by 10,000+ diners" />

      {/* Rating summary */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-center">
        <div className="glass-strong rounded-2xl px-6 py-4">
          <div className="font-display text-4xl text-gold-gradient">4.8★</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Google Rating</div>
        </div>
        <div className="glass-strong rounded-2xl px-6 py-4">
          <div className="font-display text-4xl text-gold-gradient">1100+</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">Google Reviews</div>
        </div>
      </div>

      <div
        className="mt-14 relative max-w-3xl mx-auto min-h-[22rem] md:min-h-[20rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
          >
            {/* subtle radial gold glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.78_0.13_82/0.15),transparent_60%)]" />

            {/* Avatar + verified */}
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-gold via-gold-soft to-maroon blur-md opacity-70" />
                <img
                  src={t.avatar}
                  alt={t.n}
                  loading="lazy"
                  decoding="async"
                  width={72}
                  height={72}
                  className="relative h-16 w-16 md:h-[72px] md:w-[72px] rounded-full object-cover border-2 border-gold/60 shadow-[0_10px_30px_-10px_oklch(0.78_0.13_82/0.7)]"
                />
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-ink shadow-lg" aria-label="Verified review">
                  <ShieldCheck size={13} />
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold-soft">
                <ShieldCheck size={11} /> Verified Review
              </span>
            </div>

            {/* Animated stars */}
            <div className="mt-5 flex justify-center gap-1 text-gold">
              {[...Array(5)].map((_, k) => (
                <motion.span
                  key={k}
                  initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15 + k * 0.09, type: "spring", stiffness: 260, damping: 14 }}
                >
                  <Star size={18} fill="currentColor" />
                </motion.span>
              ))}
            </div>

            <p className="relative mt-5 font-display text-xl md:text-2xl lg:text-3xl leading-snug italic text-foreground/90">
              “{t.q}”
            </p>
            <div className="mt-5 text-sm text-gold-soft uppercase tracking-[0.3em]">— {t.n}</div>
            {t.city && (
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.city}</div>
            )}
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Testimonial ${k + 1}`}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-gold" : "w-4 bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Data ---------------- */

const MENU = [
  { name: "Chicken Dum Biryani", cat: "Biryani", price: "₹225", img: heroBiryani, desc: "Slow-cooked basmati, tender chicken, saffron and secret spices, sealed with dough.", veg: false, spice: 2, bestseller: true, chefSpecial: true },
  { name: "Mutton Biryani", cat: "Biryani", price: "₹350", img: muttonBiryani, desc: "Premium mutton dum-cooked with aromatic long-grain rice — a Hyderabadi classic.", veg: false, spice: 3, bestseller: true, chefSpecial: false },
  { name: "Angara Kebab", cat: "Starters", price: "₹280", img: kebabs, desc: "Charcoal-grilled skewers, smoky and succulent with a hint of yoghurt marinade.", veg: false, spice: 2, bestseller: false, chefSpecial: true },
  { name: "Chicken 65", cat: "Starters", price: "₹240", img: chicken65, desc: "Crispy, spicy, tangy — Hyderabad's most iconic bar bite, done right.", veg: false, spice: 3, bestseller: true, chefSpecial: false },
  { name: "Butter Chicken", cat: "Main Course", price: "₹320", img: butterChicken, desc: "Silken tomato-cream gravy, tandoor-charred chicken, finished with kasuri methi.", veg: false, spice: 1, bestseller: false, chefSpecial: false },
  { name: "Paneer Tikka", cat: "Starters", price: "₹260", img: paneerTikka, desc: "Marinated cottage cheese, chargrilled to smoky perfection with bell peppers.", veg: true, spice: 2, bestseller: false, chefSpecial: false },
  { name: "Veg Dum Biryani", cat: "Biryani", price: "₹200", img: heroBiryani, desc: "Fragrant vegetables and basmati, layered and dum-sealed — vegetarian royalty.", veg: true, spice: 2, bestseller: false, chefSpecial: false },
  { name: "Murgh Musallam", cat: "Main Course", price: "₹420", img: butterChicken, desc: "Whole chicken slow-braised in Mughlai spices — a royal centrepiece.", veg: false, spice: 2, bestseller: false, chefSpecial: true },
  { name: "Qubani Ka Meetha", cat: "Desserts", price: "₹160", img: qubani, desc: "Traditional Hyderabadi apricot dessert with fresh cream — heritage on a plate.", veg: true, spice: 0, bestseller: true, chefSpecial: false },
];

const WHY = [
  { icon: Flame, title: "Authentic Dum Cooking", desc: "Sealed with dough, slow-cooked over charcoal — the way it should be." },
  { icon: Award, title: "Premium Ingredients", desc: "Aged basmati, fresh meats, whole spices ground in-house every morning." },
  { icon: Utensils, title: "Charcoal Grilled Kebabs", desc: "Real charcoal, real smoke, real flavour — nothing else compares." },
  { icon: Users, title: "Family Friendly", desc: "Warm hospitality and a menu that has something for everyone at the table." },
  { icon: Truck, title: "Catering Experts", desc: "From 50 to 5,000 guests — same taste, same care, delivered on time." },
  { icon: Sparkles, title: "Affordable Luxury", desc: "Royal Hyderabadi flavours at prices that welcome you back tomorrow." },
];

const GALLERY = [
  { src: heroBiryani, alt: "Chicken Dum Biryani", ratio: "16/11" },
  { src: kebabs, alt: "Charcoal Kebabs", ratio: "1/1" },
  { src: butterChicken, alt: "Butter Chicken", ratio: "4/5" },
  { src: muttonBiryani, alt: "Mutton Biryani", ratio: "1/1" },
  { src: chicken65, alt: "Chicken 65", ratio: "4/5" },
  { src: interior, alt: "Restaurant Interior", ratio: "16/11" },
  { src: paneerTikka, alt: "Paneer Tikka", ratio: "1/1" },
  { src: catering, alt: "Catering Events", ratio: "16/10" },
  { src: qubani, alt: "Qubani Ka Meetha", ratio: "4/5" },
];

const TESTIMONIALS = [
  {
    q: "Best Hyderabadi biryani in the city. The dum aroma alone is worth the visit.",
    n: "Rahul S.",
    city: "Hyderabad",
    avatar: "https://i.pravatar.cc/160?img=15",
  },
  {
    q: "Excellent taste and amazing service. Catered our wedding for 800 guests flawlessly.",
    n: "Priya K.",
    city: "Secunderabad",
    avatar: "https://i.pravatar.cc/160?img=45",
  },
  {
    q: "Highly recommended for family dining. The kebabs are unreal — proper charcoal work.",
    n: "Aditya M.",
    city: "Gachibowli",
    avatar: "https://i.pravatar.cc/160?img=12",
  },
  {
    q: "Ordered for a corporate event of 200 people. On time, hot, and every plate was empty.",
    n: "Neha R.",
    city: "Banjara Hills",
    avatar: "https://i.pravatar.cc/160?img=32",
  },
];

const BUSINESS_FEATURES = [
  { icon: Globe, t: "Premium Responsive Website", d: "A luxury digital storefront that looks stunning on every device." },
  { icon: QrCode, t: "Digital QR Code Menu", d: "Contactless menu access — scan, browse, order in seconds." },
  { icon: MapPinned, t: "Google Maps Integration", d: "One-tap directions bring more diners through your door." },
  { icon: MessageCircle, t: "WhatsApp Ordering", d: "Direct chat orders with pre-filled messages, zero friction." },
  { icon: Send, t: "Online Contact Form", d: "Enquiries land in your inbox — reservations and events handled." },
  { icon: SearchIcon, t: "Basic SEO Optimization", d: "Structured data and meta tags for local search visibility." },
  { icon: Link2, t: "Custom Domain Setup", d: "Your own branded domain — professional, memorable, trusted." },
  { icon: Server, t: "Hosting Setup", d: "Fast, secure, globally distributed hosting configured for you." },
  { icon: LifeBuoy, t: "One Year Technical Support", d: "Bug fixes, tweaks and updates — we've got your back." },
  { icon: Smartphone, t: "Mobile Friendly Design", d: "Pixel-perfect experience for every screen size and orientation." },
  { icon: Rocket, t: "Fast Loading Website", d: "Optimised images, lazy loading, blazing Lighthouse scores." },
  { icon: Share2, t: "Social Media Integration", d: "Instagram, Facebook and more — beautifully linked throughout." },
  { icon: CalendarCheck, t: "Online Table Reservation", d: "Guests book instantly — you get organised bookings." },
  { icon: ShieldCheck, t: "Google Review Integration", d: "Showcase your ratings and build instant credibility." },
];
