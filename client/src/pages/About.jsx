import { Award, Clock, Film, MonitorPlay, Sparkles, Users } from "lucide-react";
import CTASection from "../components/CTASection";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import SEO from "../components/SEO";
import profileImage from "../assets/ChatGPT Image Feb 26, 2026, 12_15_40 PM.png";
import { profile, skills, tools, whyChooseMe } from "../data/profile";

const stats = [
  { label: "Years experience", value: "2+", icon: Award },
  { label: "Videos edited", value: "150+", icon: MonitorPlay },
  { label: "Content formats", value: "8+", icon: Film },
  { label: "Creative tools", value: "7+", icon: Users }
];

const timeline = [
  {
    year: "2023",
    title: "Started editing social content",
    text: "Built edits for reels, shorts, promos, and creator-style short-form videos."
  },
  {
    year: "2024",
    title: "Developed cinematic and trend-based style",
    text: "Focused on transitions, effects, color correction, sound sync, captions, and engaging pacing."
  },
  {
    year: "2025",
    title: "Added motion graphics and AI workflows",
    text: "Expanded into basic motion graphics, AI-enabled editing tools, thumbnail design, and faster delivery systems."
  },
  {
    year: "2026",
    title: "Video editing portfolio",
    text: "Presenting a focused portfolio for social media, promotional content, cinematic visuals, and modern creator edits."
  }
];

const About = () => (
  <PageTransition>
    <SEO title={`About ${profile.name}`} description="Rajkumar Lodhi is a creative video editor with 2+ years of experience in reels, shorts, promotional content, cinematic edits, and AI-based workflows." />

    <section className="portfolio-hero page-hero">
      <div className="container-page grid gap-8 pb-14 pt-8 sm:pb-16 sm:pt-10 md:gap-10 md:pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:pb-24">
        <div className="hero-name-card mx-auto w-full max-w-md overflow-hidden rounded-[8px] p-4 text-softtext lg:max-w-none">
          <img
            src={profileImage}
            alt="Rajkumar Lodhi profile visual"
            className="aspect-[4/5] w-full rounded-[8px] object-cover grayscale"
            loading="lazy"
          />
          <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-fog">{profile.role}</p>
          <h1 className="mt-1 text-3xl font-black uppercase text-softtext">{profile.name}</h1>
        </div>
        <div className="text-softtext">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-electric">About me</p>
          <h2 className="mt-4 text-balance text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
            Creative, detail-oriented, and built for modern video.
          </h2>
          <p className="mt-5 text-base leading-8 text-fog sm:mt-6 sm:text-lg">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            {whyChooseMe.map((item) => (
              <span key={item} className="rounded-full border border-electric/20 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase text-fog">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-ink">
      <div className="container-page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-[8px] p-5 sm:p-6">
                <Icon className="mb-5 text-electric" size={28} />
                <p className="text-4xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-fog">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section-padding bg-charcoal">
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <SectionHeader
          eyebrow="Skills"
          title="Editing skills for reels, shorts, promos, and cinematic visuals."
          description="My style combines fast hooks, clean sound sync, modern transitions, color work, and platform-aware pacing."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="rounded-[8px] border border-white/10 bg-white/[0.055] p-4 sm:p-5">
              <Sparkles className="mb-3 text-electric" size={18} />
              <h3 className="font-black text-white">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding light-editorial">
      <div className="container-page">
        <SectionHeader eyebrow="Tools" title="Software and creative tools I use." tone="light" />
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span key={tool} className="rounded-full border border-electric/20 bg-white/[0.06] px-5 py-3 text-sm font-black uppercase text-softtext">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-ink">
      <div className="container-page">
        <SectionHeader eyebrow="Experience" title="2+ years of practical editing experience." />
        <div className="grid gap-5">
          {timeline.map((item) => (
            <div key={item.year} className="glass-card grid gap-4 rounded-[8px] p-5 sm:p-6 md:grid-cols-[120px_1fr]">
              <div className="flex items-center gap-3 text-electric">
                <Clock size={18} />
                <span className="font-black">{item.year}</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-fog">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTASection title="Have clips ready? Rajkumar can shape them into a modern edit." />
  </PageTransition>
);

export default About;
