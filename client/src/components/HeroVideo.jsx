import { ArrowDown, Mail, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImage from "../assets/ChatGPT Image Feb 26, 2026, 12_15_40 PM.png";
import { profile, tools } from "../data/profile";

const HeroVideo = () => (
  <section className="portfolio-hero relative min-h-screen overflow-hidden pt-20">
    <div className="absolute right-6 top-28 hidden text-[10px] font-black uppercase tracking-[0.22em] text-black/45 md:block">
      Scroll down
    </div>

    <div className="container-page relative z-10 grid min-h-[calc(100vh-5rem)] gap-10 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative"
      >
        <h1 className="stacked-title" aria-label="Portfolio">
          <span>Por</span>
          <span>tfo</span>
          <span>lio</span>
        </h1>
        <div className="hero-name-card absolute bottom-5 left-[44%] hidden rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-black md:block">
          {profile.name}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
        className="grid gap-6 lg:justify-items-end"
      >
        <div className="hero-name-card w-full max-w-md rounded-[8px] p-5 text-black">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/55">{profile.role}</p>
              <h2 className="mt-1 text-2xl font-black uppercase">{profile.name}</h2>
            </div>
            <span className="rounded-full border border-black/20 px-3 py-1 text-xs font-black">2026</span>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-[8px] bg-neutral-950">
            <img
              src={profileImage}
              alt="Rajkumar Lodhi video editing profile visual"
              className="h-full w-full object-cover grayscale"
              loading="eager"
            />
          </div>
          <p className="mt-5 text-sm leading-6 text-black/70">{profile.shortIntro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.slice(0, 4).map((tool) => (
              <span key={tool} className="rounded-full border border-black/15 px-3 py-1 text-xs font-black uppercase text-black/70">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md text-white lg:text-right">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-electric">Video editing / motion graphics</p>
          <h2 className="mt-4 text-balance text-3xl font-black leading-none sm:text-5xl">
            Trend-based edits with cinematic polish.
          </h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link className="premium-button" to="/portfolio">
              <Play size={18} fill="currentColor" />
              See Work
            </Link>
            <Link className="ghost-button" to="/contact">
              <Mail size={18} />
              Contact Me
            </Link>
          </div>
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
