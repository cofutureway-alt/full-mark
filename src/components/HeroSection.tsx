import { Link } from "react-router-dom";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePlatformSettings, DEFAULT_PLATFORM_SETTINGS } from "@/hooks/use-platform-settings";

/**
 * Animated chemistry backdrop for the hero only — pure CSS (no WebGL).
 * Floating molecule dots on slow orbit paths at very low opacity.
 */
function HeroParticles() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  // Deterministic pseudo-random layout so SSR/rerenders stay stable
  const particles = Array.from({ length: 18 }, (_, i) => {
    const seed = (i * 137.5) % 100; // golden-angle spread
    const size = 4 + ((i * 7) % 10);
    return {
      left: `${(seed * 0.97 + 2) % 96}%`,
      top: `${(seed * 1.31 + 5) % 88}%`,
      size,
      duration: 14 + ((i * 3.7) % 12),
      delay: -(i * 1.9),
      drift: i % 2 === 0 ? 1 : -1,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orbiting rings behind the portrait side */}
      <div className="absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-primary/[0.07] animate-spin-slow hidden md:block" />
      <div className="absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary/[0.05] animate-spin-reverse hidden lg:block">
        {/* electron dot riding the ring */}
        <span className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary/25" />
      </div>

      {/* Floating dots */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.08,
            animation: `hero-drift-${p.drift} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const HeroSection = () => {
  const prefersReduced = useReducedMotion();
  const { settings } = usePlatformSettings();

  const teacherImage = settings.hero_image_url || "/teacher.jpg";
  const rawHeadline = settings.hero_headline ?? DEFAULT_PLATFORM_SETTINGS.hero_headline ?? "";
  const heroSubtext = settings.hero_subtext ?? DEFAULT_PLATFORM_SETTINGS.hero_subtext ?? "";
  const ctaLabel = settings.hero_cta_label ?? DEFAULT_PLATFORM_SETTINGS.hero_cta_label ?? "";
  const ctaUrl = settings.hero_cta_url ?? DEFAULT_PLATFORM_SETTINGS.hero_cta_url ?? "/courses";

  const [headlineLine1 = "", headlineLine2 = ""] = rawHeadline.split("\n");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle animated chemistry backdrop */}
      <HeroParticles />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-right"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm mb-6"
            >
              <FlaskConical size={16} className="text-primary" />
              <span className="text-xs font-bold text-primary">
                منصة مستر محمد إبراهيم — كيمياء
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl md:text-6xl font-black leading-[1.25] text-foreground"
            >
              {headlineLine1}
              {headlineLine2 && (
                <>
                  <br />
                  <span className="text-primary">{headlineLine2}</span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {heroSubtext}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="gap-2 text-base font-bold px-8">
                <Link to={ctaUrl}>
                  {ctaLabel}
                  <ArrowLeft size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base font-bold bg-card">
                <Link to="/signup">إنشاء حساب</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Teacher portrait */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="relative w-full max-w-[360px] lg:max-w-[440px]">
              {/* Orbital ring decorations */}
              <div className="absolute -inset-5 rounded-full border border-primary/15 animate-spin-slow pointer-events-none hidden sm:block" />
              <div className="absolute -inset-12 rounded-full border border-primary/10 animate-spin-reverse pointer-events-none hidden lg:block" />

              <div className="relative rounded-[2rem] overflow-hidden border-2 border-border bg-card shadow-2xl shadow-black/20">
                <img
                  src={teacherImage}
                  alt="مستر محمد إبراهيم — مدرس الكيمياء"
                  className="w-full aspect-square object-cover"
                  loading="eager"
                  {...({ fetchpriority: "high" } as any)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
