import { ArrowDown, Mail, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImage from "../assets/ChatGPT Image Feb 26, 2026, 12_15_40 PM.png";
import { profile, tools } from "../data/profile";

const HeroVideo = () => (
  <section className="portfolio-hero relative min-h-[100svh] overflow-hidden pt-20">
    <div className="absolute right-6 top-28 hidden text-[10px] font-black uppercase tracking-[0.22em] text-fog md:block">
      Scroll down
    </div>

    <div className="container-page relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6 py-8 text-center sm:gap-8 sm:py-10 lg:gap-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="hero-profile-stage"
      >
        <h1 className="stacked-title" aria-label="Portfolio">Portfolio</h1>
        <div className="hero-profile-card hero-name-card w-full max-w-[22rem] rounded-[8px] p-4 text-left text-softtext sm:max-w-md sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4 text-left">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-fog">{profile.role}</p>
              <h2 className="mt-1 text-2xl font-black uppercase">{profile.name}</h2>
            </div>
            <span className="rounded-full border border-electric/30 px-3 py-1 text-xs font-black text-electric">2026</span>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[8px] bg-neutral-950">
            <img
              src={profileImage}
              alt="Rajkumar Lodhi video editing profile visual"
              className="h-full w-full object-cover grayscale"
              loading="eager"
            />
          </div>
          <p className="mt-5 text-sm leading-6 text-fog">{profile.shortIntro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.slice(0, 4).map((tool) => (
              <span key={tool} className="rounded-full border border-electric/25 px-3 py-1 text-xs font-black uppercase text-fog">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
        className="w-full max-w-3xl text-center text-white"
      >
        <p className="text-xs font-black uppercase tracking-[0.28em] text-electric">Video editing / motion graphics</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-black leading-none sm:text-4xl lg:text-5xl">
          Trend-based edits with cinematic polish.
        </h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="premium-button" to="/portfolio">
            <Play size={18} fill="currentColor" />
            See Work
          </Link>
          <Link className="ghost-button" to="/contact">
            <Mail size={18} />
            Contact Me
          </Link>
        </div>
      </motion.div>
    </div>

    <a
      href="#who-am-i"
      className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-white/70 sm:flex"
    >
      Scroll down
      <ArrowDown size={15} />
    </a>
  </section>
);

export default HeroVideo;
