import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronDown,
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
} from "lucide-react";

import heroBiryani from "@/assets/hero-biryani.jpg";
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
    links: [{ rel: "canonical", href: "/" }],
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

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
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#catering", label: "Catering" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
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
        transition={{ duration: 0.6, ease: "easeOut" }}
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

          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm uppercase tracking-widest text-foreground/80 hover:text-gold transition-colors"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden lg:inline-flex btn-gold px-6 py-2.5 rounded-full text-sm font-semibold">
            Reserve
          </a>

          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden glass-strong"
            >
              <div className="flex flex-col px-6 py-6 gap-4">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-lg uppercase tracking-widest text-foreground/90 hover:text-gold border-b border-white/5 pb-3"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-gold rounded-full px-6 py-3 text-center font-semibold mt-2">
                  Reserve Table
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroBiryani}
            alt="Hyderabadi Chicken Dum Biryani"
            width={1920}
            height={1280}
            className="h-full w-full object-cover animate-kenburns"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.05_0.01_30/0.7)_100%)]" />
        </motion.div>

        {/* floating spice particles */}
        {[...Array(14)].map((_, i) => (
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

        {/* steam */}
        <div className="pointer-events-none absolute left-1/2 top-[50%] -translate-x-1/2 flex gap-6 opacity-60">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-24 w-2 rounded-full bg-white/40 blur-xl animate-steam"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
          ))}
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-3 rounded-full glass px-5 py-2 text-xs uppercase tracking-[0.35em] text-gold-soft"
          >
            <Sparkles size={14} /> Since 2020 · Hyderabad
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-balance"
          >
            Authentic Hyderabadi <br />
            <span className="text-gold-gradient italic">Flavours</span>, Crafted with Tradition
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed"
          >
            Experience rich Dum Biryani, charcoal kebabs, Mughlai curries and authentic
            Hyderabadi desserts — slow-cooked over generations of mastery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, type: "spring" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#menu" className="btn-gold rounded-full px-8 py-3.5 font-semibold tracking-wide">
              View Menu
            </a>
            <a href="#contact" className="btn-outline-gold rounded-full px-8 py-3.5 font-semibold tracking-wide">
              Reserve Table
            </a>
            <a href="#menu" className="btn-outline-gold rounded-full px-8 py-3.5 font-semibold tracking-wide">
              Order Online
            </a>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
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
              A legacy of <span className="text-gold-gradient italic">Nizami</span> flavours,
              perfected over years.
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
      <Section id="menu">
        <Heading eyebrow="Signature Menu" title="Crafted for the connoisseur" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item, i) => (
            <FoodCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </Section>

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
            <motion.div
              key={g.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7 }}
              className="mb-5 break-inside-avoid group relative overflow-hidden rounded-3xl border border-white/5"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: g.ratio }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-2xl text-gold-soft translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {g.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

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
            <div className="section-divider my-2" />
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
              <iframe
                title="Ustaads location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Himayat+Sagar+Road+Hyderabad&output=embed"
                className="h-full w-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition duration-700"
              />
            </div>
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
                <li key={l.href}><a href={l.href} className="hover:text-gold">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-display text-lg text-gold-soft mb-4">Reach Us</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>+91 90638 78223</li>
              <li>Himayat Sagar Road</li>
              <li>Hyderabad — 500075</li>
              <li className="pt-2"><a href="#" className="hover:text-gold">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ustaads · Best Hyderabadi Restaurant & Caterers
        </div>
      </footer>

      {/* Floating actions */}
      <a
        href="tel:+919063878223"
        className="fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full btn-gold shadow-[var(--shadow-gold)] animate-pulse-ring"
        aria-label="Call"
      >
        <Phone size={20} />
      </a>
      <a
        href="https://wa.me/919063878223"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.7_0.18_150)] text-ink shadow-lg hover:scale-110 transition"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
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

function FoodCard({ item, index }: { item: (typeof MENU)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden glass border border-white/5 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-gold)]"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full glass-strong px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
          {item.cat}
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-gold text-ink px-3 py-1 text-sm font-bold font-display">
          {item.price}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl">{item.name}</h3>
        <p className="mt-2 text-sm text-foreground/60 leading-relaxed line-clamp-2">{item.desc}</p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-0.5 text-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
          </div>
          <button className="btn-gold rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest">
            Order Now
          </button>
        </div>
      </div>
    </motion.article>
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
    { n: 48, s: "★", l: "Rating", divide: 10 },
    { n: 5, s: "+", l: "Years Experience" },
  ];

  return (
    <div ref={ref} className="relative py-20 border-y border-white/5 bg-gradient-to-b from-transparent via-maroon-deep/20 to-transparent">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
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
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <Section id="reviews">
      <Heading eyebrow="Guest Stories" title="Loved by 10,000+ diners" />
      <div className="mt-14 relative max-w-3xl mx-auto h-64">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-10 text-center absolute inset-0"
          >
            <div className="flex justify-center gap-1 text-gold mb-4">
              {[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
            </div>
            <p className="font-display text-2xl md:text-3xl leading-snug italic text-foreground/90">
              “{TESTIMONIALS[i].q}”
            </p>
            <div className="mt-6 text-sm text-gold-soft uppercase tracking-[0.3em]">— {TESTIMONIALS[i].n}</div>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-gold" : "w-4 bg-white/20"}`}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Data ---------------- */

const MENU = [
  { name: "Chicken Dum Biryani", cat: "Biryani", price: "₹225", img: heroBiryani, desc: "Slow-cooked basmati, tender chicken, saffron and secret spices, sealed with dough." },
  { name: "Mutton Biryani", cat: "Biryani", price: "₹350", img: muttonBiryani, desc: "Premium mutton dum-cooked with aromatic long-grain rice — a Hyderabadi classic." },
  { name: "Angara Kebab", cat: "Starter", price: "₹280", img: kebabs, desc: "Charcoal-grilled skewers, smoky and succulent with a hint of yoghurt marinade." },
  { name: "Chicken 65", cat: "Starter", price: "₹240", img: chicken65, desc: "Crispy, spicy, tangy — Hyderabad's most iconic bar bite, done right." },
  { name: "Butter Chicken", cat: "Main", price: "₹320", img: butterChicken, desc: "Silken tomato-cream gravy, tandoor-charred chicken, finished with kasuri methi." },
  { name: "Paneer Tikka", cat: "Starter", price: "₹260", img: paneerTikka, desc: "Marinated cottage cheese, chargrilled to smoky perfection with bell peppers." },
  { name: "Veg Dum Biryani", cat: "Biryani", price: "₹200", img: heroBiryani, desc: "Fragrant vegetables and basmati, layered and dum-sealed — vegetarian royalty." },
  { name: "Murgh Musallam", cat: "Main", price: "₹420", img: butterChicken, desc: "Whole chicken slow-braised in Mughlai spices — a royal centrepiece." },
  { name: "Qubani Ka Meetha", cat: "Dessert", price: "₹160", img: qubani, desc: "Traditional Hyderabadi apricot dessert with fresh cream — heritage on a plate." },
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
  { q: "Best Hyderabadi biryani in the city. The dum aroma alone is worth the visit.", n: "Rahul S." },
  { q: "Excellent taste and amazing service. Catered our wedding for 800 guests flawlessly.", n: "Priya K." },
  { q: "Highly recommended for family dining. The kebabs are unreal — proper charcoal work.", n: "Aditya M." },
  { q: "Ordered for a corporate event of 200 people. On time, hot, and every plate was empty.", n: "Neha R." },
];
